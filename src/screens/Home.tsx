import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useFocusEffect} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons'; // Ikoni nappia varten

const cars = [
  {
    id: 1,
    dealership_id: 1,
    brand: 'Tesla',
    model: 'Model 3',
    year: '2021',
    license_plate: 'ABC-123',
    seats: 5,
    location_id: 101,
    latitude: 60.219834,
    longitude: 24.825575,
    reserved: false,
  },
  {
    id: 2,
    dealership_id: 1,
    brand: 'Tesla',
    model: 'Model Y',
    year: '2022',
    license_plate: 'XYZ-789',
    seats: 5,
    location_id: 102,
    latitude: 60.22034,
    longitude: 24.839699,
    reserved: false,
  },
  {
    id: 3,
    dealership_id: 1,
    brand: 'Tesla',
    model: 'Model S',
    year: '2020',
    license_plate: 'TES-456',
    seats: 5,
    location_id: 103,
    latitude: 60.211377,
    longitude: 24.828827,
    reserved: false,
  },
  {
    id: 4,
    dealership_id: 1,
    brand: 'Tesla',
    model: 'Model X',
    year: '2019',
    license_plate: 'ELC-900',
    seats: 7,
    location_id: 104,
    latitude: 60.2205,
    longitude: 24.8099,
    reserved: false,
  },
  {
    id: 5,
    dealership_id: 1,
    brand: 'Tesla',
    model: 'Model 3',
    year: '2023',
    license_plate: 'LEP-321',
    seats: 5,
    location_id: 105,
    latitude: 60.2119988,
    longitude: 24.817942,
    reserved: false,
  },
];

const Home = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  } | null>(null);

  const mapRef = useRef<MapView | null>(null);

  const centerToUser = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setUserLocation(coords);
      mapRef.current?.animateToRegion(coords);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      centerToUser();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          userLocationPriority="high"
          followsUserLocation={false}
        >
          {cars
            .filter((car) => !car.reserved)
            .map((car) => (
              <Marker
                key={car.id}
                coordinate={{
                  latitude: car.latitude,
                  longitude: car.longitude,
                }}
                title={`${car.brand} ${car.model}`}
                description={`License Plate: ${car.license_plate}\nYear: ${car.year}`}
              />
            ))}
        </MapView>

        {/* Center button to user location */}
        <TouchableOpacity style={styles.centerButton} onPress={centerToUser}>
          <Ionicons name="locate" size={24} color="white" />
        </TouchableOpacity>

        {/* Open menu button */}
        <TouchableOpacity
          style={styles.openMenuButton}
          onPress={() => {
            // open menu
          }}
        >
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        {/* Sort button */}
        <TouchableOpacity
          style={styles.openSortMenuButton}
          onPress={() => {
            // open sort menu
          }}
        >
          <Ionicons name="funnel" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centerButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FFB703',
    borderRadius: 30,
    padding: 12,
    elevation: 4,
  },
  openMenuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#007F5F',
    borderRadius: 30,
    padding: 12,
    elevation: 4,
  },
  openSortMenuButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    backgroundColor: '#007F5F',
    borderRadius: 30,
    padding: 12,
    elevation: 4,
  },
});

export default Home;

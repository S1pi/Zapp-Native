import {useEffect, useRef, useState} from 'react';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';

import {View, Text, Image, TouchableOpacity} from 'react-native';
import MapView, {Polygon, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import {
  AuthScreenNavigationProp,
  MainNavigationProp,
} from '../types/navigationTypes';
import HowToEndDriveModal from '../components/HowToEndDriveModal';
import {Car} from '../types/car';
import {useZappStore} from '../utils/store';

type OnDriveRouteParams = {
  car: Car;
  driveId: number;
};

const OnDrive = () => {
  const parkingZones = useZappStore((s) => s.zones);
  const route = useRoute<RouteProp<{params: OnDriveRouteParams}, 'params'>>();
  const [routeCoordinates, setRouteCoordinates] = useState<
    {latitude: number; longitude: number}[]
  >([]);
  const [showHowToEndDriveModal, setShowHowToEndDriveModal] = useState(false);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const {car, driveId} = route.params;
  console.log('driveId', driveId);

  const mapRef = useRef<MapView | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [insideParkingZone, setInsideParkingZone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Käyttäjän sijainnin tarkistaminen
  useEffect(() => {
    let subscription: Location.LocationSubscription;

    const subscribeToLocation = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 5, // Päivitä joka 5 metri
        },
        (location) => {
          const userPoint = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          // 1️⃣ Piirrettävän reitin päivittäminen
          setRouteCoordinates((prev) => [...prev, userPoint]);

          // 2️⃣ Tarkistetaan ollaanko pysäköintialueella
          const isInside = parkingZones.some((zone) =>
            pointInPolygon(userPoint, zone.location),
          );

          setInsideParkingZone(isInside);
        },
      );
    };

    subscribeToLocation();

    return () => subscription && subscription.remove();
  }, []);

  const pointInPolygon = (
    point: {latitude: number; longitude: number},
    polygon: {latitude: number; longitude: number}[],
  ) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].latitude,
        yi = polygon[i].longitude;
      const xj = polygon[j].latitude,
        yj = polygon[j].longitude;

      const intersect =
        yi > point.longitude !== yj > point.longitude &&
        point.latitude < ((xj - xi) * (point.longitude - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const centerToUser = async () => {
    console.log('Centering to user location');
    if (!userLocation) {
      console.log('No user location available');
      return;
    }
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

  const navigation = useNavigation<MainNavigationProp>();

  return (
    <View className="flex flex-1 w-full h-full bg-secondary">
      {/* Timer */}
      <View className="absolute top-20 left-0 right-0 items-center z-10">
        <View className="bg-primary px-6 py-2 rounded-full">
          <Text className="text-black-zapp text-h3 font-normal">
            {formatTime(seconds)}
          </Text>
        </View>
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={{flex: 2, width: '100%'}}
        showsUserLocation={true}
        followsUserLocation={true}
        userLocationPriority="high"
        initialRegion={
          userLocation || {
            latitude: car.latitude,
            longitude: car.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        }
      >
        {parkingZones.map((zone) => (
          <Polygon
            key={zone.id}
            coordinates={zone.location}
            strokeColor="green"
            fillColor="rgba(0, 255, 0, 0.2)"
            strokeWidth={2}
          />
        ))}
        {routeCoordinates.length > 1 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="#1AF3CF"
          />
        )}
      </MapView>

      {/* Bottom area */}
      <View className="relative flex-1 w-full h-full flex items-center bg-primary">
        {car.car_showcase_url ? (
          <Image
            className="absolute -top-1/3 h-52 w-full"
            resizeMode="contain"
            source={{uri: car.car_showcase_url}}
          />
        ) : (
          <Image
            className="absolute -top-1/3 h-52 w-full"
            resizeMode="contain"
            source={require('../components/logos/Zapp-auto-musta.png')}
          />
        )}

        <TouchableOpacity
          className="bg-light-grey rounded-3xl p-5 mt-28 w-3/4 items-center"
          onPress={() => {
            setShowHowToEndDriveModal(true);
          }}
        >
          <Text className="text-blue-link text-lg text-center">
            Kuinka lopettaa ajo?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`rounded-3xl p-5 w-3/4 my-5 items-center ${
            insideParkingZone ? 'bg-secondary' : 'bg-primary'
          }`}
          onPress={async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            const location = await Location.getCurrentPositionAsync({});
            const coords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            if (insideParkingZone) {
              console.log(insideParkingZone);
              navigation.navigate('AppStack', {
                screen: 'CompleteDrive',
                params: {
                  driveId: Number(driveId),
                  endLocation: `${coords.latitude},${coords.longitude}`,
                },
              });
            }
          }}
          disabled={!insideParkingZone}
        >
          <Text
            className={`text-lg text-center ${
              insideParkingZone ? 'text-primary' : 'text-secondary'
            }`}
          >
            {insideParkingZone ? 'Lopeta ajo' : 'Et ole pysäköintialueella'}
          </Text>
        </TouchableOpacity>
      </View>
      <HowToEndDriveModal
        visible={showHowToEndDriveModal}
        onClose={() => {
          setShowHowToEndDriveModal(false);
          console.log('Modaali painettu');
        }}
      />
    </View>
  );
};

export default OnDrive;

import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useFocusEffect} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import Menu from './Menu';
import CustomOpenButton from '../components/CustomOpenButton';
import {cars} from '../components/cars';
import {dealerships} from '../components/dealerships';

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
  const [sortByBrandVisible, setSortByBrandVisible] = useState(false);
  const [sortBySeatsVisible, setSortBySeatsVisible] = useState(false);
  const [sortByCompanyVisible, setSortByCompanyVisible] = useState(false);

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

  const centerToClosestCar = async () => {
    if (userLocation) {
      // Suodatin autot näkyville valittujen suodattimien mukaan
      const filteredCars = cars.filter((car) => {
        // Suodatus varattujen autojen perusteella
        if (car.reserved) return false;

        // Suodatus merkin perusteella
        if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand)) {
          return false;
        }

        // Suodatus istuinten perusteella
        if (
          selectedSeats.length > 0 &&
          !selectedSeats.includes(String(car.seats))
        ) {
          return false;
        }

        // Suodatus autoliikkeen perusteella
        if (
          selectedCompany.length > 0 &&
          !selectedCompany.includes(String(car.dealership_id))
        ) {
          return false;
        }

        return true;
      });

      // Jos ei ole suodatettuja autoja, palauta
      if (filteredCars.length === 0) {
        alert('No cars available with the selected filters.');
        return;
      }

      // Etsi lähin auto
      const closestCar = filteredCars.reduce((prev, curr) => {
        const prevDistance = Math.sqrt(
          Math.pow(prev.latitude - userLocation.latitude, 2) +
            Math.pow(prev.longitude - userLocation.longitude, 2),
        );
        const currDistance = Math.sqrt(
          Math.pow(curr.latitude - userLocation.latitude, 2) +
            Math.pow(curr.longitude - userLocation.longitude, 2),
        );
        return prevDistance < currDistance ? prev : curr;
      });

      const coords = {
        latitude: closestCar.latitude,
        longitude: closestCar.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(coords);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      centerToUser();
    }, []),
  );

  const brands = [...new Set(cars.map((car) => car.brand))];

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        userLocationPriority="high"
      >
        {cars
          .filter((car) => {
            // Suodatus varattujen autojen perusteella
            if (car.reserved) return false;

            // Suodatus merkin perusteella
            if (
              selectedBrands.length > 0 &&
              !selectedBrands.includes(car.brand)
            ) {
              return false;
            }

            // Suodatus istuinten perusteella
            if (
              selectedSeats.length > 0 &&
              !selectedSeats.includes(String(car.seats))
            ) {
              return false;
            }

            // Suodatus autoliikkeen perusteella
            if (
              selectedCompany.length > 0 &&
              !selectedCompany.includes(String(car.dealership_id))
            ) {
              return false;
            }

            return true;
          })
          .map((car) => (
            <Marker
              key={car.id}
              coordinate={{latitude: car.latitude, longitude: car.longitude}}
              title={`${car.brand} ${car.model}`}
              description={`License Plate: ${car.license_plate} Year: ${car.year} seats: ${car.seats}`}
              pinColor={car.reserved ? 'red' : 'green'}
            />
          ))}
      </MapView>

      <CustomOpenButton
        icon="menu"
        iconSize={36}
        color="white"
        className="bg-secondary top-20 left-5"
        onPress={() => setMenuVisible(true)}
      />
      <CustomOpenButton
        icon="funnel-outline"
        iconSize={24}
        color="white"
        className="bg-secondary top-40 left-5"
        onPress={() => setFilterMenuVisible(true)}
      />
      <CustomOpenButton
        icon="car-sport"
        iconSize={20}
        color="white"
        className="bg-sunshine bottom-20 right-5"
        onPress={centerToClosestCar}
      />
      <CustomOpenButton
        icon="location"
        iconSize={28}
        color="white"
        className="bg-flame bottom-5 right-5"
        onPress={centerToUser}
      />

      <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />

      <Modal
        visible={filterMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterMenuVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-100">
          <View className="relative bg-primary shadow-lg w-4/5 p-6 rounded-xl -max-h-screen-safe-or-72">
            <Text className="absolute top-4 right-4">
              <TouchableOpacity onPress={() => setFilterMenuVisible(false)}>
                <Ionicons name="close" size={24} color="#093331" />
              </TouchableOpacity>
            </Text>
            <Text className="self-center text-lg font-bold p-2 mb-4 color-seabed-green">
              Filter cars
            </Text>
            {/* FILTER BY CAR BRAND */}
            <TouchableOpacity
              className="flex flex-row justify-start"
              onPress={() => {
                setSortByBrandVisible(!sortByBrandVisible);
                setSortBySeatsVisible(false);
                setSortByCompanyVisible(false);
              }}
            >
              <Text className="text-md font-semibold p-2 mb-4 color-secondary">
                Sort by brand
              </Text>
              {!sortByBrandVisible ? (
                <Ionicons
                  className="pt-2"
                  name="chevron-down"
                  size={18}
                  color="#093331"
                />
              ) : (
                <Ionicons
                  className="pt-2"
                  name="chevron-up"
                  size={18}
                  color="#093331"
                />
              )}
            </TouchableOpacity>
            {sortByBrandVisible && (
              <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
                className="max-h-72 overflow-y-auto mb-4"
              >
                {brands.map((brand) => {
                  const isSelected = selectedBrands.includes(brand);
                  return (
                    <TouchableOpacity
                      key={brand}
                      className="flex flex-row justify-between items-center p-2"
                      onPress={() => {
                        setSelectedBrands((prev) =>
                          isSelected
                            ? prev.filter((b) => b !== brand)
                            : [...prev, brand],
                        );
                      }}
                    >
                      <Text>{brand}</Text>
                      <Ionicons
                        name={isSelected ? 'checkbox' : 'square-outline'}
                        size={18}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {/* FILTER BY SEATS */}
            <TouchableOpacity
              className="flex flex-row justify-start"
              onPress={() => {
                setSortBySeatsVisible(!sortBySeatsVisible);
                setSortByBrandVisible(false);
                setSortByCompanyVisible(false);
              }}
            >
              <Text className="text-md font-semibold p-2 mb-4 color-secondary">
                Sort by seats
              </Text>
              {!sortBySeatsVisible ? (
                <Ionicons
                  className="pt-2"
                  name="chevron-down"
                  size={18}
                  color="#093331"
                />
              ) : (
                <Ionicons
                  className="pt-2"
                  name="chevron-up"
                  size={18}
                  color="#093331"
                />
              )}
            </TouchableOpacity>
            {sortBySeatsVisible && (
              <View className="mb-4">
                {Array.from(new Set(cars.map((car) => car.seats)))
                  .sort((a, b) => a - b)
                  .map((seats) => {
                    const isSelected = selectedSeats.includes(String(seats));
                    return (
                      <TouchableOpacity
                        key={seats}
                        className="flex flex-row justify-between items-center p-2"
                        onPress={() => {
                          setSelectedSeats((prev) =>
                            isSelected
                              ? prev.filter((s) => s !== String(seats))
                              : [...prev, String(seats)],
                          );
                        }}
                      >
                        <Text>{seats} seats</Text>
                        <Ionicons
                          name={isSelected ? 'checkbox' : 'square-outline'}
                          size={18}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            )}

            {/* FILTER BY COMPANY */}
            <TouchableOpacity
              className="flex flex-row justify-start"
              onPress={() => {
                setSortByCompanyVisible(!sortByCompanyVisible);
                setSortByBrandVisible(false);
                setSortBySeatsVisible(false);
              }}
            >
              <Text className="text-md font-semibold p-2 mb-4 color-secondary">
                Sort by company
              </Text>
              {!sortByCompanyVisible ? (
                <Ionicons
                  className="pt-2"
                  name="chevron-down"
                  size={18}
                  color="#093331"
                />
              ) : (
                <Ionicons
                  className="pt-2"
                  name="chevron-up"
                  size={18}
                  color="#093331"
                />
              )}
            </TouchableOpacity>
            {sortByCompanyVisible && (
              <View className="mb-4">
                {Array.from(new Set(cars.map((car) => car.dealership_id))).map(
                  (company) => {
                    const isSelected = selectedCompany.includes(
                      String(company),
                    );
                    return (
                      <TouchableOpacity
                        key={company}
                        className="flex flex-row justify-between items-center p-2"
                        onPress={() => {
                          setSelectedCompany((prev) =>
                            isSelected
                              ? prev.filter((b) => b !== String(company))
                              : [...prev, String(company)],
                          );
                        }}
                      >
                        {/* Replace with actual company name */}
                        <Text>
                          {dealerships.find((d) => d.id === company)?.name}
                        </Text>
                        <Ionicons
                          name={isSelected ? 'checkbox' : 'square-outline'}
                          size={18}
                        />
                      </TouchableOpacity>
                    );
                  },
                )}
              </View>
            )}
            {/* CLEAR FILTER AND USE FILTER BUTTONS */}

            <View className="flex flex-col justify-center items-center gap-3 mt-4">
              <TouchableOpacity
                className="bg-flame w-3/5 flex justify-center items-center rounded-2xl p-2"
                onPress={() => {
                  setSelectedBrands([]);
                  setSelectedSeats([]);
                  setSelectedCompany([]);
                }}
              >
                <Text className="color-primary">Clear Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-aqua-gem w-3/5 flex justify-center items-center rounded-2xl p-2"
                onPress={() => setFilterMenuVisible(false)}
              >
                <Text className="color-black-zapp">Use filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
});

export default Home;

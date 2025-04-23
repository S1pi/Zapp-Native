import React, {useCallback, useMemo, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
  FlatList,
  Button,
  Image,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import MapView, {Marker, Polygon} from 'react-native-maps';
import * as Location from 'expo-location';
import {useFocusEffect} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import Menu from './Menu';
import CustomOpenButton from '../components/CustomOpenButton';
import {cars} from '../components/cars';
import {dealerships} from '../components/dealerships';
import {parkingZones} from '../components/parkingZones';
import {CarModal} from '../components/CarModal';

export type Car = {
  id: number;
  brand: string;
  model: string;
  year: string;
  license_plate: string;
  seats: number;
  latitude: number;
  longitude: number;
  dealership_id: number;
  reserved: boolean;
  parking_zone_id: number;
  showcase_image_url?: string;
};

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
  const [carModalVisible, setCarModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [distanceToSelectedCar, setDistanceToSelectedCar] = useState<
    string | null
  >(null);

  const mapRef = useRef<MapView | null>(null);

  //REF
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  //Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  //Snap points
  const snapPoints = ['23%', '50%'];

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

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371;
    const toRad = (deg: number) => deg * (Math.PI / 180);

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const centerToClosestCar = async () => {
    if (userLocation) {
      // Filter for available cars
      const filteredCars = cars.filter((car) => {
        if (car.reserved) return false;

        if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand)) {
          return false;
        }
        if (
          selectedSeats.length > 0 &&
          !selectedSeats.includes(String(car.seats))
        ) {
          return false;
        }
        if (
          selectedCompany.length > 0 &&
          !selectedCompany.includes(String(car.dealership_id))
        ) {
          return false;
        }

        return true;
      });

      // Find the closest car
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

  const nearestCars = cars.filter((car) => {
    if (car.reserved) return false;

    if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand)) {
      return false;
    }
    if (
      selectedSeats.length > 0 &&
      !selectedSeats.includes(String(car.seats))
    ) {
      return false;
    }
    if (
      selectedCompany.length > 0 &&
      !selectedCompany.includes(String(car.dealership_id))
    ) {
      return false;
    }

    return true;
  });

  const sortedCars = [...cars]
    .filter((car) => userLocation !== null) // varmuuden vuoksi
    .map((car) => {
      const distance = calculateDistance(
        userLocation!.latitude,
        userLocation!.longitude,
        car.latitude,
        car.longitude,
      );
      return {...car, distance};
    })
    .sort((a, b) => a.distance - b.distance);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          userLocationPriority="high"
        >
          {parkingZones.map((zone) => (
            <Polygon
              className="flex"
              key={zone.id}
              coordinates={zone.location}
              strokeColor="green"
              fillColor="rgba(0, 255, 0, 0.2)"
              strokeWidth={2}
            />
          ))}
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
            .map((car) => {
              if (!userLocation) return null;

              const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                car.latitude,
                car.longitude,
              );

              const distanceString =
                distance < 1
                  ? `${(distance * 1000).toFixed(0)} m`
                  : `${distance.toFixed(2)} km`;

              return (
                <Marker
                  key={car.id}
                  coordinate={{
                    latitude: car.latitude,
                    longitude: car.longitude,
                  }}
                  pinColor="blue"
                  onPress={() => {
                    console.log('Vittusaatana');
                    setSelectedCar(car);
                    setDistanceToSelectedCar(distanceString);
                    setCarModalVisible(true);
                  }}
                  image={
                    car.dealership_id === 1
                      ? require('../components/logos/zapp.png')
                      : require('../components/logos/other.png')
                  }
                />
              );
            })}
        </MapView>

        <CarModal
          visible={carModalVisible}
          setCarModalVisible={setCarModalVisible}
          selectedCar={selectedCar}
          distanceToSelectedCar={distanceToSelectedCar}
        />

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
          className="bg-sunshine bottom-1/3 right-5"
          onPress={centerToClosestCar}
        />
        <CustomOpenButton
          icon="location"
          iconSize={28}
          color="white"
          className="bg-flame bottom-1/4 right-5"
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
                  className="max-h-72 w-11/12 self-center overflow-y-auto mb-4"
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
                <View className="mb-4 w-11/12 self-center">
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
                <View className="self-center w-11/12 mb-4">
                  {Array.from(
                    new Set(cars.map((car) => car.dealership_id)),
                  ).map((company) => {
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
                  })}
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
                  className="bg-secondary w-3/5 flex justify-center items-center rounded-2xl p-2"
                  onPress={() => setFilterMenuVisible(false)}
                >
                  <Text className="color-primary">Use filter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <BottomSheet
          index={0}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          enableOverDrag={false}
          enablePanDownToClose={false}
          handleIndicatorStyle={{
            backgroundColor: '#007F5F',
            width: 50,
            height: 5,
            borderRadius: 5,
            margin: 15,
          }}
          backgroundStyle={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <BottomSheetModalProvider>
            <BottomSheetView className="max-h-96">
              <ScrollView>
                {sortedCars.map((car) => {
                  if (!userLocation) return null;

                  const distance = calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    car.latitude,
                    car.longitude,
                  );

                  const distanceString =
                    distance < 1
                      ? `${(distance * 1000).toFixed(0)} m`
                      : `${distance.toFixed(2)} km`;

                  return (
                    <TouchableOpacity
                      key={car.id}
                      onPress={() => {
                        console.log('Vittusaatana');
                        setSelectedCar(car);
                        setDistanceToSelectedCar(distanceString);
                        setCarModalVisible(true);
                      }}
                      className="flex flex-row justify-between items-center py-4 px-6"
                    >
                      <Image
                        className="h-20 flex-1 rounded-lg"
                        resizeMode="contain"
                        source={require('../components/logos/Zapp-auto-musta.png')}
                      />
                      <View className="flex-1 flex flex-col justify-start items-start">
                        <Text className="text-lg">
                          {car.dealership_id === 1 ? 'ZAPP ' : ''}
                          {car.brand} {car.model}
                        </Text>
                        {car.dealership_id !== 1 && (
                          <Text className="text-secondary">
                            {
                              dealerships.find(
                                (d) => d.id === car.dealership_id,
                              )?.name
                            }
                          </Text>
                        )}
                        <Text className="">Tähän osoite????</Text>
                        <Text className="text-md">{distanceString}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </BottomSheetView>
          </BottomSheetModalProvider>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
});

export default Home;

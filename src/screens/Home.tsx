import {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import Menu from '../components/Menu';
import CustomOpenButton from '../components/CustomOpenButton';
import CarMap from '../components/CarMap';
import FilterModal, {Filter} from '../components/FilterModal';
import CarListSheet from '../components/CarListSheet';
import {Car} from '../types/car';
import {haversine} from '../utils/geo';
import {CarModal} from '../components/CarModal';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useMap} from '../hooks/apiHooks';
import {useZappStore} from '../utils/store';

const initialFilter: Filter = {brands: [], seats: [], companies: []};

const Home = () => {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [menuVisible, setMenuVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const [carModalOpen, setCarModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [distanceToSelectedCar, setDistanceToSelectedCar] =
    useState<string>('');

  // const {cars} = useMap();
  const fetchAll = useZappStore((s) => s.fetchAll);
  const cars = useZappStore((s) => s.cars);
  const allCars = cars;
  console.log('allCars', allCars);
  //console.log('mockCars', mockCars);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Map
  const mapRef = useRef<MapView | null>(null);
  const listSheetRef = useRef<BottomSheetModal>(null);

  const askLocation = useCallback(async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;
    const loc = await Location.getCurrentPositionAsync({});
    return {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };
  }, []);

  const centerToUser = useCallback(async () => {
    const coords = await askLocation();
    if (!coords) return;
    setUserLocation(coords);
    mapRef.current?.animateToRegion({
      ...coords,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, [askLocation]);

  useEffect(() => {
    centerToUser();
    fetchAll();
  }, []);

  useEffect(() => {
    if (userLocation) {
      listSheetRef.current?.present();
    }
  }, [userLocation]);

  // Cars
  const filteredCars = useMemo(() => {
    return allCars.filter((c) => {
      if (c.is_reserved) return false;
      if (filter.brands.length && !filter.brands.includes(c.brand))
        return false;
      if (filter.seats.length && !filter.seats.includes(c.seats)) return false;
      if (
        filter.companies.length &&
        !filter.companies.includes(c.dealership_id)
      )
        return false;
      return true;
    });
  }, [filter, allCars]);

  const centerToClosestCar = useCallback(() => {
    if (!userLocation || !filteredCars.length) return;

    const withDistance = filteredCars.map((c) => ({
      ...c,
      d: haversine(
        userLocation.latitude,
        userLocation.longitude,
        c.latitude,
        c.longitude,
      ),
    }));
    const closest = withDistance.reduce((p, c) => (c.d < p.d ? c : p));

    mapRef.current?.animateToRegion({
      latitude: closest.latitude,
      longitude: closest.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, [userLocation, filteredCars]);

  const handleCarPress = useCallback((car: Car, distance: string) => {
    setSelectedCar(car);
    setDistanceToSelectedCar(distance);
    setCarModalOpen(true);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View className="flex-1">
          <CarMap
            cars={filteredCars}
            userLocation={userLocation}
            onCarPress={handleCarPress}
            mapRef={mapRef}
            disableGestures={menuVisible}
          />

          <CarModal
            visible={carModalOpen}
            setCarModalVisible={setCarModalOpen}
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
            onPress={() => setFilterVisible(true)}
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

          <FilterModal
            visible={filterVisible}
            initial={filter}
            onClose={() => setFilterVisible(false)}
            onApply={(f) => setFilter(f)}
            cars={allCars}
          />

          <CarListSheet
            cars={filteredCars}
            userLocation={userLocation}
            onSelect={handleCarPress}
            sheetRef={listSheetRef}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Home;

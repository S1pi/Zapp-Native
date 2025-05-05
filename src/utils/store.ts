// store.ts
import {create} from 'zustand';
import {Car, ParkingZone} from '../types/car';
import {Dealership} from '../types/dealership';
import {useMap} from '../hooks/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ZappState {
  cars: Car[];
  zones: ParkingZone[];
  dealers: Dealership[];
  fetchAll(): Promise<void>;
}

const {getAllCars, getParkingZones, getDealerShips} = useMap();

export const useZappStore = create<ZappState>((set) => ({
  cars: [],
  zones: [],
  dealers: [],
  fetchAll: async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) return;
    const [cars, zones, dealers] = await Promise.all([
      getAllCars(token),
      getParkingZones(token),
      getDealerShips(token),
    ]);
    set({cars, zones, dealers});
  },
}));

import {Car, ParkingZone} from './car';
import {Dealership} from './dealership';
import {UserWithoutPassword} from './user';

export type CreatedUserSuccessResponse = {
  message: string;
  user: UserWithoutPassword;
};

export type LoginResponse = {
  message: string;
  token: string;
  user: UserWithoutPassword;
};

export type EmailOrPhoneResponse = {
  message: string;
  available: boolean;
};

export type AllCarsResponse = {
  message: string;
  cars: Car[];
};

export type ParkingZoneResponse = {
  message: string;
  parkingZones: ParkingZone[];
};

export type DealerShipsResponse = {
  message: string;
  dealerships: Dealership[];
};

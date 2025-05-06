import {parkingZones} from './../components/parkingZones';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AllCarsResponse,
  DealerShipsResponse,
  DriveStartResponse,
  EmailOrPhoneResponse,
  LoginResponse,
  ParkingZoneResponse,
} from '../types/responses';
import {User, UserUpdate} from '../types/user';
import {fetchData} from '../utils/functions';
import {useEffect, useState} from 'react';
import {Car, ParkingZone} from '../types/car';
import {Dealership} from '../types/dealership';
import {set} from 'react-hook-form';

const UseUser = () => {
  const postLogin = async (
    emailOrPhone: string,
    password: string,
  ): Promise<LoginResponse> => {
    const loginData = {
      email_or_phone: emailOrPhone,
      password: password,
    };
    console.log('loginData', loginData);
    const options = {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('options', options);
    try {
      const response = await fetchData<LoginResponse>(
        process.env.EXPO_PUBLIC_API + '/users/login',
        options,
      );
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const getUserByToken = async (token: string) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetchData<LoginResponse>(
        process.env.EXPO_PUBLIC_API + '/users/getbytoken',
        options,
      );
      return response;
    } catch (error) {
      console.error('Error fetching user by token:', error);
      throw error;
    }
  };

  const postRegister = async (userData: FormData) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: userData,
    };
    try {
      const response = await fetchData(
        process.env.EXPO_PUBLIC_API + '/users/register',
        options,
      );

      return response;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const checkPhoneAndEmailAvailability = async (
    email: string | null,
    phone: string | null,
  ) => {
    const options = {
      method: 'GET',
    };

    const apiEndPoint = email
      ? '/users/register/check?email=' + email
      : '/users/register/check?phone=' + phone;
    try {
      const response = await fetchData<EmailOrPhoneResponse>(
        process.env.EXPO_PUBLIC_API + apiEndPoint,
        options,
      );
      return response.available;
    } catch (error: any) {
      console.error('Error checking availability: ', error);
      throw new Error(error);
    }
  };

  const updateUser = async (userData: UserUpdate) => {
    const token = await AsyncStorage.getItem('userToken');
    console.log('token', token);
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetchData<User>(
        process.env.EXPO_PUBLIC_API + '/users/modify/user',
        options,
      );
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return {
    postLogin,
    getUserByToken,
    postRegister,
    checkPhoneAndEmailAvailability,
    updateUser,
  };
};

const useMap = () => {
  console.log('useMap');
  const getAllCars = async (token: string) => {
    console.log('getAllCars');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetchData<AllCarsResponse>(
        process.env.EXPO_PUBLIC_API + '/cars/get/all',
        options,
      );
      return response.cars;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  };

  const getParkingZones = async (token: string) => {
    console.log('getParkingZones');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetchData<ParkingZoneResponse>(
        process.env.EXPO_PUBLIC_API + '/parking-zones/all',
        options,
      );
      return response.parkingZones;
    } catch (error) {
      console.error('Error fetching parking zones:', error);
      throw error;
    }
  };

  const getDealerShips = async (token: string) => {
    console.log('getDealerShips');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetchData<DealerShipsResponse>(
        process.env.EXPO_PUBLIC_API + '/dealership/all',
        options,
      );
      return response.dealerships;
    } catch (error) {
      console.error('Error fetching dealerships:', error);
      throw error;
    }
  };

  // const setData = async () => {
  //   const token = await AsyncStorage.getItem('userToken');
  //   if (!token) {
  //     console.error('Token not found');
  //     return;
  //   }

  //   const dealerships = await getDealerShips(token);
  //   const parkingZones = await getParkingZones(token);
  //   const cars = await getAllCars(token);

  //   setDealerships(dealerships);
  //   setParkingZones(parkingZones);
  //   setCars(cars);
  //   console.log('dealerships', dealerships);
  //   console.log('parkingZones', parkingZones);
  //   console.log('cars', cars);
  // };

  // useEffect(() => {
  //   setData();
  // }, []);

  // const [parkingZones, setParkingZones] = useState<ParkingZone[]>([]);
  // const [dealerships, setDealerships] = useState<Dealership[]>([]);
  // const [cars, setCars] = useState<Car[]>([]);

  return {
    // parkingZones,
    // dealerships,
    // cars,
    getAllCars,
    getParkingZones,
    getDealerShips,
  };
};

const useDrive = () => {
  const startDrive = async (carId: number, token: string) => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({carId}),
    };
    try {
      const response = await fetchData<DriveStartResponse>(
        process.env.EXPO_PUBLIC_API + '/drive/start',
        options,
      );
      console.log('response', response);
      return response.driveId;
    } catch (error) {
      console.error('Error starting drive:', error);
      throw error;
    }
  };

  const endDrive = async (driveEndData: FormData, token: string) => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: driveEndData,
    };
    console.log('driveEndData', driveEndData);
    try {
      const response = await fetchData(
        process.env.EXPO_PUBLIC_API + '/drive/end',
        options,
      );
      return response;
    } catch (error: any) {
      console.error('Error ending drive:', error.message);
      throw error;
    }
  };
  return {
    startDrive,
    endDrive,
  };
};

export {UseUser, useMap, useDrive};

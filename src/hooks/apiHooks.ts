import AsyncStorage from '@react-native-async-storage/async-storage';
import {EmailOrPhoneResponse, LoginResponse} from '../types/responses';
import {User, UserUpdate} from '../types/user';
import {fetchData} from '../utils/functions';

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
    } catch (error) {
      console.error('Error checking availability: ', error);
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

export {UseUser};

import {LoginResponse} from '../../types/responses';
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

  return {
    postLogin,
    getUserByToken,
  };
};

export {UseUser};

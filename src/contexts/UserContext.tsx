import React, {createContext, useState} from 'react';
import {set} from 'react-hook-form';
import {UseUser} from '../hooks/apiHooks';
import {LoginResponse} from '../../types/responses';
import {Credentials, UserWithoutPassword} from '../../types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchData} from '../utils/functions';

type UserContextType = {
  user: UserWithoutPassword | null;
  handleLogin: (user: Credentials) => void;
  handleAutoLogin: () => void;
  handleLogout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const {postLogin, getUserByToken} = UseUser();

  const handleLogin = async (credentials: Credentials) => {
    try {
      const response = await postLogin(
        credentials.emailOrPhone,
        credentials.password,
      );
      if (!response) {
        console.error('Login failed');
        return;
      }

      const token = response.token;
      if (!token) {
        console.error('Token not found in response');
        return;
      }
      AsyncStorage.setItem('userToken', token);

      const user = response.user;
      if (!user) {
        console.error('User not found in response');
        return;
      }
      console.log('User logged in:', user);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:', token);
      if (token) {
        const response = await getUserByToken(token);
        if (!response) {
          console.error('Auto-login failed');
          return;
        }
        const user = response.user;
        if (!user) {
          console.error('User not found in response');
          return;
        }
        console.log('User auto-logged in:', user);
        setUser(user);
      }
    } catch (error) {
      console.error('Auto-login error:', error);
    }

    return 1;
  };

  const handleLogout = () => {
    try {
      AsyncStorage.removeItem('userToken');
      setUser(null);
    } catch (error) {
      console.error('Error removing user token:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};

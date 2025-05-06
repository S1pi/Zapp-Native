import React, {createContext, useState} from 'react';
import {UseUser} from '../hooks/apiHooks';
import {Credentials, UserUpdate, UserWithoutPassword} from '../types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserContextType = {
  user: UserWithoutPassword | null;
  handleLogin: (user: Credentials) => void;
  handleAutoLogin: () => Promise<void>;
  handleLogout: () => void;
  modifyUser: (userData: UserUpdate) => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const {postLogin, getUserByToken, updateUser} = UseUser();

  const handleLogin = async (credentials: Credentials) => {
    try {
      const response = await postLogin(
        credentials.emailOrPhone,
        credentials.password,
      );
      if (!response) {
        console.log('Login failed');
        return;
      }

      const token = response.token;
      if (!token) {
        console.log('Token not found in response');
        return;
      }
      AsyncStorage.setItem('userToken', token);

      const user = response.user;
      if (!user) {
        console.log('User not found in response');
        return;
      }
      console.log('User logged in:', user);
      setUser(user);
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const modifyUser = async (userData: UserUpdate) => {
    try {
      const response = await updateUser(userData);
      if (!response) {
        console.log('User update failed');
        return;
      }
      setUser(response);
      return;
    } catch (error) {
      console.log('Error updating userrrr:', error);
      throw new Error('Error updating user');
    }
  };

  const handleAutoLogin = async () => {
    try {
      console.log('Attempting auto-login...');
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:', token);
      if (token) {
        const response = await getUserByToken(token);
        console.log('Response:', response);
        if (!response) {
          console.log('Auto-login failed');
          return;
        }
        const user = response.user;
        if (!user) {
          console.log('User not found in response');
          return;
        }
        console.log('User auto-logged in:', user);
        setUser(user);
      } else {
        console.log('No token found, user not logged in');
      }
    } catch (error) {
      console.log('Auto-login error:', error);
    }
  };

  const handleLogout = () => {
    try {
      AsyncStorage.removeItem('userToken');
      setUser(null);
    } catch (error) {
      console.log('Error removing user token:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin, modifyUser}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};

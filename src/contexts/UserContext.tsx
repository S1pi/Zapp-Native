import React, {createContext, useState} from 'react';
import {set} from 'react-hook-form';
import {UseUser} from '../hooks/apiHooks';

type UserWithNoPassword = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  postnumber: string;
  address: string;
  role: string;
  created_at: string;
};

type UserContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (user: UserWithNoPassword) => void;
  handleLogout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {postLogin} = UseUser();

  const handleLogin = (user: UserWithNoPassword) => {
    console.log('User logged in:', user);
    setUser(user);
  };

  const handleLogout = () => {
    console.log('User logged out:', user);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{user, handleLogin, handleLogout}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};

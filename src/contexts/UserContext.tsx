import React, {createContext, useState} from 'react';
import {set} from 'react-hook-form';

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

  const handleLogin = (user: UserWithNoPassword) => {
    user = {
      id: 1,
      firstname: 'Juha',
      lastname: 'Kuusmaa-Teir',
      email: 'juha@hercules.com',
      phone_number: '0402331234',
      postnumber: '02230',
      address: 'Markkinakatu 10 A',
      role: 'user',
      created_at: new Date().toISOString(),
    };
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

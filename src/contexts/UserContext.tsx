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
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone_number: '123-456-7890',
      postnumber: '12345',
      address: '123 Main St',
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

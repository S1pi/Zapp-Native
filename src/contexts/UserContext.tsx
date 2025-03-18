import React, {createContext, useState} from 'react';
import {set} from 'react-hook-form';

type UserWithNoPassword = {
  id: number;
  email: string;
  name: string;
  role: string;
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
      email: '',
      name: 'John Doe',
      role: 'admin',
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

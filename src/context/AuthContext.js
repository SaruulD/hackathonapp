import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = jwt => {
    setUserToken(jwt);
    setIsLoading(false);
  };

  const logout = () => {
    AsyncStorage.removeItem('userInfo');
    setUserToken(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{login, logout, isLoading, userToken, setIsLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const updateAuthentication = (authenticated, details = null) => {
    setUserAuthenticated(authenticated);
    setUserDetails(details);

    if (authenticated) {
      AsyncStorage.setItem('userDetails', JSON.stringify(details));
    } else {
      AsyncStorage.removeItem('userDetails');
    }

  };

  return (
    <AuthContext.Provider value={{ userAuthenticated, userDetails ,updateAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

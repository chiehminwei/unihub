import React, { useState, createContext } from 'react';

export const AuthUserContext = createContext({});
export const AuthUserInfoContext = createContext({});

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      <AuthUserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
      </AuthUserInfoContext.Provider>
    </AuthUserContext.Provider>
  );
};
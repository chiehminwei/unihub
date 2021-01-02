import React, { useState, createContext } from 'react';

export const CurrentTimeContext = createContext({});

export const CurrentTimeProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState({});

  return (
    <CurrentTimeContext.Provider value={{ currentTime, setCurrentTime }}>
      {children}
    </CurrentTimeContext.Provider>
  );
};
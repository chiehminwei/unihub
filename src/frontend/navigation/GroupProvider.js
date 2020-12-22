import React, { useState, createContext } from 'react';

export const GroupContext = createContext({});

export const GroupProvider = ({ children }) => {
  const [contextGroupID, setContextGroupID] = useState(null);

  return (
    <GroupContext.Provider value={{ contextGroupID, setContextGroupID }}>
      {children}
    </GroupContext.Provider>
  );
};
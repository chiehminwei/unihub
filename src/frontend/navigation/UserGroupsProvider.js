import React, { useState, createContext } from 'react';

export const UserGroupsContext = createContext({});

export const UserGroupsProvider = ({ children }) => {
  const [userGroups, setUserGroups] = useState([]);

  return (
    <UserGroupsContext.Provider value={{ userGroups, setUserGroups }}>
      {children}
    </UserGroupsContext.Provider>
  );
};
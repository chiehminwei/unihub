import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { auth } from "~/../firebase";
import navigationTheme from './navigationTheme';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthUserContext, AuthUserInfoContext } from './AuthUserProvider';
import { CurrentTimeContext } from './CurrentTimeProvider';
import { UserGroupsContext } from './UserGroupsProvider';
import Spinner from '~/components/copy/Spinner';
import { withFirebaseHOC } from "~/../firebase";


function Routes({ firebase }) {
  const { user, setUser } = useContext(AuthUserContext);
  const { setUserInfo } = useContext(AuthUserInfoContext);
  const { setCurrentTime } = useContext(CurrentTimeContext);
  const { setUserGroups } = useContext(UserGroupsContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authUser => {
      try {
        await (authUser ? setUser(authUser) : setUser(null));
        const currentUserInfo = firebase.getCurrentUserInfo();
        setUserInfo(currentUserInfo);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
    
    // unsubscribe auth listener on unmount
    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribeUserGroups = firebase.getUserGroups(user.uid, setUserGroups);
      const unsubscribeCurrentTime = firebase.getCurrentTime(setCurrentTime);
      return () => {
        unsubscribeUserGroups();
        unsubscribeCurrentTime();
      }
    }
  }, [user])

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default withFirebaseHOC(Routes);
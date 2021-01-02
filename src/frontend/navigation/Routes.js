import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { auth } from "~/../firebase";
import navigationTheme from './navigationTheme';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthUserContext, AuthUserInfoContext } from './AuthUserProvider';
import Spinner from '~/components/copy/Spinner';
import { withFirebaseHOC } from "~/../firebase";

function Routes({ firebase }) {
  const { user, setUser } = useContext(AuthUserContext);
  const { userInfo, setUserInfo } = useContext(AuthUserInfoContext);
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
    return unsubscribeAuth;
  }, []);

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
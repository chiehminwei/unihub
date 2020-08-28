import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import screens
import { ForumScreen } from '../screens/forum/ForumScreen';
import { ForumSearchScreen } from '../screens/forum/ForumSearchScreen';
import { CreateGroupScreen } from '../screens/forum/CreateGroupScreen'


const ForumStack = createStackNavigator();

export function ForumStackScreen() {
  return (
    <ForumStack.Navigator initialRouteName="Forum" >
      <ForumStack.Screen options={{headerShown: false}} name="Forum" component={ForumScreen} />
      <ForumStack.Screen  name="Search" component={ForumSearchScreen} />
      <ForumStack.Screen  name="CreateGroup" component={CreateGroupScreen} />
    </ForumStack.Navigator>
  );
}
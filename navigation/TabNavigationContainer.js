import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import SearchResultsScreen from '../screens/SearchResults';
import ItemDetailScreen from '../screens/ItemDetail';
import SellerProfileScreen from '../screens/SellerProfile';
import OwnProfileScreen from '../screens/OwnProfile';
import HistoryScreen from '../screens/History';
import HistoryDetailScreen from '../screens/HistoryDetail';

import AllChatScreen from '../screens/AllChat';
import ChatScreen from '../screens/Chat';

import PostStackScreen from '../screens/Upload';

// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon, withBadge } from 'react-native-elements';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="SearchResults" component={SearchResultsScreen} />
      <HomeStack.Screen name="ItemDetail" component={ItemDetailScreen} />      
      <HomeStack.Screen name="SellerProfile" component={SellerProfileScreen} />
      <HomeStack.Screen name="ChatDetail" component={ChatScreen} 
        options={({ route }) => ({ title: route.params.name })}  /> 
    </HomeStack.Navigator>
  );
}

const HistoryStack = createStackNavigator();

function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="History" component={HistoryScreen} />
      <HistoryStack.Screen name="SellerProfile" component={SellerProfileScreen} />
      <HistoryStack.Screen name="OwnProfile" component={OwnProfileScreen} /> 
      <HistoryStack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
    </HistoryStack.Navigator>
  );
}

// const PostStack = createStackNavigator();

// function PostStackScreen() {
//   return (
//     <PostStack.Navigator>
//       <PostStack.Screen name="Images" component={ImagesScreen} />
//       <PostStack.Screen name="Description" component={DescriptionScreen} />
//       <PostStack.Screen name="Post" component={PostScreen} />
//       <PostStack.Screen name="Preview" component={PreviewScreen} />
//       <PostStack.Screen name="ItemDetail" component={ItemDetailScreen} />
//     </PostStack.Navigator>
//   );
// }

const ChatStack = createStackNavigator();

function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="AllChat" component={AllChatScreen} />
      <ChatStack.Screen name="ChatDetail" component={ChatScreen} 
       options={({ route }) => ({ title: route.params.name })} />
      <ChatStack.Screen name="ItemDetail" component={ItemDetailScreen} /> 
      <ChatStack.Screen name="SellerProfile" component={SellerProfileScreen} />
    </ChatStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="OwnProfile" component={OwnProfileScreen} />      
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home'
            } else if (route.name === 'Group') {
              iconName = 'group';
            } else if (route.name === 'Message') {
              iconName = 'message';
            } else if (route.name === 'Favorite') {
              iconName = 'favorite';
            } else if (route.name === 'Profile') {
              iconName = 'account-circle';
            }

            const hasNotification = route.name === 'Favorite';
            const BadgedIcon = withBadge(1)(Icon);

            if (!hasNotification) {
              return (
                <Icon
                  name={iconName}
                  color={color}
                  size={size}
                  onPress={() => console.log('hello')} />)
            }

            return (
              <BadgedIcon
                name={iconName}
                color={color}
                size={size}
                onPress={() => console.log('hello')} />)
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ tabBarBadge: 3 }} />
        <Tab.Screen name="Group" component={HistoryStackScreen} />
        <Tab.Screen name="Message" component={PostStackScreen} />
        <Tab.Screen name="Favorite" component={ChatStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
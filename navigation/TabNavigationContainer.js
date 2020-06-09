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
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="History" component={HistoryStackScreen} />
        <Tab.Screen name="Post" component={PostStackScreen} />
        <Tab.Screen name="Chat" component={ChatStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

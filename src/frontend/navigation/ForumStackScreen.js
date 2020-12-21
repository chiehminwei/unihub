import * as React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import screens
import { ForumScreen } from '~/screens/forum/ForumScreen';
import { ForumSearchScreen } from '~/screens/forum/ForumSearchScreen';
// import CreateGroupScreen  from '~/screens/forum/CreateGroupScreen';
import GroupDetailScreen  from '~/screens/forum/GroupDetailScreen';
import ThreadDetailScreen  from '~/screens/forum/ThreadDetailScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ForumStack = createStackNavigator();


export function ForumStackScreen() {
  const navigation = useNavigation()
  return (
    <ForumStack.Navigator initialRouteName="Forum" >
      <ForumStack.Screen options={{headerShown: false}} name="Forum" component={ForumScreen} />
      <ForumStack.Screen  name="Search" component={ForumSearchScreen} />
      <ForumStack.Screen  
          name='GroupDetail' 
          component={GroupDetailScreen} 
          options={
            
            {
            title: '',
            headerRight: () => (
              <TouchableOpacity style={{marginRight:16}} onPress={() => navigation.navigate('GroupInfo')}>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
              </TouchableOpacity>
            ),
            }
          }/>
      <ForumStack.Screen  name='ThreadDetail' component={ThreadDetailScreen} />
    </ForumStack.Navigator>
  );
}
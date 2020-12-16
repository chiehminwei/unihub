import React from 'react';
import { View,Text } from 'react-native';
import { styles } from '~/stylesheets/styles';
import { useNavigation } from '@react-navigation/native';


export function NotificationScreenHeader() {
  const navigation = useNavigation();
  return (
    <View 
      style={{ 
          flex:0.1,
          backgroundColor: '#F3F3F3', 
          alignSelf: 'stretch', 
          textAlign: 'center', 
      }}
    >
      <View style={styles.notificationheader}>
        <Text style={styles.notificatoin}>Notification</Text> 
      </View>
    </View>
  );
}

 
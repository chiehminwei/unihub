import React from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
import { styles } from '~/stylesheets/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NaviButton } from '~/components/button/NaviButton';



export function ForumScreenHeader() {
  const navigation = useNavigation();
  return (
    <View 
      style={{ 
          flex: 1,
          backgroundColor: '#F3F3F3', 
          alignSelf: 'stretch', 
          textAlign: 'center', 
      }}
    >
      <View style={{flexDirection:'row', flex:1,justifyContent:'space-between',alignItems:'center'}}>
        <Text style={styles.forum}> Forum </Text>
        <NaviButton onPress={() => navigation.navigate('Search')}
                    iconName='search'
                    size={30}
                    style={styles.search}
                    iconFamily={'material'}/>
        
        <NaviButton onPress={() => navigation.navigate('CreateGroup')}
                    iconName='plus-circle'
                    size={30}
                    style={styles.search}
                    iconFamily={'materialCommunity'}/>
      </View>
    </View>
  );
}

 
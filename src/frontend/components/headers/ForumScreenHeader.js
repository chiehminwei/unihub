import React from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
import { styles } from '~/stylesheets/styles';
import { useNavigation } from '@react-navigation/native';
import { NaviButton } from '~/components/button/NaviButton';
import Search from '~/components/Search';



export function ForumScreenHeader() {
  const navigation = useNavigation();
  return (
    <View 
      style={{ 
          maxHeight:50,
          flex: 1,
          backgroundColor: 'white', 
          alignSelf: 'stretch', 
          textAlign: 'center', 
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:16,
          alignItems:"center"
      }}
    >
        <View style={styles.forumsearch}>
           <Search onPress={() => navigation.navigate('Search')}/>
        </View>
        {/* <NaviButton onPress={() => navigation.navigate('Search')}
                    iconName='search'
                    size={30}
                    style={styles.search}
                    iconFamily={'material'}/> */}
        
        <NaviButton onPress={() => navigation.navigate('CreateGroup')}
                    iconName='plus-circle'
                    size={30}
                    style={styles.search}
                    iconFamily={'materialCommunity'}/>
      </View>
  );
}

 
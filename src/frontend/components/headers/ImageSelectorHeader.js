import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import ImageSelector from '../ImageSelector';
import { HeaderRightButton } from '../../components/button/HeaderRightButton';
import { BackButton } from '../../components/button/BackButton';
const ImageSelectorHeader = ({
  onFinish,
  navigation,
  maxSelectionNum,
  selected
}) => {

  return (
    <View style={styles.headerContainer}>
          <View style={{flex:1,}}>
            <BackButton title={'Back'} navigation={navigation}/>
          </View>
          <Text style={styles.title}> {maxSelectionNum-selected} images left </Text>
          <View style={{flex:1, alignItems:'flex-end'}}>
            <HeaderRightButton  title='Done' enabled={true} onPress={onFinish}/> 
            {/* update onPress={handlePost} */}
          </View>
        </View>
  );
};

export default ImageSelectorHeader;


 const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row' , 
    // height: headerHeight, 
    backgroundColor:"white",
    height:60,
    alignItems:'center', 
    alignSelf:'stretch'
  },
  title:{
    flex:1,
    textAlign :'center',
    fontFamily:'Avenir-Light',
    fontSize:14,
    fontWeight: '100',
  }
})
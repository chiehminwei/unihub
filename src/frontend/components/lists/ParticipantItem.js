import * as React from 'react';
import { View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Divider, Title } from 'react-native-paper';



const deviceWidth = Dimensions.get('window').width;
const avatorsize = 60
function ParticipantItem (props) {
  
  return(
  <View stlye={styles.cardContianer}>
    <TouchableOpacity 
      style={{ flex:1 }} 
      onPress={props.onPress} 
      props={props}>  
      <View style={styles.cardContent}>
        <View style={{flex:1 }}>
          <Image 
            source={{
              uri: props.user.uri
            }}
            style={styles.avator} />
        </View>
        <View style={{ flex:4, alignItems:'flex-start'}}>
          <Title>{ props.user.userName }</Title>
        </View>
      </View>
      <Divider style={{ height:1 }}/>
    </TouchableOpacity>
  </View>
)
};

export default ParticipantItem;


const styles = StyleSheet.create({
  cardContianer: {
    height: 80, 
    width: deviceWidth
  },
  avator:{
    width: avatorsize, 
    height: avatorsize, 
    borderRadius: avatorsize/2 
  },
  cardContent:{
    marginHorizontal: 16,
    marginVertical: 16,
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width:'90%' 
  }
})
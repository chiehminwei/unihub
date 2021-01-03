import * as React from 'react';
import { View, Image, Share, Dimensions, TouchableOpacity, Text } from 'react-native';
import { IconButton, Button, Card, Title, Subheading, Paragraph, Divider } from 'react-native-paper';
import AntIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import UserAvatar from 'react-native-user-avatar';


const blue = '#76D0DE';
const grey = '#6B878B';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Tag = ({ text }) => (
  <Text style={{ marginRight: 5, color:'#f38b8c', fontFamily:'Avenir-Medium', fontSize:12 }}>{ text }</Text>
)

const share = (event) => {
  const { eventName, description, uri } = event;
  Share.share({
    // message: description,
    title: `Check out this event on UniHub - ${eventName}`,
    url: event.uri,
  });
};


function EventItem ({ event }) {
  const navigation = useNavigation()
  const {
    eventName,
    description,
    tags,
    location,
    time,
    contact,
    uri,
    participants,
    filters,
    creator,
    host,
  } = event;

  const { groupName } = host;
  const { startDate, endDate } = time;
  const startDateStr = startDate.toDate().toLocaleDateString("en-US");

  return (

  
  <View style={{ width: screenWidth, flex:1 , backgroundColor:'white', }}> 
    <TouchableOpacity style={{flex:1}} onPress={ () => navigation.navigate('EventDetail', { event: event }) }>
    <Image source={{uri: uri }}
                style={{
                        flex:2, 
                        width: screenWidth,
                        height: 150,}}/>
      <View style={{ flex:1, marginLeft: 20, marginTop: 5, paddingBottom: 10}}>
              <View style={{alignItems:'center', flexDirection: 'row'}}> 
                <View style={{flex:3, flexDirection:'row', alignItems:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Avenir-Light', fontWeight:'800'}}>{ eventName }</Text>
                <Text style={{ textTransform: 'uppercase', fontFamily:'Avenir-Light', marginLeft:15 ,fontSize: 10 }}>{ startDateStr }</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end', marginEnd:16}}>
                  <Text style={{ color:'#1c7085', fontFamily:'Avenir-Light', fontSize: 10, fontWeight:'800' }}>{ location }</Text>
                </View>
              </View>  
            <View style={{
                      flex:1,
                      flexDirection: 'row',
                  }}>
              <AntIcon style={{ marginTop: 1.5, marginRight:1 }} color={grey} name="caretright" size={14}/>
              <Text style={{ color: grey , fontFamily:'Avenir-Light', fontSize:14 }}>{ groupName }</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop:10}}>
                    { tags.map(tag => <Tag key={tag} text={tag}/>)}
            </View>
        </View>
      </TouchableOpacity>
</View>
          

  );
}

export default EventItem;
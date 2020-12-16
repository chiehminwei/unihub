import * as React from 'react';
import { View, Image, Share, TouchableOpacity, Text } from 'react-native';
import { IconButton, Avatar, Button, Card, Title, Subheading, Paragraph, Divider } from 'react-native-paper';
import AntIcon from "react-native-vector-icons/AntDesign";


const blue = '#76D0DE';
const grey = '#6B878B';

const Tag = ({ text }) => (
  <Text style={{ marginRight: 5, color:'#f38b8c', fontFamily:'Avenir-Medium', fontSize:12 }}>{ text }</Text>
)

const share = (event) => {
  const { eventName, description, url } = event;
  Share.share({
    // message: description,
    title: `Check out this event on UniHub - ${eventName}`,
    url: event.uri,
  });
};



const EventItem = ({ event, navigation }) => (
  // <Card style={{borderRadius: 20, margin:10, maxWidth:'95%',flex:1 }} onPress={ () => navigation.navigate('EventDetail', { name: event.groupName }) }>
  //   <Card.Content style={{paddingVertical:0, paddingHorizontal:0}}>
  //     <View style={{flexDirection:'row', flex:1}}>
  //         <Image source={{uri: event.uri }}
  //           style={{
  //                   flex:1, 
  //                   maxWidth: 120,
  //                   height: 120,
  //                   borderTopLeftRadius:20, 
  //                   borderBottomLeftRadius:20,}}/>
  //       <View style={{marginLeft:10, marginTop: 5 , alignContent:'flex-start'}}> 
  //         <View style={{ flex: 1, flexDirection: 'row' }}>
  //           <Text style={{ textTransform: 'uppercase', fontFamily:'Avenir-Light', fontSize: 12 }}>{ event.eventDate }</Text>
  //           <Text style={{ marginLeft: 10, color:'#1c7085', fontFamily:'Avenir-Light', fontSize: 12, fontWeight:'800' }}>{ event.eventLocation }</Text>
  //         </View>
  //         <View style={{ flex: 1 }}>
  //             <Text >{ event.eventName }</Text>
  //             <View
  //               style={{
  //                 flex:1,
  //                 flexDirection: 'row',
  //               }}>
  //               <AntIcon style={{ marginTop: 1.5 }} color={grey} name="caretright" size={14}/>
  //               <Text style={{ color: grey }}>{ event.groupName }</Text>
  //             </View>
  //             <View style={{ flex: 1, flexDirection: 'row'}}>
  //               { event.tags.map(tag => <Tag key={tag} text={tag}/>)}
  //             </View>
  //           </View>
  //       </View>
  //     </View>
  //   </Card.Content>
  //   {/* <Divider style={{ marginTop: 15 }}/> */}
  //   {/* <Card.Actions style={{ flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
  //     <Button onPress={ () => navigation.navigate('EventDetail') } icon="message-processing">{ event.numMessages}</Button>
  //     <Button onPress={ () => navigation.navigate('EventDetail') } icon="run">{ event.numGoing}</Button>
  //     <Button onPress={ () => share(event) } icon="share"/>
  //   </Card.Actions> */}
  // </Card>




  
  <View style={{ margin:10, maxHeight:120, maxWidth:'95%', flex:1 , backgroundColor:'white', shadowOffset:{height:10, width:1}, shadowColor:'grey', shadowOpacity: 0.2,shadowRadius:10, elevation: 3}}> 
    <TouchableOpacity style={{flex:1}} onPress={ () => navigation.navigate('EventDetail', { event: event }) }>
      <View style={{flexDirection:'row', flex:1}}>
        <Image source={{uri: event.uri }}
                style={{
                        flex:1, 
                        maxWidth: 120,
                        height: 120,
                        }}/>
          <View style={{flex:1, marginLeft: 20, marginTop: 5}}>
            <View style={{ alignContent:'flex-end', flexDirection: 'row'}}> 
              <View style={{flex:1}}>
                <Text style={{ textTransform: 'uppercase', fontFamily:'Avenir-Light', fontSize: 10 }}>{ event.eventDate }</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end',marginEnd:16}}>
                <Text style={{ color:'#1c7085', fontFamily:'Avenir-Light', fontSize: 10, fontWeight:'800' }}>{ event.eventLocation }</Text>
              </View>
            </View>  
            <View style={{marginTop: 10}}>
              <Text style={{fontSize:18, fontFamily:'Avenir-Light', fontWeight:'800'}}>{ event.eventName }</Text>
            </View>
            <View style={{
                      flex:1,
                      flexDirection: 'row',
                  }}>
              <AntIcon style={{ marginTop: 1.5, marginRight:1 }} color={grey} name="caretright" size={14}/>
              <Text style={{ color: grey , fontFamily:'Avenir-Light', fontSize:14 }}>{ event.groupName }</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10}}>
                    { event.tags.map(tag => <Tag key={tag} text={tag}/>)}
            </View>
          </View>
        </View>
      </TouchableOpacity>
</View>
          

);

export default EventItem;
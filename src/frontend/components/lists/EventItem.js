import * as React from 'react';
import { View, Image } from 'react-native';
import { IconButton, Avatar, Button, Card, Title, Subheading, Paragraph, Divider, Text } from 'react-native-paper';
import AntIcon from "react-native-vector-icons/AntDesign";


const blue = '#76D0DE';
const grey = '#6B878B';

const Tag = ({ text }) => (
  <Text style={{ marginRight: 5, color: blue }}>{ text }</Text>
)

const EventItem = ({ event, navigation }) => (
  <Card style={{ margin: 10, flex:1 }} onPress={ () => navigation.navigate('EventDetail') }>
    <Card.Content>
      <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12 }}>
        <Text style={{ textTransform: 'uppercase' }}>{ event.eventDate }</Text>
        <Text style={{ marginLeft: 10, color: blue }}>{ event.eventLocation }</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
        <View>
          <Title>{ event.eventName }</Title>
          <View
            style={{
              flex:1,
              flexDirection: 'row',
            }}>
            <AntIcon style={{ marginTop: 1.5 }} color={grey} name="caretright" size={14}/>
            <Text style={{ color: grey }}>{ event.groupName }</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row'}}>
            { event.tags.map(tag => <Tag key={tag} text={tag}/>)}
          </View>
        </View>
        <Image source={{uri: event.uri }}
        style={{width: 100, height: 100}} />
      </View>
    </Card.Content>
    <Divider style={{ marginTop: 15 }}/>
    <Card.Actions style={{ flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
      <Button onPress={ () => navigation.navigate('EventDetail') } icon="message-processing">{ event.numMessages}</Button>
      <Button onPress={ () => navigation.navigate('EventDetail') } icon="run">{ event.numGoing}</Button>
      <Button onPress={ () => navigation.navigate('EventDetail') } icon="share"/>
    </Card.Actions>
  </Card>
);

export default EventItem;
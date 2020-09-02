// import * as React from 'react';
// import { View, Image, Share } from 'react-native';
// import { IconButton, Avatar, Button, Card, Title, Subheading, Paragraph, Divider, Text } from 'react-native-paper';
import AntIcon from "react-native-vector-icons/AntDesign";
import * as React from 'react';
import { View, Image } from 'react-native';
import { IconButton, Avatar, Button, Card, Title, Subheading, Paragraph, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// import useNavigation from '@react-navigation/native';


const blue = '#76D0DE';
const grey = '#6B878B';






function ThreadItem ({ thread })  {
  const navigation = useNavigation()
  return(
  <Card style={{ margin: 5, maxWidth:'95%',flex:1 }} onPress={ () => navigation.navigate('ThreadDetail') }>
  <Card.Content>
    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12 }}>
    <View
          style={{
            flex:1,
            flexDirection: 'row',
          }}>
          <AntIcon style={{ marginTop: 1.5 }} color={grey} name="caretright" size={14}/>
          <Text style={{ color: grey }}>{ thread.groupName }</Text>
        </View>
      <Text style={{ textTransform: 'uppercase', fontSize: 10 }}>{ thread.publishTime }</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Title style={{margin:10}}>{ thread.threadTitle }</Title>
        <Text style={{margin:10}}>{ thread.content }</Text>
      </View>
      <Image source={{uri: thread.uri }}
      style={{width: 100, height: 100}} />
    </View>
  </Card.Content>
  <Divider style={{ marginTop: 15 }}/>
  <Card.Actions style={{ flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
    <Button onPress={ () => navigation.navigate('ThreadDetail') } icon="thumb-up">{ thread.numThumbsups}</Button>
    <Button onPress={ () => navigation.navigate('ThreadDetail') } icon="message-processing">{ thread.numComments}</Button>
  </Card.Actions>
</Card>
)
};

export default ThreadItem;
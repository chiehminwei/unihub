import * as React from 'react';
import { View, Image } from 'react-native';
import { Card, Title } from 'react-native-paper';





function FriendChatItem (props) {
  return(
  <Card style={{margin:5, maxWidth:'95%', flex:1 }} onPress={props.onPress} props={props}>
    <Card.Content style={{padding:0}}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width:'90%' }}>
        <View style={{flex:1 }}>
          <Image source={{uri: props.user.uri}}
                style={{width: 50, height: 50 }} />
        </View>
        <View style={{ flex:3, alignItems:'flex-start'}}>
        <Title>{ props.user.userName }</Title>
        </View>
      </View>
    </Card.Content>
  </Card>
)
};

export default FriendChatItem;
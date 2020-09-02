import * as React from 'react';
import { View, Image } from 'react-native';
import { IconButton, Avatar, Button, Card, Title, Subheading, Paragraph, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';




function GroupItem ({ group })  {
  const navigation = useNavigation()
  return(
  <Card style={{margin:5, maxWidth:'95%', flex:1 }} onPress={()=>navigation.navigate('GroupDetail')}>
    <Card.Content style={{padding:0}}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width:'90%' }}>
        <View style={{flex:1}}>
          <Image source={{uri: group.uri}}
                style={{width: 50, height: 50}} />
        </View>
        <View style={{ flex:3, alignItems:'flex-start'}}>
        <Title>{ group.groupName }</Title>
        <Text>{ group.numMembers } members</Text>
        </View>
      </View>
    </Card.Content>
  </Card>
)
};

export default GroupItem;
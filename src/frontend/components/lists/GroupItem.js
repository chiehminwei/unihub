import * as React from 'react';
import { View, Image } from 'react-native';
import { IconButton, Avatar, Button, Card, Title, Subheading, Paragraph, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';




function GroupItem ({ group })  {
  const navigation = useNavigation()
  return(
  <View style={{margin:5, maxWidth:'95%', flex:1, marginVertical:10 }} onPress={()=>navigation.navigate('GroupDetail')}>
    <Card.Content style={{padding:0}}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width:'90%' }}>
          <Image source={{uri: group.uri}}
                style={{width: 80 , height: 80, borderRadius:5}} />
        <View style={{ flex:3, marginHorizontal:20}}>
        <Title>{ group.groupName }</Title>
        <Text>{ group.numMembers } members  </Text>
        </View>
      </View>
    </Card.Content>
  </View>
)
};

export default GroupItem;
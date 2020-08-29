import * as React from 'react';
import { View, Image } from 'react-native';
import { IconButton, Avatar, Button, Card, Title, Subheading, Paragraph, Divider, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const blue = '#76D0DE';
const grey = '#6B878B';

const Tag = ({ text }) => (
  <Text style={{ marginRight: 5, color: blue }}>{ text }</Text>
)

const GroupItem = ({ group }) => (
  <Card style={{ margin: 10 }}>
    <Card.Content>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width:'90%' }}>
        <Image source={{uri: 'https://picsum.photos/700'}}
               style={{width: 50, height: 50}} />
        <Title>{ group.groupName }</Title>
      </View>
    </Card.Content>
  </Card>
);

export default GroupItem;
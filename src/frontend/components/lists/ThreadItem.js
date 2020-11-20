import * as React from 'react';
import { View, Image, Dimensions, Share } from 'react-native';
import { Button, Card, Title, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";

// import useNavigation from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const long_text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`

const share = (props) => {
  const { threadTitle, description, uri } = props;
  Share.share({
    // message: `${props.description}`,
    title: `Check out this event on UniHub - ${props.threadTitle}`,
    url: props.uri,
  });
};






function ThreadItem ({ thread })  {
  const navigation = useNavigation()
  return(
  <Card style={{ width:screenWidth, marginVertical:5, flex:1 }} onPress={ () => navigation.navigate('ThreadDetail') }>
  <Card.Content style={{paddingHorizontal:0}}>
    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12 }}>
      <Image  source={{uri: thread.uri }}
                style={{width: 50, height: 50, borderRadius: 25}} />
      <View style={{flex:1, marginLeft: 12}}>
        <View style={{ flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text style={{ fontFamily:'Avenir-Book', fontWeight:'800', color: 'black' }}>{ thread.userName }</Text>
          </TouchableOpacity>
            
          <Text style={{ fontFamily:'Avenir-Book', color:'black'}}> in </Text>   

          <TouchableOpacity>
            <Text style={{ fontFamily:'Avenir-Book', fontWeight:'800', color:'black'}}>{ thread.groupName }</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text> 19h </Text>
        </View>
      </View>
      <Text style={{ textTransform: 'uppercase', fontSize: 10, marginRight:16 }}>{ thread.publishTime }</Text>
    </View>
      <View style={{ flex: 1, marginTop:10, flexDirection: 'column', justifyContent: 'space-between'}}>
        <View>
          <Title style={{margin:10, fontFamily:'Avenir-Book'}}>{ thread.threadTitle }</Title>
          <Text style={{margin:10, fontFamily:'Avenir-Book'}}>{ long_text }</Text>
        </View>
      </View>
      <Image  source={{uri: thread.uri }}
              style={{ width: screenWidth, height: 200}} />
      
  </Card.Content>
  <Divider/>
  <Card.Actions style={{ flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
    <Button onPress={ () => navigation.navigate('ThreadDetail') } icon="thumb-up" color='grey'>{ thread.numThumbsups}</Button>
    <Button onPress={ () => navigation.navigate('ThreadDetail') } icon="message-processing" color='grey'>{ thread.numComments}</Button>
    <Button onPress={ () => share(thread) } icon="share" color='grey'></Button>
  </Card.Actions>
</Card>
)
};

export default ThreadItem;
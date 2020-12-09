import React from 'react';
import { StyleSheet, Image, ScrollView, View, Share, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Card, Title, Divider, Text } from 'react-native-paper';
import { withFirebaseHOC } from "~/../firebase";

const share = (props) => {
  const { threadTitle, description, uri } = props;
  Share.share({
    // message: `${props.description}`,
    title: `Check out this event on UniHub - ${props.threadTitle}`,
    url: props.uri,
  });
};
const long_text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const thread = 
  {
    groupName: 'Thon 2020',
    userName: 'Jimmy Wei',
    threadTitle: 'For the kid!!',
    content: 'long_text',
    numThumbsups: 20,
    numComments: 10,
    groupID: 'U123',
    userID: 'Y123',
    threadID: 'T123',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  }
const ThreadDetailScreen = ({ threadID, navigation, firebase }) => {

  const  
  {
    groupName,
    userName,
    threadTitle,
    content,
    numThumbsups,
    numComments,
    groupID,
    userID,
    // threadID,
    publishTime,
    uri,
  } = thread

  return (
      <ScrollView style={styles.scrollView}>
        <Card style={{ width:screenWidth, marginVertical:5, flex:1 }}>
          <Card.Content style={{paddingHorizontal:0}}>
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12 }}>
              <Image  source={{uri: thread.uri }}
                        style={{width: 50, height: 50, borderRadius: 25}} />
              <View style={{flex:1, marginLeft: 12}}>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity>
                    <Text style={{ fontFamily:'Avenir-Book', fontWeight:'800', color: 'black' }}>{ thread.userName }</Text>
                  </TouchableOpacity>
                    
                  <Text style={{fontFamily:'Avenir-Book', color:'black'}}> in </Text>   

                  <TouchableOpacity>
                    <Text style={{fontFamily:'Avenir-Book', fontWeight:'800', color:'black'}}>{ thread.groupName }</Text>
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
            <Button onPress={ () => () => share(thread) } icon="share" color='grey'></Button>
          </Card.Actions>
        </Card>

        <View style={{paddingHorizontal:16}}>
          <Text style={{fontFamily:"Avenir-Light",
                        fontSize: 20,
                        fontWeight:'bold'}}>
            Comments
          </Text>
          <Text>
            sss
          </Text>
        </View>
      </ScrollView>
  );
}

export default withFirebaseHOC(ThreadDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 42,
  },
  groupName: {

  },
  hostName: {

  },

  image: {
  	width: 100,
  	height: 100
  },
  eventDate: {

  },
  eventLocation: {

  },
  description: {

  },
  
});
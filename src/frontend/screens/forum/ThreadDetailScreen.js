import * as React from 'react';
import { View, Image, Dimensions, Share, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageCarousel from '~/components/lists/ImageCarousel'
import { withFirebaseHOC } from "~/../firebase";
// import useNavigation from '@react-navigation/native';


const share = (props) => {
  const { threadTitle, description, uri } = props;
  Share.share({
    // message: `${props.description}`,
    title: `Check out this event on UniHub - ${props.threadTitle}`,
    url: props.uri,
  });
};
const screenWidth = Dimensions.get('window').width;


const ThreadDetailScreen = ({ threadID, firebase, route }) => {
  const navigation = useNavigation()
  const { 
    creator,
    post,
    title,
    group,
    imgs,
    numLikes,
    numComments,
    publishTime,
  } = route.params.thread

  const { email } = creator;
  const { groupName, uri } = group;

  return (
      <ScrollView style={styles.scrollView}>
        <Card style={{ width:screenWidth, marginVertical:5, flex:1 }}  >
  <Card.Content style={{paddingHorizontal:0}}>
    <TouchableOpacity>
    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12 }}>
      <Image  source={{uri: uri }}
                style={{width: 50, height: 50, borderRadius: 25}} />
      <View style={{flex:1, marginLeft: 12}}>
        <View style={{ flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text style={{ fontFamily:'Avenir-Book', fontWeight:'800', color: 'black' }}>
              { email }
              sss
            </Text>
          </TouchableOpacity>
            
          <Text style={{ fontFamily:'Avenir-Book', color:'black'}}> in </Text>   

          <TouchableOpacity>
            <Text style={{ fontFamily:'Avenir-Book', fontWeight:'800', color:'black'}}>{ groupName }</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text> 19h </Text>
        </View>
      </View>
      <Text style={{ textTransform: 'uppercase', fontSize: 10, marginRight:16 }}>
        { publishTime.toString() } 
      </Text>
    </View>
      <View style={{ flex: 1, marginTop:10, flexDirection: 'column', justifyContent: 'space-between'}}>
        <View>
          <Title style={{margin:10, fontFamily:'Avenir-Book'}}>{ title }</Title>
          <Text style={{margin:10, fontFamily:'Avenir-Book'}}>{ post }</Text>
        </View>
      </View>
      </TouchableOpacity>
      { ( imgs.length === 0 ) ? null: (imgs.length === 1) ? 
        <Image  source={{uri: imgs[0] }}
        style={{ width: screenWidth, height: screenWidth}} />
        :
        <ImageCarousel uris={imgs}/>
      }
      
      
  </Card.Content>
  <Divider/>
  <Card.Actions style={{ flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
    <Button onPress={ () => navigation.navigate('ThreadDetail') } icon="thumb-up" color='grey'>{ numLikes }</Button>
    <Button onPress={ () => navigation.navigate('ThreadDetail') } icon="message-processing" color='grey'>{ numComments }</Button>
    <Button onPress={ () => share(thread) } icon="share" color='grey'></Button>
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



// import GooglePlacesInput from '~/components/GooglePlacesInput'
import React,{ useState, useEffect, useRef, Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Overlay, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { HeaderRightButton } from '../../components/button/HeaderRightButton';
import { BackButton } from '../../components/button/BackButton';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles';
const windowWidth = Dimensions.get('window').width;


function ChooseLocationScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const initialRegion = {
    latitude: 20.791012020754664,
    longitude: 77.90109766935834,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
  const [region, setRegion] = useState(initialRegion)
  const [markerCoord, setMarkerCoord] = useState(initialRegion);

  const marker = useRef(null);
  const _map = useRef(null);

  const callout = () => {
    marker.current.showCallout();
  }

  const onMapPress = ({ nativeEvent }) => {
    const newRegion = {
      ...nativeEvent.coordinate,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }
    setMarkerCoord(newRegion);
  }

  const onRegionChange = (region) => {
    setRegion(region);
  }
   
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } 

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0421
      }
      setRegion(newRegion);
      setMarkerCoord(newRegion);
    })();
  }, []);

  const handlePost = () => {
    navigation.navigate('Create', { location: markerCoord, placeName: name, placeAddress: address });
  }
  
  return(
    <SafeAreaView style={[screenStyles.safeArea,{alignItems:'stretch', backgroundColor:'white'}]} edges={['right','top','left']}>
      <View style={styles.headerContainer}>
        <View style={{flex:1,}}>
          <BackButton title={'Back'} navigation={navigation}/>
        </View>
        <View style={{flex:1, alignItems:'flex-end'}}>
          <HeaderRightButton
            title='OK' 
            enabled= {true} 
            onPress={handlePost} 
          />
        </View>
      </View>
      <View style={{flex:1, alignContent:'center'}}>
      { location && 
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            ref={_map}
            initialRegion={region}
            onPress={onMapPress}
            onRegionChangeComplete={onRegionChange}
          >
            <Marker
              draggable
              coordinate={markerCoord}
              title={name}
              description={address}
              ref={marker}
            />
          </MapView>
      }
      
      <View style={{position:'absolute', top: 0, alignSelf:'center', flex:1,padding:5, width: windowWidth}}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          fetchDetails={true}
          returnKeyType={'search'}
          listViewDisplayed={'auto'}
          nearbyPlacesAPI={'GoogleReverseGeocoding'}
          onPress={(data, details = null) => {
            const { name, formatted_address } = details;
            setName(name);
            setAddress(formatted_address);

            const newRegion = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }
            setRegion(newRegion);
            setMarkerCoord(newRegion);
            _map.current.animateToRegion(newRegion, 200)
            setTimeout(() => { callout(); }, 300);
          }}
          query={{
            key: 'AIzaSyBLUUDOAI5lHbzfym0O182Q1nD20Ru_8gQ',
            language: 'en',
          }}
          enableHighAccuracyLocation
          enablePoweredByContainer={false}
          currentLocation={true}
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }}
          
        />
      </View>
    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  headerContainer:{
    flexDirection:'row' , 
    // height: headerHeight, 
    backgroundColor:"white",
    height:60,
    alignItems:'center', 
    alignSelf:'stretch'
  },
});


export default ChooseLocationScreen;



// import GooglePlacesInput from '~/components/GooglePlacesInput'
import React,{ useState, useEffect, useRef, Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Overlay } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
const windowWidth = Dimensions.get('window').width;

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

function ChooseLocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(
    {
      latitude: 20.791012020754664,//location.coords.latitude,
      longitude: 77.90109766935834,//location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  )

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('ssss');
    // console.log(ref.current?.setAddressText)
  }, []);
  
   
   useEffect(() => {
     (async () => {
       let { status } = await Location.requestPermissionsAsync();
       if (status !== 'granted') {
         setErrorMsg('Permission to access location was denied');
         return;
       }

     let location = await Location.getCurrentPositionAsync({});
     setLocation(location);

     setRegion( 
        {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0421
        }
     )
   })();
 }, []);
  
  return(
    <View style={{flex:1, alignContent:'center'}}>
      { (location!== []) && 
          <MapView
          // ref={ref => _map = ref}
          style={styles.mapStyle}
          region={region}
          initialregion={
            {
              latitude: 20.791012020754664,//location.coords.latitude,
              longitude: 77.90109766935834,//location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }
          }
        >
        </MapView>}
      
      <View style={{position:'absolute', top: 0, alignSelf:'center', flex:1,padding:5, width: windowWidth}}>
        <GooglePlacesAutocomplete
          // ref={ref}
          placeholder='Search'
          fetchDetails={true}
          returnKeyType={'search'}
          listViewDisplayed={'auto'}
          nearbyPlacesAPI={'GoogleReverseGeocoding'}
          onPress={(data, details = null) => {

            setRegion(
              {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }
            )
          }}
          query={{
            key: 'AIzaSyBLUUDOAI5lHbzfym0O182Q1nD20Ru_8gQ',
            language: 'en',
            // type:'(cities)'
          }}
          predefinedPlaces={[homePlace, workPlace]}
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
});







export default ChooseLocationScreen;



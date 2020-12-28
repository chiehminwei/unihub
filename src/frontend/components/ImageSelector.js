import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ImageSelectorHeader from '~/components/headers/ImageSelectorHeader'
// import StatusBarPlaceHolder from './StatusBarPlaceHolder';

const ForceInset = {
  top: 'never',
  bottom: 'never',
};

export default function  ImageSelector ({navigation,route, selected}){
  const Params = route.params
  const maxSelections = 9
  const numCanbeSelected = maxSelections - Params.numSelectedImage
  const onDone = (photos) => {
    navigation.navigate('CreateThread',{ photos })
  };
  const onSelected = selected
  // if (selected === numCanbeSelected) return (
  //   alert('Exceed maximum number of images')
  // )


  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        <View style={styles.container}>
          <AssetsSelector
            options={{
              assetsType: ['photo'],
              noAssets: {
                Component: () => <View></View>,
              },
              maxSelections: numCanbeSelected,
              margin: 2,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: 'white',
              videoIcon: {
                Component: Ionicons,
                iconName: 'ios-videocam',
                color: 'green',
                size: 22,
              },
              selectedIcon: {
                Component: Ionicons,
                iconName: 'ios-checkmark-circle-outline',
                color: 'white',
                bg: '#bad4da99',
                size: 26,
              },
              // defaultTopNavigator: {
              //   continueText: 'DONE ',
              //   goBackText: 'BACK ',
              //   textStyle: styles.textStyle,
              //   buttonStyle: styles.buttonStyle,
              //   backFunction: () => goBack(),
              //   doneFunction: (data) => onDone(data),
              // },

              /* Test Custom Navigator*/

              CustomTopNavigator: {
                        Component: ImageSelectorHeader,
                        props: {
                            backFunction: true,
                            text: 'Done',
                            maxSelectionNum: numCanbeSelected,
                            doneFunction: (data) => onDone(data),
                            selected: onSelected
                        },
                    } 
              
              
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// if you want to use defaultTopNavigator you must send in basic style
const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row' , 
    // height: headerHeight, 
    backgroundColor:"white",
    height:60,
    alignItems:'center', 
    alignSelf:'stretch'
  },
  container: {
    flex: 1,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    width: 100,
  },
});



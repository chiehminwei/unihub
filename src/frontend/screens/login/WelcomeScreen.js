import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '~/components/copy/AppButton';
import Colors from '~/utils/colors';
import useStatusBar from '~/hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('~/../../assets/U.png')} style={styles.logo} />
          <Text style={styles.subtitle} >UniHub</Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={{marginVertical: 10, 
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 10,
                                  borderWidth:2,
                                  borderColor:'#1c7085',
                                  backgroundColor:'#1c7085',
                                  padding: 15,
                                  width: '100%'} }
                            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity> */}
          <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
          <TouchableOpacity style={{marginVertical: 10, 
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 10,
                                  borderWidth:2,
                                  borderColor:'#1c7085',
                                  backgroundColor:'white',
                                  padding: 15,
                                  width: '100%'} 
                                  }
                            onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.buttonText,{color:'#1c7085'}]}>Register</Text>
          </TouchableOpacity>
          
          {/* <AppButton
            title="Register"
            color="secondary"
            onPress={() => navigation.navigate('Register')}
          /> */}
          <Text>View as Guest</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonText:{
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  safeArea:{
    flex: 1, 
    alignItems: 'stretch', 
    backgroundColor: '#F3F3F3',
  },
  container: {
    flex: 1,
    alignContent:'space-between',
    alignItems: 'center',
    backgroundColor: 'white'  //Colors.mediumGrey
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent:'center',
    marginTop: 120
  },
  logo: {
    width: 125,
    height: 125,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily:'Avenir-Heavy',
    paddingVertical: 20,
    color: '#1c7085',
    textTransform: 'uppercase'
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    alignContent:'center',
    alignItems:'center',
    width: '100%'
  }
});
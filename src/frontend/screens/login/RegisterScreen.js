import React, { useState, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView,Text, View, ScrollView, Image ,Dimensions, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import { List, Divider } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '~/utils/colors';
import SafeView from '~/components/copy/SafeView';
import Form from '~/components/form/Form';
import FormField from '~/components/form/FormField';
import FormButton from '~/components/form/FormButton';
import IconButton from '~/components/copy/IconButton';
// import { Image } from 'react-native-elements';
import FormErrorMessage from '~/components/form/FormErrorMessage';
import { withFirebaseHOC } from '~/../firebase';
import useStatusBar from '~/hooks/useStatusBar';
import { screenStyles } from '~/stylesheets/screenStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
const uuidv4 = require('random-uuid-v4');


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Name'),
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must match Password')
    .required('Confirm Password is required')
});

function RegisterScreen({ navigation, firebase }) {
  useStatusBar('light-content');
  const screenWidth = Math.round(Dimensions.get('window').width)
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [registerError, setRegisterError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === 'eye') {
      setConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === 'eye-off') {
      setConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignUp(values, actions) {
    const { email, password, name } = values;
    try {
      await firebase.registerWithEmail(email, password);
        
      if (uri !== EMPTY_URI) {
        const photoURL = await uploadImageAsync(uri);
        const profile = {
          displayName: name,
          photoURL,
        }
        await firebase.updateUserProfile(profile);
      }
      else {
        const profile = {
          displayName: name,
        }
        await firebase.updateUserProfile(profile);
      }
            
    } catch (error) {
      setRegisterError(error.message);
    }
  }



  // image
  const EMPTY_URI = 'data:img';
  const screenHeight = Math.round(Dimensions.get('window').height)
  const [uri, setURI] = useState('data:img'); 
  const [snapPoints, setSnapPoints] = useState([0, 0.43*screenHeight, 0]);
  // console.log(screenHeight)
  const sheetRef = useRef(null);
  const renderBottomSheet = () => (
    <View
      style={{
        backgroundColor: 'white',
        height: 0.43*screenHeight,
        alignSelf:'stretch'
      }}
    >
      <List.Item
        onPress={takePhoto}
        title="Take Photo"
        titleStyle={{ textAlign: 'center' }}
      />
      <Divider/>
      <List.Item
        onPress={chooseFromAlbum}
        title="Choose from Album"
        titleStyle={{ textAlign: 'center' }}
      />
      {uri !== EMPTY_URI && (
        <List.Item
          onPress={deletePhoto}
          title="Delete Photo"
          titleStyle={{ textAlign: 'center', color: 'red' }}
        />)
      }
      <Divider style={{ height: 5 }}/>
      <List.Item
        onPress={() => sheetRef.current.snapTo(2)}
        title="Cancel"
        titleStyle={{ textAlign: 'center' }}
      />
    </View>
  );

  let fall = new Animated.Value(1)    
  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    })
    const AnimatedView = Animated.View;

    return (
      <AnimatedView
        pointerEvents="none"
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    )
  }

  const takePhoto = async () => {
    sheetRef.current.snapTo(2);
    await Permissions.askAsync(Permissions.CAMERA);
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    handleImagePicked(pickerResult);
  }

  const chooseFromAlbum = async () => {
    sheetRef.current.snapTo(2);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 3],
    });

    handleImagePicked(pickerResult);
  }

  const deletePhoto = () => {
    sheetRef.current.snapTo(2);
    setURI(EMPTY_URI);
    setSnapPoints([0, 0.43*screenHeight , 0]);
  }

  const handleImagePicked = pickerResult => {
    if (!pickerResult.cancelled) {
        setURI(pickerResult.uri);
        setSnapPoints([0, 0.47*screenHeight, 0]);
    }
  };

  return (
    <SafeAreaView style={[screenStyles.safeArea,{alignItems:'stretch',padding: 15, backgroundColor: 'white',}]} edges={['right','top','left']}>
    {/* // <SafeView style={styles.container}> */}
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', marginBottom: 0}} behavior="padding" enabled   keyboardVerticalOffset={0}>
      
        <IconButton
          style={styles.backButton}
          iconName="keyboard-backspace"
          color={colors.primary}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <ScrollView style={{flex:1 }}  showsVerticalScrollIndicator={false}>
          <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity onPress={() => sheetRef.current.snapTo(1)}>
              { uri === EMPTY_URI ? 
              <View style={{alignItems:'center'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius:50,
                  width: 100, height:100, maxHeight:100, backgroundColor: '#bdbdbd' }} > 
                  <FontAwesome5 name="user-alt" size={50} color="grey"/>
                </View>
                <Text style={{padding:10, fontFamily:'Avenir-Light', fontWeight: '100', fontSize:12, color:'grey'}}>
                  You can update your profile image later
                </Text>
              </View>
                : 
                <View style={{alignItems:'center'}}>
                  <Image              
                    source={{ uri }}
                    style={{ justifyContent: 'center', alignItems: 'center', borderRadius:50, borderWidth: 4,
                    width: 100, height:100, maxHeight:100,}}
                  />
                  <Text style={{padding:10, fontFamily:'Avenir-Light', fontWeight: '100', fontSize:12, color:'grey'}}>
                    You photo has been uploaded!
                  </Text>
                </View>
              }
            </TouchableOpacity>
            
          
          <Form
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={values => handleOnSignUp(values)}
          >
            <FormField
              name="name"
              leftIcon="account"
              placeholder="Enter name"
              autoFocus={false}
            />
            <FormField
              name="email"
              leftIcon="email"
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <FormField
              name="password"
              leftIcon="lock"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType="password"
              rightIcon={rightIcon}
              handlePasswordVisibility={handlePasswordVisibility}
            />
            <FormField
              name="confirmPassword"
              leftIcon="lock"
              placeholder="Confirm password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={confirmPasswordVisibility}
              textContentType="password"
              rightIcon={confirmPasswordIcon}
              handlePasswordVisibility={handleConfirmPasswordVisibility}
            />
            <FormButton title={'Register'} />
            {<FormErrorMessage error={registerError} visible={true} />}
          </Form>
        </View>
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        borderRadius={10}
        renderContent={renderBottomSheet}
        callbackNode={fall}
        enabledInnerScrolling={true}
      />
      { renderShadow() }
      </KeyboardAvoidingView>
    {/* // </SafeView> */}
    </SafeAreaView>
  );
}

export default withFirebaseHOC(RegisterScreen);

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(uuidv4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  backButton: {
    flex:0.1
  }
});
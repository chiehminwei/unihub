import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import * as Yup from 'yup';

import colors from '~/utils/colors';
import SafeView from '~/components/copy/SafeView';
import Form from '~/components/form/Form';
import FormField from '~/components/form/FormField';
import FormButton from '~/components/form/FormButton';
import IconButton from '~/components/copy/IconButton';
import FormErrorMessage from '~/components/form/FormErrorMessage';
import { withFirebaseHOC } from '~/../firebase';
import useStatusBar from '~/hooks/useStatusBar';

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
    const { email, password } = values;
    try {
      await firebase.registerWithEmail(email, password);
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
   
    <SafeView style={styles.container}>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={colors.primary}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <View style={{flex:1}}>
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
            autoFocus={true}
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
    </SafeView>

  );
}

export default withFirebaseHOC(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  backButton: {
    flex:0.1
  }
});
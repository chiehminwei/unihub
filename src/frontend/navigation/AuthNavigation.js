import { createStackNavigator } from '@react-navigation/stack';
import Initial from "~/screens/login/Login";
import Login from "~/screens/login/Login";
import Signup from "~/screens/login/Signup";
import ForgotPassword from "~/screens/login/ForgotPassword";


const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName="Initial">
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;

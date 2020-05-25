import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import Upload from "../screens/Upload"
import Chat from "../screens/Chat"

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Upload: { screen: Upload },
    Chat: { screen: Chat }
  },
  {
    initialRouteName: "Home"
  }
);

export default AppNavigation;

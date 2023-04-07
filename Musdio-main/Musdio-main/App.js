import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./components/Redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Setting, SettingGeneral, HomeScreen, Profile, Playlist, Login, LoadingSongs, NowPlaying} from './components/'
import Albums from "./components/Albums/Albums"
import Footer from "./components/General/Footer";
import Search from "./components/General/Search";
import TopTreding from "./components/Albums/TopTreding";
import Sleep from "./components/Song/Sleep";
import ChangePassword from "./components/General/ChangePassword";
import { SignUp,FormInput } from "./components/Authentication/SignUp";
import AboutUs from "./components/General/AboutUs"
import { Forgot } from "./components/Authentication/ForgotPassword";
export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Footer" component={Footer} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="NowPlaying" component={NowPlaying} initialParams={{ playID: '2Q4ITzM0aLxpwZugrHKC' }}/>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Playlist" component={Playlist} />
          <Stack.Screen name="SignIn" component={Login} />
          <Stack.Screen name="LoadingSongs" component={LoadingSongs} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="TopTreding" component={TopTreding} />
          <Stack.Screen name="Sleep" component={Sleep}/>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Albums" component={Albums} initialParams = {{nameAlbum:'test',Data:['2Q4ITzM0aLxpwZugrHKC']}}/>
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="FormInput" component={FormInput} initialParams={{ playID: '9XOr8Yi7cWYLnSDwfSJibjExJ7d2' }} />

        </Stack.Navigator>

      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: "center",
  },
  footer: {
    flex: 8,
  },
  content: {
    flex: 92,
  },
});
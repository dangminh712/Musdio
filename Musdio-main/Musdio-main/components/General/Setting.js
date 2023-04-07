import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { auth } from '../Firebase'
import { SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllSongs } from '../Redux/musicSlider';
import { deleteUserInfo } from '../Redux/userSlider';
import { logOutAsync } from 'expo-facebook';


function Setting({ navigation }) {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch() 
  const facebookState = useSelector((state) => state.facebook)
  user = user.userData
  console.log(user)
  const check = () => {
    const user = auth.currentUser
    console.log(user.providerData[0].providerId)
    if (user.providerData[0].providerId != "password") {
      alert("Can't change password !")
    }
    else {
      navigation.navigate("ChangePassword")
    }
  }
  const confirm = () => {
    Alert.alert(
      "Confirm",
      "Do you want to log out from app ?",
      [
        {
          text: "Yes",
          onPress: () => {
            try {
              signOut(auth)
              .then(() => {
                if (facebookState.isLoggedin) {
                  logOutAsync()
                } 
              })
              .then(() => {
                Alert.alert("Success", "Log out success.")
                navigation.navigate("SignIn")
              }
              )
            } catch (e) {
              console.log("Error message: ", e)
              Alert.alert("Error", "Error log out.")
            }
          }

        },
        {
          text: "No",
        }
      ],
    )
  }
  const aboutus = () => {
    console.log("A")
    navigation.navigate("AboutUs")
  }
  return (


    <LinearGradient
      colors={["#27153E", "#27153E"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
      <ImageBackground source={{ uri: "https://media.discordapp.net/attachments/977411778671677471/1000027427046694942/unknown.png?width=400&height=701" }} resizeMode="cover" style={styles.container}>

        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
              <Ionicons style={styles.iconHeader} name="ios-chevron-back" size={28} color="white" onPress={() => navigation.goBack()} />
              <Text style={styles.textHeader} >Setting</Text>
            </View>
            <View style={styles.body}>
              <View style={styles.basicInfo}>
                <View style={styles.avatar}>
                  <Image
                    style={{ height: '100%', width: '100%', borderRadius: 100 }}
                    source={{ uri: user.avatar }} />
                </View>
                <View style={styles.name}>
                  <Text style={{ color: 'white', fontWeight: "bold", fontSize: 28 }}> {user.username}</Text>
                </View>
              </View>
              <View style={styles.option}>
                <View style={styles.formOption}
                  onStartShouldSetResponder={() => {
                    navigation.navigate('Profile')
                    console.log('change')
                  }}
                >
                  <AntDesign name="profile" size={28} color="white" style={{ left: distance.icon }} />

                  <Text style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: '500',
                    left: distance.icon + 30,
                  }}> Profile </Text>
                </View>
                <TouchableOpacity onPress={aboutus}>

                  <View style={styles.formOption}>
                    <FontAwesome5 name="users" size={24} color="white" style={{ left: distance.icon }} />
                    <Text style={{
                      color: 'white',
                      fontSize: 25,
                      fontWeight: '500',
                      left: distance.icon + 30,
                    }}> About Us </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={check}>
                  <View style={styles.formOption}>
                    <Feather name="tool" size={24} color="white" style={{ left: distance.icon }}
                    />
                    <Text style={{
                      color: 'white',
                      fontSize: 25,
                      fontWeight: '500',
                      left: distance.icon + 30,
                    }}> Change Password </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirm}>
                  <View style={styles.formOption}>
                    <MaterialCommunityIcons name="logout" size={24} color="white" style={{ left: distance.icon }} />
                    <Text style={{
                      color: 'white',
                      fontSize: 25,
                      fontWeight: '500',
                      left: distance.icon + 30,
                    }}> Log Out </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>

        </View>
      </ImageBackground>
    </LinearGradient>


  );
}

let distance = {
  topSB: StatusBar.currentHeight,
  header: 25,
  icon: 30
};

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 18,
    //paddingTop: StatusBar.currentHeight,

  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  textHeader: {

    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconHeader: {
    width: '42%',
    paddingLeft: 15,
  },
  body: {
    flex: 1,

  },
  basicInfo: {
    flex: 1,
    flexDirection: 'row',

    marginBottom: 10,
    marginTop: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    backgroundColor: 'red',
    borderRadius: 100,
    marginLeft: '6%'
  },
  name: {
    left: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    flex: 1,
    paddingHorizontal: 20,
    top: 10,
    marginBottom: 10,
  },
  formOption: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 29,
    backgroundColor: '#201E21',
    borderRadius: 14,
  },
  cdImage: {
    width: '20%',
    height: '150%',
    borderRadius: 100,
  },
});




export default Setting;
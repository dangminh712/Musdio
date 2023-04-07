import React, { useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Facebook from "expo-facebook";
import { auth } from "../Firebase";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { deleteUserInfo } from "../Redux/userSlider";
import { setLogginStatus } from "../Redux/facebookSlider";

export default function LoginFacebook({ navigation }) {
  // Listen for authentication state to change. 

  useEffect(() => {
    dispatch(deleteUserInfo())

  }, [])
  const dispatch = useDispatch()
  const facebookLogIn = async () => { 
    try {
      await Facebook.initializeAsync({
        appId: "545155573899991", // enter app id here
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            const credential = new FacebookAuthProvider.credential(token);
            signInWithCredential(auth, credential).catch((error) => {
              console.log(error);
            }).then(() => {
                  dispatch(setLogginStatus(true))
                  axios.post(`https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/post/${auth.currentUser.uid}`, {
                    avatar: data.picture.data.url,
                    email: data.email,
                    gender: "NC", 
                    username: data.name
                  })
                    .then(() => {
                      console.log("We are authenticated now!");
                      navigation.navigate("LoadingSongs");
                    })
                    .catch(error => {
                      console.log("Message: ", error)
                    })

              })
              .catch((e) => console.log(e));

            })
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };


  return (
    <TouchableOpacity onPress={facebookLogIn}>
      <Image
        source={require("../../assets/images/facebook.jpg")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    margin: 20,
    marginTop: 5,
  },
});

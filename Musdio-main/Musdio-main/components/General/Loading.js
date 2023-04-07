import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import axios from "axios";
import { auth } from "../Firebase/index"
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../Redux/musicSlider";
import { setUser } from "../Redux/userSlider";
import { Spinner, HStack, Heading, Center, NativeBaseProvider } from "native-base";
export default function LoadingSongs({ navigation }) {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.musics);
  const user = useSelector((state) => state.user)
  const [temp, setTemp] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      const id =  auth.currentUser.uid;
      try {
        await axios
          .get(
            `https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/${id}`
          )
          .then((response) => {
            dispatch(setUser(response.data.data)); 
          })
          .then(() => {
            navigation.navigate("Home");
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Data fetching cancel");
        } else {
          console.log(error);
        }
      }
    };
    const fetchAPI = async () => {
      try {
        await axios
          .get(
            "https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/music/get/"
          )
          .then((response) => {
            setTemp(response.data)
            dispatch(setSongs(response.data.data));
            return response.data.data
          })
          .then(() => {
            fetchUser()
            navigation.navigate('Home')
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Data fetching cancel");
        } else {
          console.log(error);
        }
      }
    };
      fetchAPI();
  }, []);

  return (

    <NativeBaseProvider backgroundColor={'#242526'}>
      <Center flex={1} px="3" backgroundColor={'#242526'}>
      <View
        style={{ justifyContent: "flex-end", height: "50%", paddingLeft: '-10%', backgroundColor: '#242526',top:'-10%' }}
      >
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingRight: '10%' }}>
          <Image
            source={{ uri: 'https://media.discordapp.net/attachments/977411778671677471/1002243690024153190/logo-removebg-preview.png', }}
            style={{ height: 250, width: 250 }}
          />
          <Text style={{ color: 'white', fontSize: 35, fontWeight: '900', marginLeft: '-15%' }}> Musdio </Text>
        </View>
        {/* <Text style={{ color: "white", fontWeight: "600", fontSize: 30,paddingTop: '2%' }}>
        Loading...
      </Text> */}
      </View>
        <HStack space={2} justifyContent="center" backgroundColor={'#242526'}>

          <Spinner accessibilityLabel="Loading posts" size={"lg"} />
          <Heading color="white" fontSize={"3xl"}>
            Loading
          </Heading>

        </HStack>
      </Center>
    </NativeBaseProvider >

  );
}

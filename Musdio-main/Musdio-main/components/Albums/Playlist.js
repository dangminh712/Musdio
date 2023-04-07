import { StyleSheet, Text, View, FlatList, TextComponent, ImageBackground, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { setSongs } from "../Redux/musicSlider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { auth } from '../Firebase';
import { deleteFavoriteSong } from '../Redux/userSlider';


function Playlist({ navigation }) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.musics)

  const [songsUsers, setsongsUsers] = useState([]);

  const user = useSelector((state) => state.user).userData;
  useEffect(() => {
    if (data.length != 0 && user.length != 0) {
      data.forEach((m) => {
        user['favoriteMusics'].forEach((n) => {
          if (n == m['id']) { 
            if (songsUsers.length === 0) {
              setsongsUsers(previous => {
                const newData = [...previous, m]
                return newData
              })
            }
          }
        });
      });
    }
  }, [data, user]);

  const renderRightView = (id) => {
    return (
      <View style={styles.swipe}>
        <TouchableOpacity
          onPress={() => {
            axios.put(`https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/delete/favoriteSong/` + auth.currentUser.uid, {
              musicId: id
            })
              .then(response => {
                setsongsUsers(oldData => {
                  const newData = oldData.filter(song => {
                    return song.id != id;
                  }); 

                  dispatch(deleteFavoriteSong(id))
                  
                  ToastAndroid.show(
                    "Removed Successfully !",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
                  return newData
                })
              })
          }
          }
        >
          <View style={styles.ButtonDelete}>
            <AntDesign name="delete" size={27} color="white" />

          </View>
        </TouchableOpacity>
      </View>
    )
  };
  const Item = ({ id, title, img, single, navigation }) => (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => renderRightView(id)}
      >
        <TouchableOpacity onPress={() => navigation.navigate("NowPlaying", {
          playID: [id]
        })}>
          <View style={styles.item}>
            <Image style={styles.cdImage} source={{ uri: img }} />
            <View style={styles.Single}>
              <Text style={styles.nameSong} numberOfLines={1}>{title}</Text>
              <Text style={styles.nameSingle} numberOfLines={1}>{single}</Text>
            </View>
            <View style={styles.iconPlay}>
              <View style={styles.iconPlay}>
                <Ionicons name="md-play-circle-sharp" size={50} color="white" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
  const renderItem = ({ item }) => <Item id={item.id} title={item.name} img={item.img} single={item.singer} navigation={navigation} />;
  return (
    <LinearGradient
      colors={["#27153E", "#27153E"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
      <ImageBackground source={{ uri: "https://media.discordapp.net/attachments/977411778671677471/1000027427046694942/unknown.png?width=400&height=701" }} resizeMode="cover" style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconHeader} onPress={() => navigation.goBack()}>
              <Ionicons name="ios-chevron-back" size={28} color="white" fontWeight='bold' />
            </TouchableOpacity>
            <Text style={styles.textHeader} >My Playlist</Text>
          </View>
          <View style={styles.Bottom}>
            <FlatList data={songsUsers} renderItem={renderItem} keyExtractor={item => item.id} />
          </View>
          <View style={styles.ToolBar}>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}



const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 18,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  iconHeader: {
    paddingLeft: 22,

    width: '40%'
  },
  textHeader: {

    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    width: '100%'
  },
  Bottom: {

    flex: 14,
    // backgroundColor: 'pink',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5

  },
  Bar: {
    paddingTop: 2,
    backgroundColor: 'white',
  },
  Song: {
    flexDirection: 'row',
    marginTop: '5%',
    width: '80%',
    height: '10%',
    borderRadius: 32,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',

  },
  avatarmini: {
    width: '20%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: 'blue',
    marginLeft: '-43%',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: '#201E21',
    borderRadius: 20,
    padding: 27,
    marginVertical: 7,
    marginHorizontal: 10,
    alignItems: 'center',
    height: '80%',
    width: '100%'
  },
  nameSong: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  nameSingle: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: '#928989',
    fontSize: 15,
    opacity: 100,
    flex: 1,
  },
  cdImage: {
    width: '23%',
    height: '150%',
    borderRadius: 10,
  },
  Single: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '3%',
    width: '100%',
  },
  iconPlay: {
    flex: 1,
    paddingLeft: '15%',
  },
  swipe: {
    margin: 0,
    alignContent: 'center',
    justifyContent: 'center',
    width: 90,
  },
  ButtonDelete: {
    top: '15%',
    left: '28%',
    width: '80%',
    height: '70%',
    backgroundColor: 'red',
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  TextDelete: {
    fontSize: 17,
    color: 'white'
  },
});

export default Playlist;
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { StatusBar, ScrollView, Image, TouchableOpacity } from "react-native";
import Footer from "./Footer";

function HomeScreen({ navigation }) {
  const musicplayed = useSelector(state => state.musics)
  let user = useSelector((state) => state.user);
  user = user.userData
  const song = musicplayed.slice(0, 5)
  const AlbumsSinger = []
  const [singerAlbum, setSingerAlbum] = useState([])
  const [categoryAlbum, setCategoryAlbum] = useState([])
  // const singerAlbum = []
  let singer = {}
  let category = {}
  musicplayed.map((song) => {
    // console.log(song)
    let temp = song.singer
    if (singer[temp] === undefined) {
      singer[temp] = [song]
    }
    else singer[temp].push(song)
    temp = song.category
    if (category[temp] === undefined) {
      category[temp] = [song]
    }
    else category[temp].push(song)
  })

  // singerAlbum.push(singer)
  // console.log("singer", singerAlbum)

  useEffect(() => {
    (() => {
      if (singer != undefined) {
        setSingerAlbum((e) => {
          const newState = Object.keys(singer).map((id) => singer[id])
          return newState
        })
      }
      if (category != undefined) {
        setCategoryAlbum((e) => {
          const newState = Object.keys(category).map((id) => category[id])
          return newState
        })
      }
    })()
  }, [])

  return (
    <>
      <LinearGradient
        colors={["#171518", "#171518"]}
        end={[0.05, 0.5]}
        style={styles.LinearGradient}
      >
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
              <Text style={styles.textHeader}>Home</Text>
            </View>
            <View
              style={{ borderBottomColor: "white", borderBottomWidth: 1.75 }}
            />
            <View style={styles.body}>
              <View style={styles.option}>
                <View style={styles.formOption}>
                  <Text style={styles.textForm}>Recommend</Text>
                  <ScrollView style={styles.scrollHorizontal} horizontal={true}>
                    {song.map((music, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => navigation.navigate("NowPlaying", {
                            playID: [music.id],
                          })}
                          key={index}
                        >
                          <View>
                            <Image style={styles.img} source={{ uri: music.img }} />
                            <Text style={styles.textDivForm}>{music.name}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                <View style={styles.formOption}>
                  <Text style={styles.textForm}>Singer</Text>
                  <ScrollView style={styles.scrollHorizontal} horizontal={true}>
                    {
                      singerAlbum.length != 0 &&
                      singerAlbum.map((value, index) => {
                        let nameSinger = value[0].singer
                        return (
                          <TouchableOpacity
                            onPress={() => navigation.navigate("Albums", {
                              nameAlbum: nameSinger,
                              Data: value
                            })}
                            key={index}
                          >
                            <View>
                              <Image style={styles.img} source={{ uri: value[0].img }} />
                              <Text style={styles.textDivForm}>{nameSinger}</Text>
                            </View>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </ScrollView>
                </View>
                <View style={styles.formOption}>
                  <Text style={styles.textForm}>Category</Text>
                  <ScrollView style={styles.scrollHorizontal} horizontal={true}>
                  {
                      categoryAlbum.length != 0 &&
                      categoryAlbum.map((value, index) => {
                        let nameCategory = value[0].category
                        return (
                          <TouchableOpacity
                            onPress={() => navigation.navigate("Albums", {
                              nameAlbum: nameCategory,
                              Data: value
                            })}
                            key={index}
                          >
                            <View>
                              <Image style={styles.img} source={{ uri: value[0].img }} />
                              <Text style={styles.textDivForm}>{nameCategory}</Text>
                            </View>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </ScrollView>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <Footer style={{ flex: 90 }} navigation={navigation} sect={0} />
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
  },
  container: {
    flex: 10,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  body: {
    flex: 1,
  },
  option: {
    flex: 1,
  },
  textForm: {
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: '5%'
  },
  scrollHorizontal: {
    flexDirection: "row",
  },
  img: {
    width: 100,
    height: 100,
    marginLeft: 14,
    marginRight: 20,
  },
  textDivForm: {
    color: "white",
    marginLeft: 14,
    width: 100,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  formOption: {
    flex: 1,
    backgroundColor: "yellow",
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#201E21",
  },
});
export default HomeScreen;

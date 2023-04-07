import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Easing,
  ScrollView,
  ToastAndroid,
} from "react-native";
import {
  Actionsheet,
  useDisclose,
  Center,
  NativeBaseProvider,
} from "native-base"; 
import axios from 'axios'
import Slider from "react-native-slider";
import { useEffect, useState, useRef, useMemo } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { auth } from "../Firebase";
import { addFavoriteSong } from "../Redux/userSlider";

const AnimatedSlider = Animated.createAnimatedComponent(Slider);

function NowPlaying({ navigation, route }) {
  const { playID } = route.params;
  const { isOpen, onOpen, onClose } = useDisclose(); 

  const userData = useSelector((state) => state.user)
 
  const dispatch = useDispatch()

  const source_songs = useSelector((state) => state.musics);
  const [activeRandomBtn, setActiveRandomBtn] = useState(false);
  const [activeRepeatBtn, setActiveRepeatBtn] = useState(false);
  const [openOptionsMenu, setOpenOptionsMenu] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const songs = useRef(
    (() => {
      const listSongs = [];
      for (let value of playID) {
        const song = source_songs.find((obj) => obj.id == value);
        if (song) {
          listSongs.push(song);
        }
      }
      return listSongs;
    })()
  ).current;

  const [currentSong, setCurrentSong] = useState(songs[currentIndex]);
  const [randomNumber, setRandomNumber] = useState();
  const [volume, setVolume] = useState(1) 

  const [addFavoriteList, setAddFavoriteList] = useState(false)

  const { theme } = useSelector((state) => state.general);
  const [checkTimer, setCheckTimer] = useState(0);
  const sound = useRef(new Audio.Sound()).current;


  const handleRepeatSong = async () => {
    if (!activeRepeatBtn) {
      setActiveRepeatBtn(true);
      sound.setIsLoopingAsync(true);
    } else {
      setActiveRepeatBtn(false);
      sound.setIsLoopingAsync(fals);
    }
  };
  const handleOpenSleepTimer = () => {
    setOpenOptionsMenu(false)
    onOpen()
  };


  useEffect(() => {
    if (activeRandomBtn) {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * songs.length);
      } while (randomNumber === currentIndex);
      setRandomNumber(randomNumber);
    }
  }, [activeRandomBtn]);

  const handleNextSong = async() => { 
    try {
      if (songs.length > 1) {
        if (!activeRandomBtn) {
          if (currentIndex >= songs.length - 1) {
            setCurrentIndex(() => {
              setCurrentSong(songs[0]); 
              return 0;
            });
          } else {
            setCurrentIndex((prevIndex) => {
              setCurrentSong(songs[prevIndex + 1]);
              return prevIndex + 1;
            });
          }
        } else {
          setCurrentIndex(() => {
            setCurrentSong(songs[randomNumber]);
            return randomNumber;
          });
        }  
        await sound.unloadAsync()
      } 

    } catch(error) {

    }
  };


  const handlePrevSong = async() => {
    try {
      if (songs.length > 1) {
        if (!activeRandomBtn) {
          if (currentIndex - 1 < 0) {
            setCurrentIndex(() => {
              setCurrentSong(songs[songs.length - 1]); 
              return songs.length - 1;
            });
          } else {
            setCurrentIndex((prevIndex) => {
              setCurrentSong(songs[prevIndex - 1]);
              return prevIndex - 1;
            });
          }
        } else {
          setCurrentIndex(() => {
            setCurrentSong(songs[randomNumber]);
            return randomNumber;
          });
        }
        await sound.unloadAsync();
      }
    } catch (error) {

    }
    
  };

  useEffect(() => {
    try {
      (async () => {
        const response = await sound.getStatusAsync()
        sliderValueHolder?.setValue(0)
        sliderValueHolder?.setOffset(0)
        try { 
          if (!response.isLoaded) { 
            await sound.loadAsync({ uri: currentSong.uri });
          }
    
          if (playing) {
            playSong() 
            playSliderAnimated()
          }  else {
            pauseSliderAnimated()
          }
        } catch(error) {
          console.log("Error: ", error)
        }
      })();
    } catch(err) {

    }
    
  }, [currentIndex]);

  const handleDraggingSlider = async (value) => {
    const response = await sound.getStatusAsync();
    try {
      sound.setPositionAsync(value * response.durationMillis);
      sliderValueHolder.setOffset(value)
      sliderValueHolder.flattenOffset()
      playSliderAnimated()
    } catch(err) {
      console.log("Error: ", err)
    }

  };


  const playSong = async () => {
    const response = await sound.getStatusAsync();

    try {
      if (response.isLoaded) {
        sound.playAsync();
      } else {
        sound.loadAsync({ uri: currentSong.uri }).then(() => {
          sound.playAsync();
        });
      } 
    } catch(error) {
      
    }
  };

  const pauseSong = async () => {
    const response = await sound.getStatusAsync();

    try {
      if (response.isLoaded) {
        if (response.isPlaying === true) {
          sound.pauseAsync();
        }
      }
    } catch(error) {

    }

  };


  const playSound = () => {
    if (!playing) { 
      setPlaying(true);
      playSong(); 
    } else {
      setPlaying(false);
      pauseSong();
    }
  };

  const playSliderAnimated = async() => { 
    sound?.getStatusAsync()
    .then(({durationMillis}) => {
      Animated.timing(sliderValueHolder, {
        toValue: 1,
        duration: durationMillis,
        useNativeDriver: false,
      }).start(({finished}) => finished && (() => { 
        handleNextSong()
      })())
    })

  } 

  const pauseSliderAnimated = () => { 
    if (sliderValueHolder) {
      sliderValueHolder?.stopAnimation(() => {
        sliderValueHolder?.extractOffset();
      })
    }
  }

  useEffect(() => { 
    return () => sound.unloadAsync()
  }, [])


  const stopWhenBack = async () => {
    const response = await sound.getStatusAsync();
    if (playing) {
      setPlaying(false);
    }
    if (response.isLoaded) {
        await sound.unloadAsync();
        sliderValueHolder.setValue(0);
        navigation.navigate("Home");
    }
  };

  let rotateValueHolder = useRef(new Animated.Value(0)).current;

  let sliderValueHolder = useRef(new Animated.Value(0)).current;

  const rotateData = useRef(
    rotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    })
  ).current; 

  useEffect(() => {
    try {
      if (playing) {
        Animated.loop(
          Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
            easing: Easing.linear,
            isInteraction: false,
          })
        ).start(); 
        playSliderAnimated()
      } else {
        rotateValueHolder.stopAnimation(() => {
          rotateValueHolder.extractOffset();
        });
        pauseSliderAnimated()
      }
    } catch(err) {
      console.log("Error useEffect(playing): ", err)
      console.log("Setting CD animated...")
    }
  },  [playing])  

  const handleAdjustVolume = (value) => {
    if (sound != null) {
      setVolume(value)
      sound.setVolumeAsync(value);
    }
  };
  const handleSetSuccessTime = async (timer) => {
    onClose();
    ToastAndroid.show(
      "The set was successful.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    clearTimeout(checkTimer);
    setCheckTimer(
      setTimeout(() => {
        ToastAndroid.show(
          "Song has been stopped",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setPlaying(false);
        pauseSong()
      }, timer)
    );
  };
  const handleTurnOff = () => {
    ToastAndroid.show(
      "Turn off was successful.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    clearTimeout(checkTimer);
    onClose();
  };

  const handleOpenOptionsMenu = () => {
    setOpenOptionsMenu((prevState) => !prevState)
  };

  const handleLyric = () => {
    var a = currentSong.lyric;
    let newString = "";
    let pre_index = 0;
    for (var i = 0; i < a.length; i++) {
      if (a[i] == a[i].toUpperCase() && i != 0 && a[i] >= "A" && a[i] <= "Z") {
        var temp = a.slice(pre_index, i);
        newString = newString + temp + "\n";
        pre_index = i;
      }
      if (i == a.length - 1) {
        var temp = a.slice(pre_index, a.length);
        newString = newString + temp + "\n";
      }
    }
    return newString;
  };

  useEffect(() => {
    const favoriteMusics = userData.userData.favoriteMusics
    favoriteMusics.forEach((songId) => {
      if (songId == currentSong.id) { 
        setAddFavoriteList(true)  
        return 
      }
    })   
  }, [])

  const handleAddFavoriteList = () => { 
    if (addFavoriteList === false) {
      const userId = auth.currentUser.uid 
      const updateUrl = "https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/add/favoriteSong/" + userId 
      axios.put(updateUrl, {
        "musicId": currentSong.id 
      })
        .then(() => {
          dispatch(addFavoriteSong(currentSong.id))
          setAddFavoriteList(true)
        })
        .then(() => {
          ToastAndroid.show(
            "Add song into favorite list successfully",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        })
        .catch(error => {
          console.log("Error message: ", error)
        })

    }
  }
  



  return (
    <LinearGradient
      colors={
        theme === "dark" ? ["#27153E", "#27153E"] : ["#f5f6fd", "#f5f6fd"]
      }
      style={styles.LinearGradient}
    >
      <ImageBackground
        source={{
          uri: "https://media.discordapp.net/attachments/977411778671677471/1000027427046694942/unknown.png?width=400&height=701",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.pageStatusBar}>
          <TouchableOpacity style={styles.iconHeader} onPress={stopWhenBack}>
            <Ionicons
              name="ios-chevron-back"
              size={28}
              color="white"
              style={theme === "light" && styles.blackColor}
            />
          </TouchableOpacity>
          <Text
            style={[styles.pageName, theme === "dark" && styles.whiteColor]}
          >
            Playing Now
          </Text>
          <TouchableOpacity  >
            <Entypo
              name="dots-three-vertical"
              size={28}
              onPress={handleOpenOptionsMenu}
              style={[styles.options, theme === "light" && styles.blackColor]}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text
            style={[styles.playlistText, theme === "dark" && styles.whiteColor]}
          ></Text>

          <Animated.Image
            style={[styles.cdImage, { transform: [{ rotate: rotateData }] }]}
            source={{ uri: currentSong.img }}
          />
          <AnimatedSlider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={sliderValueHolder}
            minimumTrackTintColor="#6C42A2"
            maximumTrackTintColor={theme === "dark" ? "#fff" : "#000"}
            thumbTintColor={theme === "dark" ? "#fff" : "#000"}
            onSlidingStart={() => pauseSliderAnimated()}
            onSlidingComplete={handleDraggingSlider} 
          />
          <Text
            style={[styles.songName, theme === "dark" && styles.whiteColor]}
          >
            {currentSong.name}
          </Text>
          <Text
            style={[styles.artistName, theme === "dark" && styles.whiteColor]}
          >
            {currentSong.singer}
          </Text>
          <ScrollView style={styles.lyricsBox}>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  flexWrap: "wrap",
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  opacity: 0.5
                }}
              >
                {handleLyric()}
              </Text>
            </View>
          </ScrollView>
          <View style={styles.musicControl}>
            <TouchableOpacity
              style={styles.random}
              onPress={() => setActiveRandomBtn(!activeRandomBtn)}
            >
              <FontAwesome
                name="random"
                size={20}
                color={
                  activeRandomBtn
                    ? "#1db954"
                    : theme === "dark"
                    ? "#fff"
                    : "#000"
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stepbackward}
              onPress={handlePrevSong}
            >
              <FontAwesome
                name="step-backward"
                size={24}
                color={theme === "dark" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playBtn} onPress={playSound}>
              {playing ? (
                <FontAwesome
                  name="pause-circle"
                  size={80}
                  style={styles.playIcon}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              ) : (
                <FontAwesome
                  name="play-circle"
                  size={80}
                  style={styles.playIcon}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stepforward}
              onPress={handleNextSong}
            >
              <FontAwesome
                name="step-forward"
                size={24}
                color={theme === "dark" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.repeat} onPress={handleRepeatSong}>
              <Feather
                name="repeat"
                size={20}
                color={
                  activeRepeatBtn
                    ? "#1db954"
                    : theme === "dark"
                    ? "#fff"
                    : "#000"
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.optionsMenu, openOptionsMenu && styles.openMenu]}>
          <TouchableOpacity style={styles.optionsItem} onPress={handleAddFavoriteList}>
            <View style={styles.optionsItemContent}>
              <AntDesign
                name="heart"
                size={24}
                color={!addFavoriteList ? "white" : "red"} 
                style={styles.optionsItemIcon}
              />
              <Text style={[styles.optionsItemText, addFavoriteList && styles.color_red]}>Add into favorite list</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionsItem}
            onPress={() => handleOpenSleepTimer()}
          >
            <View style={styles.optionsItemContent}>
              <AntDesign
                name="clockcircleo"
                size={24}
                color="white"
                style={styles.optionsItemIcon}
              />
              <Text
                style={styles.optionsItemText}
                onPress={() => handleOpenSleepTimer()}
              >
                Set sleep timer
              </Text>
              <NativeBaseProvider>
                <Center style={styles.layoutSleepTimer}>
                  <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content backgroundColor="#3d3d5c">
                      <Actionsheet.Item
                        backgroundColor="#3d3d5c"
                        onPress={() => {
                          handleSetSuccessTime(15 * 1000);
                        }}
                        _text={{
                          color: "white",
                        }}
                      >
                        15 seconds
                      </Actionsheet.Item>
                      <Actionsheet.Item
                        backgroundColor="#3d3d5c"
                        onPress={() => handleSetSuccessTime(30 * 60 * 1000)}
                        _text={{
                          color: "white",
                        }}
                      >
                        30 minutes
                      </Actionsheet.Item>
                      <Actionsheet.Item
                        backgroundColor="#3d3d5c"
                        onPress={() => handleSetSuccessTime(45 * 60 * 1000)}
                        _text={{
                          color: "white",
                        }}
                      >
                        45 minutes
                      </Actionsheet.Item>
                      <Actionsheet.Item
                        backgroundColor="#3d3d5c"
                        onPress={() => handleSetSuccessTime(60 * 60 * 1000)}
                        _text={{
                          color: "white",
                        }}
                      >
                        1 hour
                      </Actionsheet.Item>
                      <Actionsheet.Item
                        backgroundColor="#3d3d5c"
                        onPress={() => handleTurnOff()}
                        _text={{
                          color: "white",
                        }}
                      >
                        Cancel
                      </Actionsheet.Item>
                    </Actionsheet.Content>
                  </Actionsheet>
                </Center>
              </NativeBaseProvider>
            </View>
          </TouchableOpacity>
          <View style={styles.optionsItem}>
            <View style={styles.optionsItemContent}>
              <Text style={styles.optionsItemText}>Setting volume</Text>
            </View>
            <View style={styles.optionsVolumeBox}>
              <Feather
                name="volume"
                size={24}
                color="white"
                style={styles.optionsItemIcon}
              />
              <Slider
                style={styles.optionsVolumeSlider}
                minimumValue={0}
                maximumValue={1}
                value={volume}
                onSlidingComplete={handleAdjustVolume}
                minimumTrackTintColor="rgb("
                maximumTrackTintColor={theme === "dark" ? "#fff" : "#000"}
                thumbTintColor={theme === "dark" ? "#fff" : "#000"}
              />

              <Feather
                name="volume-2"
                size={24}
                color="white"
                style={styles.optionsItemIcon}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

export default memo(NowPlaying);

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  blackColor: {
    color: "#000",
  },
  whiteColor: {
    color: "#fff",
  },
  pageStatusBar: {
    color: "#fff",
    flexDirection: "row",
    padding: 5,
    width: "100%",
    alignItems: "center",
    borderColor: "#000",
  },
  iconHeader: {
    position: "absolute",
    left: "5%",
    top: "5%",
    color: "#FFFFFF",
    zIndex: 99,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  playlistText: {
    opacity: 0.8,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  artistName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    opacity: 0.8,
    color: "#796e87",
  },
  cdImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 20,
  },
  slider: {
    width: "80%",
    height: 60,
    marginTop: 10,
    marginBottom: 10,
  },
  songName: {
    fontSize: 23,
    fontWeight: "bold",
  },
  lyricsBox: {
    width: "100%",
    flex: 1,

    marginTop: 40,
    marginBottom: 40,
  },
  lyricText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
  },
  musicControl: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    opacity: 0.8,
  },
  playIcon: {
    opacity: 1,
  },
  stepbackward: {
    marginRight: 30,
  },
  stepforward: {
    marginLeft: 30,
  },
  repeat: {
    marginLeft: 40,
  },
  random: {
    marginRight: 40,
  },
  options: {
    position: "absolute",
    right: -20,
    top: "-200%",
    fontSize: 20,
    padding: 40, 
  },

  optionsMenu: {
    position: "absolute",
    top: "10%",
    right: -300,
    height: "100%",
    backgroundColor: "#000",
    width: 300,
    opacity: 1,
  },
  openMenu: {
    right: 0,
  },

  optionsItem: {
    padding: 20,
    flexDirection: "column",
    backgroundColor: "#121212",
    marginBottom: 20,
    marginTop: 20,
    position: "relative", 
  },
  optionsItemText: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 20,
  },
  optionsItemContent: {
    flexDirection: "row",
  },
  optionsVolumeBox: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  optionsVolumeSlider: {
    flex: 1,
    marginRight: 10,
    height: 2,
  },
  radioButtons: {
    color: "red",
    backgroundColor: "#fff",
  },
  layoutSleepTimer: {}, 

  color_red: {
    color: "red"
  }


});

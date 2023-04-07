import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from 'react';
import { setSongs } from "../Redux/musicSlider";
import { useDispatch, useSelector } from "react-redux";


const Item = ({ id, title, img, singer, index, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("NowPlaying",{
    playID : [id]
  })}>
  <View style={styles.item}>
    <Text style={styles.index}> #{index} </Text>
    <Image style={styles.cdImage} source={{ uri: img }} />
    <View style={styles.Single}>
      <Text style={styles.nameSong} numberOfLines={1}>{title}</Text>
      <Text style={styles.nameSingle} numberOfLines={1}>{singer}</Text>
    </View>
    <View style={styles.iconPlay}>
      
        <Ionicons name="md-play-circle-sharp" size={50} color="white" />
    </View>
  </View>
  </TouchableOpacity>
);

function TopTrending({navigation}) {
  const dispatch = useDispatch();
  const renderItem = ({ item, index }) => {
    return (<Item id = {item.id} title={item.name} img={item.img} singer={item.singer} index={index + 1}  navigation = {navigation}/>)
  };
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getMusics = async () => {
    try {
      const response = await fetch('https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/music/get');
      const json = await response.json().then(data => {
        let dataToSort = data.data;
        dataToSort.sort((a, b) => Number(b.view) - Number(a.view));
        dataToSort = dataToSort.slice(0,10)
        setData(dataToSort);
      })
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if(data.length == 0){
      getMusics();
    }
  }, []);
  return (
    <LinearGradient
      colors={["#27153E", "#27153E"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
    <ImageBackground source={{uri: "https://media.discordapp.net/attachments/977411778671677471/1000027427046694942/unknown.png?width=400&height=701"}} resizeMode="cover" style={styles.container}>

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconHeader} onPress= {() => navigation.goBack()}>
            <Ionicons name="ios-chevron-back" size={28} color="white" fontWeight='bold' />
          </TouchableOpacity>
          <Text style={styles.textHeader} >Top Treding</Text>
        </View>
        <View style={styles.Bottom}>
 
          <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id} />
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
    width: '40%',
    
    paddingLeft: '3.5%'
  },
  textHeader: {
    
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    width: '100%',
    right: '20%'
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
    borderRadius: 2,
    padding: 27,
    marginVertical: 25,
    marginHorizontal: 10,
    alignItems: 'center',
    height: '80%',
  },
  nameSong: {
    paddingLeft: '2%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  index: {
    paddingLeft: '-10%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    opacity: 20,
    paddingRight: '3%'
  },
  nameSingle: {
    paddingLeft: '2%',
    fontWeight: 'bold',
    color: '#928989',
    fontSize: 15,
    opacity: 100,
  },
  cdImage: {
    width: '30%',
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
    paddingLeft: 5,
    right: '-10%'
  },
  
});

export default TopTrending;
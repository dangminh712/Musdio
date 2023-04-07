import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { SafeAreaView, StatusBar, Platform, ScrollView, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { color } from 'react-native-elements/dist/helpers';

function Albums({navigation,route}) {
   const {nameAlbum,Data}=route.params

  const renderItem = ({ item }) =>  <Item id ={item.id} name={item.name}  img = {item.img} singer = {item.singer} navigation={navigation} />
  const Item = ({id,name, img, singer}) => (
    <TouchableOpacity onPress={() => navigation.navigate("NowPlaying", {
      playID: [id]
    })}>
      <View style={styles.item}>
        <Image style={styles.cdImage} source={{uri: img}}/>
        <View style = {styles.singer}>
          <Text style={styles.nameSong} numberOfLines= {1}>{name}</Text>
          <Text style={styles.namesinger} numberOfLines= {1}>{singer}</Text>
        </View>
        <View style = {styles.iconPlay}>
          <View style={styles.iconPlay}>
            <Ionicons name="md-play-circle-sharp" size={50} color="white" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <LinearGradient
      colors={["#27153E", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
    <ImageBackground source={{uri: "https://media.discordapp.net/attachments/977411778671677471/1000027427046694942/unknown.png?width=400&height=701"}} resizeMode="cover" style={styles.container}>
        <View style={styles.header}>
       <TouchableOpacity style={styles.iconHeader} onPress = {() => navigation.navigate("Home")}>
              <Ionicons name= "ios-chevron-back" size={28} color="white" fontWeight = 'bold' />
         </TouchableOpacity>
              <Text style={styles.textHeader} >Albums</Text>
        </View>
    
        <View style={styles.Bottom}>
         
          <View style={styles.Mid}> 
          <View style={{marginTop:5}}></View>
            <Image style={styles.imageAlbums} source={{uri: Data[0].img}}></Image>
          </View>
          <View style={styles.Mid}>
            <Text style={styles.nameAlbums}> {nameAlbum.toUpperCase()} </Text>
            <TouchableOpacity onPress={() => navigation.navigate("NowPlaying", {
          playID: Data.map((_id)=>{
          return _id.id
          })
        })}>
              <View style={styles.playAlbums}>
                <Text style={styles.textPlay}>
                  Play
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={{marginTop:20}}></View>
          <FlatList data={Data} renderItem={renderItem} keyExtractor={item => item.id} />
          
        </View> 
        {/* <View style={styles.imageAlbums}></View> */}
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
    paddingTop: StatusBar.currentHeight,
  },
  header:{
    flex: 7,
    flexDirection : 'row',
  },
  iconHeader:{
    width: '40%',
    paddingTop: '4%',
    marginLeft: '5%'
  },
  textHeader:{
    paddingTop: '4%',
    
    color: 'white',
    fontWeight:'bold',
    fontSize : 20,
    width : '100%'
  },
  Footer:{
    flex: 5,
  },
  Bottom:{
    flex: 93,
   // backgroundColor: 'pink',
    borderBottomColor: 'white', 
    borderBottomWidth:  0.5,
    paddingTop: '3%'
  },
  Bar:{
    paddingTop: 2, 
    backgroundColor: 'white',
  },
  Song:{
    flexDirection: 'row',
    marginTop: '5%',
    width: '80%',
    height: '10%',
    borderRadius: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems :'center',
    marginLeft: '10%',

  },
  avatarmini:{
    width : '20%',
    height : '100%',
    //borderRadius : 100, 
    backgroundColor: 'blue',
    marginLeft : '-43%',
  },
  Mid:{
    alignItems:'center',
    justifyContent: 'center',
  },
  nameAlbums:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
  
  },
  playAlbums:{
    marginTop:'3%',
    backgroundColor:'#5300BC',
    borderRadius:15,
    width:150,
    height:50,
    //alignContent:'center',
    alignItems:'center',
   // justifyContent: 'center',
  },
  textPlay:{
   //size:30,
    fontSize:25,
    fontWeight:'bold',
    marginTop:'3%',
    color:'white',
  },
  imageAlbums:{
    marginTop:'0%',
    width:'100%',
    height:200,
    borderRadius:10,
  },
  item: {
    flex : 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    borderRadius : 10,
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 10,
    alignItems: 'center',
    height : '80%',
    width:'100%',
  },
  nameSong: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    flex : 1,
  },
  namesinger: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: '#928989',
    fontSize: 15,
    opacity : 100,
    flex : 1,
  },
  cdImage: {
    width: '15%',
    height: '100%',
    borderRadius: 100,
  },
  singer:{
    flex : 1,
    flexDirection : 'column',
    paddingLeft : '3%',
    width : '100%',
  },
  iconPlay:{
   
    paddingLeft : '15%',
    
  },
});

export default Albums;
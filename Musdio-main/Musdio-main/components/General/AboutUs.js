
import React, { useState, useRef } from 'react'
import { SafeAreaView, View, Image,ScrollView, Text, Dimensions, TouchableOpacity, Animated, StyleSheet, ToastAndroid, ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

const AboutUs = ({navigation}) => {

  return (
    <LinearGradient
      colors={["#27153E", "#27153E"]
      }
      style={styles.LinearGradient}
    >
      <ImageBackground source={{ uri: "https://media.discordapp.net/attachments/977411778671677471/1000027427046694942/unknown.png?width=400&height=701" }} resizeMode="cover" style={styles.image}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ paddingTop: 40,paddingLeft:20 }} onPress={() => navigation.goBack()}>
              <Ionicons name="ios-chevron-back" size={28} color="white" fontWeight='bold' />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: '12%', paddingBottom: '5%', paddingLeft: '5%' }}>
               About Us
              </Text>
            </View>
          </View>
          <View style={styles.display}>
            <TouchableOpacity>
              <View style={styles.butom}>
                <Image style={styles.CDImage} source={{uri: 'https://cdn.discordapp.com/attachments/977411778671677471/1002269147343884398/unknown.png'}} />
              </View>
              <Text style={{paddingLeft:25,fontSize:18,color:'white',fontWeight:'600'}}> Trần Tuấn Minh </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.butom}>
              <Image style={styles.CDImage} source={{uri: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/290965560_4886898538082951_5836641614305850718_n.png?_nc_cat=106&ccb=1-7&_nc_sid=aee45a&_nc_ohc=CWzwSxk-zZYAX8exjNV&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJKOYLFPmurv_QboBB_XZTsCnDyMjQfO6c0gGZQCD-gXg&oe=63040451'}} />
              </View>
              <Text style={{paddingLeft:25,fontSize:18,color:'white',fontWeight:'600'}}> Nguyễn Đăng Minh </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.butom}>
              <Image style={styles.CDImage} source={{uri: 'https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.15752-9/294889061_417514530352329_1718781898845123060_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Vy94xle6vTAAX_v5bcu&_nc_ht=scontent.fsgn5-2.fna&oh=03_AVK0exCOW_bgDtwxoiJlhgspTPcjoUe3kINijNsgdRtpSQ&oe=63063145'}} />
              </View>
              <Text style={{paddingLeft:25,fontSize:18,color:'white',fontWeight:'600'}}> Nguyễn Phát Thịnh</Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
              <View style={styles.butom}>
              <Image style={styles.CDImage} source={{uri: 'https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/289873096_724234605676315_7238915175904753965_n.png?stp=cp0_dst-png&_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=_ShadFODFxgAX_TJMiY&tn=3T8UXKUZPmicUvrP&_nc_ht=scontent.fsgn5-13.fna&oh=03_AVJv284AXrf2bbs06HB9bATVFZ38dJ7STOhuJH-VYBoHqA&oe=6303FCB4'}} />
              </View>
              <Text style={{paddingLeft:20,fontSize:18,color:'white',fontWeight:'600'}}> Nguyễn Sanh Tài </Text>
            </TouchableOpacity>
            
           
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30, alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: '-8%',
    width: '80%', height: '30%',marginTop:40,
  },
  butom: {
    height:130,
    width:130,
    margin:30,
    borderRadius:30,
  },
  display:{
    display:'flex',
    flexDirection :"row",
    flexWrap:'wrap',
    justifyContent:"space-between",

  },
  CDImage:{
    height:130,
    width:130,
    borderRadius:30,
  },
  LinearGradient: {
    width: "100%",
    height: '100%',
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: '100%',
    justifyContent: "flex-start",
  },

});
export default AboutUs
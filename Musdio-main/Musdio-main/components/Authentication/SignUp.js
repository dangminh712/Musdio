import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
  StatusBar
} from "react-native";
import Checkbox from 'expo-checkbox';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { auth } from "../Firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from "expo-document-picker";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase";
export const FormInput = ({ navigation, route }) => {
  const { email } = route.params
  const [username, setUsername] = useState(email)
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [img, setImg] = useState('https://firebasestorage.googleapis.com/v0/b/musdio-6ec90.appspot.com/o/User%2FDefaultAvata%2Flisten.png?alt=media&token=320cbedc-9446-4419-a02b-da030add5a3b');
  const [male, setMale] = useState(true)
  const [female, setFemale] = useState(false)
  const [dataImg, setDataImg] = useState([])
  const [avatarUrl, setAvatarUrl] = useState('https://firebasestorage.googleapis.com/v0/b/musdio-6ec90.appspot.com/o/User%2FDefaultAvata%2Flisten.png?alt=media&token=320cbedc-9446-4419-a02b-da030add5a3b')
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*'
    });
    return result
  };

  const onChange = (event, selectedDate, show) => {
    console.log(event)
    console.log(selectedDate)
    console.log(show)
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleSubmit = async () => {
    console.log(email)
    const userId = auth.currentUser.uid;
    console.log(userId);
    if (dataImg.length != 0) {
      dataImg.name = `${userId}.jpg`
      console.log(dataImg.uri)
      const response = await fetch(dataImg.uri)
      const blob = await response.blob();
      const storageRef = ref(storage, `User/Avatar/${dataImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case 'paused':
              break;
            case 'running':
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setAvatarUrl(downloadURL)
              console.log(downloadURL)
              let USER = {
                "username": username,
                "email": email,
                "avatar": downloadURL,
                "birthdate": date.toLocaleDateString(),
                "gender": male == true ? "Male" : "Female",
              }
              console.log(USER)
              let url = "https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/post/" + userId
              console.log(url)
              fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(USER),
              })
                .then((res) => res.json())
                .then((result) => console.log("done"))
                .then(() => {
                  navigation.navigate('LoadingSongs')
                })
                .catch((err) => console.log(err))
            })

        }

      );
    }
    else{
      let USER = {
        "username": username,
        "email": email,
        "avatar": avatarUrl,
        "birthdate": date.toLocaleDateString(),
        "gender": male == true ? "Male" : "Female",
      }
      console.log(USER)
      let url = "https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/post/" + userId
      console.log(url)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(USER),
      })
        .then((res) => res.json())
        .then((result) => console.log("done"))
        .then(() => {
          navigation.navigate('LoadingSongs')
        })
        .catch((err) => console.log(err))
    }

  }

  return (
    <LinearGradient style={styles.container} colors={["#242526", "#242526"]}>
      <View style={[styles.box, { top: StatusBar.currentHeight }]}>
        <View style={{ flexDirection: 'row', backgroundColor: '#242526', height: '5%' }}>
          <Text style={[styles.textHeader, { marginLeft: '30%', fontWeight: 'bold' }]}>Personal Info</Text>
        </View>
        <View style={[styles.boxInput, { top: '0%', backgroundColor: '#242526' }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>

            <TouchableOpacity onPress={() => {
              pickDocument()
                .then((data) => {
                  setDataImg(data)
                  setImg(data.uri)
                })
            }} >

              <Image style={{ height: 150, width: 150, borderRadius: 100, marginTop: 10 }} source={{ uri: img }} />
            </TouchableOpacity>
            <Text style={{ paddingTop: 20, color: 'white', fontSize: 21 }}>Tap to change your avata</Text>
          </View>

          <View style={{ marginTop: '4%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <Text style={{ width: '80%', color: 'white' }} >Enter your username</Text>
              <TextInput
                placeholder="Enter username..."
                placeholderTextColor="white"
                style={[styles.input]}
                onChangeText={(value) => setUsername(value)}
              />
            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <Text style={{ width: '80%', color: 'white' }}>Choose your birthdate</Text>
              <View style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <Text style={{ color: 'white' }}>
                  {
                    date.toLocaleDateString()
                  }
                </Text>
                <AntDesign name="calendar" size={24} color="white" style={{}} onPress={showDatepicker} />
              </View>
              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  display={"spinner"}
                  onChange={(event, value) => {
                    console.log(event, value)
                    onChange(event, value, show)
                  }}
                />
              )}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Checkbox value={male} onValueChange={() => {
                setMale(!male)
                setFemale(false)
              }} />
              <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 30, color: 'white' }}>Male</Text>
              <Checkbox value={female} onValueChange={() => {
                setMale(false)
                setFemale(!female)
              }} />
              <Text style={{ fontSize: 18, marginLeft: 10, color: 'white' }}>Female</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={styles.btn} onPress={() => handleSubmit()}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export function SignUp({ navigation }) {
  const [cpassword, setCassword] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };



  const handleSubmit = () => {
    let checkEmail = validateEmail(email);
    let e = email
    if (checkEmail === true && password === cpassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User account created & signed in!");
          console.log("1:", e)
          navigation.navigate('FormInput', { email: e })
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            alert("That email address is already in use!");
          }
          if (error.code === "auth/invalid-email") {
            alert("That email address is invalid!");
          }
          alert(error);
        });
    } else {
      if (password === cpassword) alert("Valid Format");
      else alert("Invalid Password and Confirm Password");
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#242526", "#242526"]}>
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', backgroundColor: '#242526', height: '28%' }}>
          <View style={{ flexDirection: 'column', marginTop: '18%' }}>
            {/* <Text style={styles.textHeader}>Musdio 🎧</Text> */}
            {/* <Text style={[styles.textHeader, { fontSize: 15 }]}>Welcome</Text> */}
          </View>
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: '7%', flexDirection: 'row' }}>
            <Image
              source={{ uri: 'https://media.discordapp.net/attachments/977411778671677471/1002243690024153190/logo-removebg-preview.png', }}
              style={{ height: 150, width: 150 }}
            />
            <Text style={{ color: 'white', fontSize: 30, fontWeight: '900', paddingBottom: '5%', marginLeft: '-7%' }}> Musdio </Text>
          </View>
        </View>
        <View style={styles.boxInput}>
          <View style={{ flexDirection: 'row', backgroundColor: '#242526', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <TouchableOpacity style={{ width: '50%', alignItems: 'center', backgroundColor: '#303134' }} onPress={() => { navigation.navigate('SignIn') }} >
              <Text style={[styles.textContent, styles.nonActive]}>Sign In</Text>
            </TouchableOpacity>
            <Text style={[styles.textContent, styles.Active]}>Sign Up</Text>
          </View>
          <View style={{ marginTop: '4%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                placeholder="Enter email..."
                placeholderTextColor="white"
                style={styles.input}
                onChangeText={(value) => setEmail(value)}
              />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                secureTextEntry={true}
                placeholder="Enter password..."
                placeholderTextColor="white"
                style={styles.input}
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                secureTextEntry={true}
                placeholderTextColor="white"
                placeholder="Enter confirm password..."
                style={styles.input}
                onChangeText={(value) => setCassword(value)}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}
            onPress={handleSubmit}
          >
            <Text style={styles.btn}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  boxSocial: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    fontSize: 24,
    width: '50%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white'
  },
  iconSocial: {
    width: 50,
    height: 50,
    margin: 20,
    marginTop: 5,
  },
  prevBtn: {
    position: "absolute",
    top: "5%",
    left: "2.5%",
  },
  box: {
    // alignItems: "center",
    backgroundColor: '#242526',
    flex: 1
  },
  textHeader: {
    fontSize: 26,
    zIndex: 1,
    fontWeight: "400",
    color: 'white',
    marginLeft: '15%',
  },
  nonActive: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12
  },
  Active: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#242526'
  },
  img: {
    width: "80%",
    height: "40%",
  },
  boxInput: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: '-3%',
    backgroundColor: '#242526'
  },
  input: {
    width: '80%',
    textAlignVertical: "center",
    padding: 18,
    paddingLeft: 20,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: "#000",
    color: 'white',
    backgroundColor: '#38304c',
  },
  btn: {
    backgroundColor: "#7a56d4",
    padding: 10,
    fontSize: 23,
    color: "white",
    borderRadius: 20,
    textAlign: "center",
    width: '40%',
  },
});

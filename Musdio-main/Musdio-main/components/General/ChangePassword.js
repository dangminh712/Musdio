import { StyleSheet, Text, View, FlatList, TextInput, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { auth } from '../Firebase'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";

function ChangePassword({ navigation }) {
    const dispatch = useDispatch();
    const [curPass, setcurPass] = useState('')
    const [newPass, setnewPass] = useState('');
    const [rePass, setrePass] = useState('');
    const check = () => {
        (async () => {
            const user = auth.currentUser
            const check = await EmailAuthProvider.credential(user.email, curPass)
            try {
                await reauthenticateWithCredential(user, check)
                if (newPass == rePass) {
                    await updatePassword(auth.currentUser, newPass)
                    Alert.alert("Success", "Change password succesfully !")
                }
                else {
                    alert("Error", "New password and re-enter password are not match.")
                }
            } catch (e) {
                console.log("Error message: ", e)
                Alert.alert("Error", "Error change password.")
            }
        })()
    }
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
                        <Text style={styles.textHeader} >Change Password</Text>
                    </View>
                    <View style={styles.Bottom}>
                        <View style={styles.Text}>
                            <View style={{ paddingTop: '4%', paddingRight: '5%' }}>
                                <FontAwesome name="edit" size={24} color="white" />
                            </View>
                            <TextInput
                                placeholder="Enter current password"
                                placeholderTextColor="white"
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={newText => setcurPass(newText)}

                            >
                            </TextInput>
                        </View>
                        <View style={styles.Text}>
                            <View style={{ paddingTop: '4%', paddingRight: '5%' }}>
                                <FontAwesome name="edit" size={24} color="white" />
                            </View>
                            <TextInput
                                placeholder="Enter new password"
                                placeholderTextColor="white"
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={newText => setnewPass(newText)}
                            />
                        </View>
                        <View style={styles.Text}>
                            <View style={{ paddingTop: '4%', paddingRight: '5%' }}>
                                <FontAwesome name="edit" size={24} color="white" />
                            </View>
                            <TextInput
                                placeholder="Re-enter new password"
                                placeholderTextColor="white"
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={newText => setrePass(newText)}

                            />
                        </View>
                        <TouchableOpacity onPress={check}>
                            <View style={styles.Button}>
                                <Text style={styles.button}>
                                    Change
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.ToolBar}>

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
        paddingTop: StatusBar.currentHeight,

    },
    header: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor:'red'
    },
    iconHeader: {
        width: '40%',
        paddingLeft: '5%',
        paddingTop: '2%',
    },
    textHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        width: '100%',
        paddingTop: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
        left: '-70%'
    },
    Bottom: {

        flex: 14,
        //backgroundColor: 'pink',
        borderBottomColor: 'white',
        borderBottomWidth: 0.5

    },
    Bar: {
        paddingTop: 2,
        backgroundColor: 'white'
    },

    Text: {
        //backgroundColor: 'red',
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '10%',
        flexDirection: 'row'

    },
    input: {
        borderWidth: 2,
        borderColor: "white",
        minWidth: '80%',
        textAlignVertical: "center",
        padding: '3%',
        paddingLeft: '5%',
        borderRadius: 20,
        shadowColor: "white",
        paddingRight: '10%',
        color: 'white'
    },
    Button: {
        left: '13%',
        top: '40%',
        width: '78%',
        height: '30%',
        backgroundColor: '#7a56d4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,

    },
    button: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    },
});
export default ChangePassword


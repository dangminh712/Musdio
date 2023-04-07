import { LinearGradient } from "expo-linear-gradient";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    StatusBar
} from "react-native";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/index";

export const Forgot = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [send,setSend] = useState(false)
    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = () => {
        if (validateEmail(email)) {
            console.log("AAA")
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setSend(true)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode,errorMessage)
                });
        }
        else {
            alert("Error input")
        }
    }

    return (
        <LinearGradient style={styles.container} colors={["#242526", "#242526"]}>
            <View style={styles.box}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: "700", marginTop: '4%' }}>{`Forgot\nPassword`}</Text>
                    <Image
                        source={require("../../assets/images/reset-password-icon-27.jpg")}
                        style={{ height: 120, width: 120 }}
                    />
                </View>
                <View style={{ width: '78%', paddingLeft: '7%', paddingTop: '5%' }}>
                    <Text style={{ color: 'white', opacity: 0.6, fontWeight: '700', fontSize: 15, marginLeft: '4%', marginTop: '9%' }}>Enter your email that registered to receive mail reset password </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '14%' }}>
                    <TextInput
                        placeholder="Enter email..."
                        placeholderTextColor="white"
                        style={styles.input}
                        onChangeText={(value) => {
                            setEmail(value)
                        }}
                    />
                    {
                        send && (
                            <Text style = {{color: 'white', fontSize: 16}}>
                                Reset your password by link in email.
                            </Text>
                        )
                    }
                    <TouchableOpacity style={{ width: '40%', marginTop: '40%', }} onPress={() => { handleSubmit() }}>
                        <Text style={[styles.btn]}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                        <Text style={{ color: "white", marginTop: '13%', fontWeight: '600' }}>Back to Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
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
        flex: 1,
        top: StatusBar.currentHeight
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
        backgroundColor: 'black'
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
        backgroundColor: 'black'
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
        marginTop: 10,
    },
    btn: {
        backgroundColor: "#7a56d4",
        padding: 10,
        fontSize: 23,
        fontWeight: "700",
        color: "white",
        borderRadius: 20,
        textAlign: "center",
    },
});

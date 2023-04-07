import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Header } from "react-native-elements";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import styled from "styled-components";
import React, { useState, useRef } from "react";
import CountDownTimer from "react-native-countdown-timer-hooks";

const showToastSetSuccessTime = () => {
  ToastAndroid.show(
    "The set was successful.",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};
const showToastTurnOff = () => {
  ToastAndroid.show(
    "Turn off was successful.",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};
function Sleep({navigation}){ 
  const [saveTime,setSaveTime]=useState(false);
  const refTimer = useRef();
  const [timerEnd, setTimerEnd] = useState(false);
  const timerCallbackFunc = (timerFlag) => {
    setTimerEnd(timerFlag);
  };
  return (
    <View>
      <Header
        centerComponent={{
          text: "Sleep Timer",
          style: { color: "#fff", fontSize: 20, fontWeight: "500" },
        }}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={styles.headerLeft}
              name="ios-chevron-back"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        }
      ></Header>
      <View>
        <Text style={styles.container}>Stop Audio In</Text>
      </View>
      <View style={styled.firstTime}>
        <Button
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          title={"5 Minutes"}
          type="clear"
          containerStyle={{
            marginTop: "5%",
          }}
          onPress={() => {
            showToastSetSuccessTime();
            setSaveTime(5 * 60);
          }}
        />
        <Button
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          title={"10 Minutes"}
          type="clear"
          containerStyle={{
            marginTop: "3%",
          }}
          onPress={() => {
            showToastSetSuccessTime();
            setSaveTime(10 * 60);
          }}
        />

        <Button
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          containerStyle={{
            marginTop: "3%",
          }}
          title={"20 Minutes"}
          type="clear"
          onPress={() => {
            showToastSetSuccessTime();
            setTimerEnd(false);
            setSaveTime(20 * 60);
          }}
        />
        <Button
          containerStyle={{
            marginTop: "3%",
          }}
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          title={"30 Minutes"}
          type="clear"
          onPress={() => {
            showToastSetSuccessTime();
            setTimerEnd(false);
            setSaveTime(30 * 60);
          }}
        />

        <Button
          containerStyle={{
            marginTop: "3%",
          }}
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          title={"45 Minutes"}
          type="clear"
          onPress={() => {
            setTimerEnd(false);
            setSaveTime(45 * 60);
          }}
        />

        <Button
          containerStyle={{
            marginTop: "3%",
          }}
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          title={"1 Hour"}
          type="clear"
          onPress={() => {
            showToastSetSuccessTime();
            setTimerEnd(false);
            setSaveTime(60 * 60);
          }}
        />

        <Button
          containerStyle={{
            marginTop: "3%",
          }}
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
            color: "red",
          }}
          style={{ backgroundColor: "red" }}
          title={"Turn Off Timer"}
          //type="clear"
          onPress={() => {
            showToastTurnOff();
            setSaveTime(0);
          }}
        />
        <Button
          containerStyle={{
            marginTop: "3%",
          }}
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          title={"Set"}
          onPress={() => {
            refTimer.current.resetTimer();
            setTimerEnd(false);
          }}
        />
        <View style={styles.Mid}>
          <CountDownTimer
            ref={refTimer}
            timestamp={saveTime}
            timerCallback={timerCallbackFunc}
            containerStyle={{
              height: 56,
              width: 120,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 35,
              backgroundColor: "#2196f3",
            }}
            textStyle={{
              fontSize: 25,
              color: "#FFFFFF",
              fontWeight: "500",
              letterSpacing: 0.25,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "30%",
    fontWeight: "bold",
    fontSize: 25,
  },
  firstTime: {
    marginTop: "50%",
    marginLeft: "5%",
    fontSize: 25,
    color: "red",
  },
  Time: {
    marginTop: "3%",
    marginLeft: "5%",
    fontSize: 25,
  },
  color: {
    backgroundColor: "red",
  },
  Mid: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2%",
  },
});

export default Sleep;

import {
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSession } from "../components/auth";

export default function HomeScreen() {
  //Auth Handle
  const { signIn, session } = useSession();

  //Inputs Variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Controlling Variables
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  //Dynamic Text Variables
  const [message, setMessage] = useState("");
  const [loginHeader, setLoginHeader] = useState("Login");

  //Will redirect user if session becomes true
  useEffect(() => {
    if (session == true) {
      router.replace("/");
    }
  });

  const loginUserHandle = async () => {
    if (isLoggingIn) {
      if (email === "" || password === "") {
        setMessage("Fill out fields");
        return;
      }
    } else {
      if (
        email === "" ||
        password === "" ||
        firstName === "" ||
        lastName === ""
      ) {
        setMessage("Fill out fields");
        return;
      }
    }

    const url = isLoggingIn
      ? "http://192.168.1.158:5000/users/login"
      : "http://192.168.1.158:5000/users/register"; //will need to change ip to the ip of the device
    const body = isLoggingIn
      ? { username: email, password }
      : { username: email, password, firstName, lastName };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (response.ok) {
        if (result.token) {

          isLoggingIn ?  await AsyncStorage.setItem("loginType", 'login'): await AsyncStorage.setItem("loginType", 'signUp')
          await AsyncStorage.setItem("token", result.token);
          await setUserInfo();
          
          signIn();
          router.replace("/");
        }
      } else {
        setMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
    }
  };


  async function setUserInfo() {
    const tokenResult = await AsyncStorage.getItem("token");
    const url = "http://192.168.1.158:5000/users/info";
    const body = { token: tokenResult };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      await AsyncStorage.setItem("firstName", result.user.firstName);
      await AsyncStorage.setItem("lastName", result.user.lastName);

      if (result.error) {
        throw new TypeError('Failed');
      }

    } catch (error) {
      console.log("error", error);

    }
  }


  const goToLogin = () => {
    setLoginHeader("Login");
    setIsLoggingIn(true);
  };
  const goToSignUp = () => {
    setLoginHeader("Sign Up");
    setIsLoggingIn(false);
  };

  const testSign = () => {
    signIn();
    router.replace("/");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text className="text-6xl text-white">{loginHeader}</Text>

        {!isLoggingIn && (
          <View style={styles.name}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
              autoCapitalize={"words"}
              placeholder="First Name"
            />

            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setLastName(text)}
              value={lastName}
              autoCapitalize={"words"}
              placeholder="Last Name"
            />
          </View>
        )}

        <TextInput
          style={styles.inputs}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize={"words"}
          placeholder="Enter Your Email"
        />

        <TextInput
          style={styles.inputs}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize={"words"}
          placeholder="Enter Your Password"
        />

        <Pressable onPress={loginUserHandle} className="px-12 py-2 m-3 bg-white rounded-md"
        >
          <View>
            <Text className="text-xl text-black ">Confirm</Text>
          </View>
        </Pressable>

        {!message && (<Text>{message}</Text>)}

        {!isLoggingIn && (
          <View className="flex-row items-center gap-2 ">
            <Text className="text-white">Already have an account?</Text>
            <Pressable
              onPress={goToLogin}
            >
              <View>
                <Text className="text-base font-bold text-white">Login</Text>
              </View>
            </Pressable>
          </View>
        )}
        {isLoggingIn && (
          <View className="flex-row items-center gap-2 ">
            <Text className="text-white">Don't have an account?</Text>
            <Pressable
              onPress={goToSignUp}

            >
              <View>
                <Text className="text-base font-bold text-white">Sign Up</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 8,
  },
  loginContainer: {
    gap: 10,
    padding: 25,
    margin: "5%",
    backgroundColor: "#1e6091",
    alignItems: "center",
    borderRadius: 16,
  },
  name: {
    width: "100%",
    gap: 10,
    alignItems: "center",
  },
  inputs: {
    height: 40,
    backgroundColor: "white",
    borderColor: "#1e6091",
    borderWidth: 2,
    borderRadius: 16,
    textAlign: "center",
    width: "70%",
  },

});

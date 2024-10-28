import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { useSession } from "../../components/auth";

export default function WelcomeScreen() {
  //const { signOut, session } = useSession();
  const [loginType, setLoginType] = useState();
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    async function getFromStorage() {
      try {
        const result = await AsyncStorage.getItem("loginType");
        const resultFirstName = await AsyncStorage.getItem("firstName");
        const resultLastName = await AsyncStorage.getItem("lastName");
        if (result != null && resultFirstName != null && resultLastName != null) {
          if (result == 'login') {
            setDisplayMessage('Welcome back,' + { resultFirstName })
            
          }
        }
        else{
          throw new TypeError('Type is Null');
        }
      }
      catch (error) {

      }
    }
    getFromStorage()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>{displayMessage}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

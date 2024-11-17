import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context"
import { Pressable, Text} from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CharacterView() {
    const envIP = process.env.EXPO_PUBLIC_IP;
    const { id } = useLocalSearchParams<{ id: string }>();

    const [characterInfo, setCharacterInfo] = useState();

    useEffect(() => {
        async function getCharacterInfo() {
          const tokenResult = await AsyncStorage.getItem("token");
          const url = "http://" + envIP + ":5000/character/info";
          const body = { token: tokenResult, _id: id };
    
          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });
    
            const result = await response.json();
            console.log(result)
            setCharacterInfo(result)
    
            if (result.error) {
              throw new TypeError('Failed');
            }
    
          } catch (error) {
            console.log("error", error);
    
          }
        }
        getCharacterInfo()
      }, []);
    return (
        <SafeAreaView>
            <Pressable onPress={() => {console.log(characterInfo)}}>
            <Text> Info</Text>
            </Pressable>
            
        </SafeAreaView>
    )
}
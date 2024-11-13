//External Imports
import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, Pressable, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

//Internal Imports
import LogoutButton from "@/components/logoutButton";
import { ThemeColors } from "@/constants/Colors";
import { Link } from "expo-router";
import DropDown from "@/components/dropDown";
import AddCharacterModal from "@/components/addCharacterModal";


export default function WelcomeScreen() {
  const envIP = process.env.EXPO_PUBLIC_IP;

  const [modalVisible, setModalVisible] = useState(false)
  const [listCount, setListCount] = useState(0);
  const [characterList, setCharacterList] = useState<any>([]);

  //Pull Info from Local Storage
  useEffect(() => {
    async function getCharacterList() {
      const tokenResult = await AsyncStorage.getItem("token");
      const url = "http://"+envIP+":5000/character/characters";
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

        setCharacterList(result);
        setListCount(result.length)


        if (result.error) {
          throw new TypeError('Failed');
        }
  
      } catch (error) {
        console.log("error", error);
  
      }
    }
    getCharacterList()
  },[]);

  function removeCharacter(position: number) {

    let list = characterList
    list.splice(position, 1)

    setCharacterList(list)
    setListCount(listCount - 1)
  }

  function updateList(characterObject: {_id: string, characterName: string}){
    setCharacterList([...characterList, characterObject])
    setListCount(listCount+1)
    
  }
  return (
    <ScrollView>

      <View style={styles.subHeader}>
        <Pressable onPress={() => {setModalVisible(true)}}>
          <View style={styles.subHeaderButton}>
            <Text >Add Character</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        {listCount == 0 && (
          <View style={styles.addCharacterContainer}>
            <Text style={styles.addCharacterHeader}>You have no characters</Text>
            <Pressable onPress={() => {setModalVisible(true)}} style={styles.addCharacterButtonContainer}>
              <View >
                <Text style={styles.addCharacterButtonText}>Add Character</Text>
              </View>
            </Pressable>
          </View>
        )}

        <FlatList
          data={characterList}
          scrollEnabled={false}
          keyExtractor={item => item._id}
          extraData={listCount}
          renderItem={({ item, index }) => (
            <View style={styles.characterListContainer}>
              <Text style={styles.characterListText}>{item.characterName}</Text>

              <Pressable onPress={() => { removeCharacter(index) }}>
                <AntDesign name="delete" size={24} color="white" />
              </Pressable>
            </View>
          )}
        />

        {/* <Link href="/CharacterDesign" asChild> */}
        <Pressable onPress={()=>{}}>
          <Text>Temp</Text>
        </Pressable>
        {/* </Link> */}


        
        <AddCharacterModal isVisible={modalVisible} close={() => { setModalVisible(false) }} setCharacterList={setCharacterList} updateCharacterList={(characterObject) => {updateList(characterObject)}}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 32,
    minHeight: 32,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: ThemeColors['primary/.75'],
    marginBottom: 32,
  },
  listContainer: {
    alignItems: 'center'
  },
  subHeaderButton: {
    backgroundColor: 'white',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  //Add Character Sytles
  addCharacterContainer: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    backgroundColor: ThemeColors['primary'],
  },
  addCharacterHeader: {
    color: 'white',
    fontSize: 20,
    lineHeight: 28
  },
  addCharacterButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 4
  },
  addCharacterButtonText: {
    fontWeight: 'bold'
  },

  //Character Styles
  characterListContainer: {
    backgroundColor: ThemeColors['primary'],
    minWidth: '80%',
    margin: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4
  },
  characterListText: {
    color: 'white',
    fontSize: 16
  },
  


})

//External Imports
import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, Pressable, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

//Internal Imports
import LogoutButton from "@/components/logoutButton";
import { ThemeColors } from "@/constants/Colors";


export default function WelcomeScreen() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [displayMessage, setDisplayMessage] = useState('');
  const [tempCounter, setTempCounter] = useState(0);


  const [listCount, setListCount] = useState(0);
  const [characterList, setCharacterList] = useState<any>([]);

  //Pull Info from Local Storage
  useFocusEffect(() => {
    async function getFromStorage() {
      try {
        const result = await AsyncStorage.getItem("loginType");
        const resultLastName = await AsyncStorage.getItem("lastName");
        const resultFirstName = await AsyncStorage.getItem("firstName");

        if (resultLastName != null) {
          setLastName(resultLastName)
        }
        if (resultFirstName != null) {
          setFirstName(resultFirstName)
        }
        if (result != null) {
          if (result == 'login') {
            setDisplayMessage('Welcome back,')

          }
          else {
            setDisplayMessage('Welcome,')
          }
        }
        else {
          throw new TypeError('Type is Null');
        }
      }
      catch (error) {
        console.log('Error')
      }
    }
    getFromStorage()

  });

  function addCharacter() {
    const newObject = { id: tempCounter }
    setTempCounter(tempCounter + 1)
    setCharacterList([...characterList, newObject])
    setListCount(listCount + 1)

  }

  function removeCharacter(position: number) {

    let list = characterList
    list.splice(position, 1)

    setCharacterList(list)
    setListCount(listCount - 1)
  }

  return (
    <ScrollView>

      <View style={styles.subHeader}>
        <Pressable onPress={addCharacter}>
          <View style={styles.subHeaderButton}>
            <Text >Add Character</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.greetingText}>{displayMessage} {firstName} {lastName}.</Text>
        {listCount == 0 && (
          <View style={styles.addCharacterContainer}>
            <Text style={styles.addCharacterHeader}>You have no characters</Text>
            <Pressable onPress={addCharacter} style={styles.addCharacterButtonContainer}>
              <View >
                <Text style={styles.addCharacterButtonText}>Add Character</Text>
              </View>
            </Pressable>
          </View>
        )}

        <FlatList
          data={characterList}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          extraData={listCount}
          renderItem={({ item, index }) => (
            <View style={styles.characterListContainer}>
              <Text style={styles.characterListText}>Character {item.id}</Text>

              <Pressable onPress={() => { removeCharacter(index) }}>
                <AntDesign name="delete" size={24} color="white" />
              </Pressable>
            </View>
          )}
        />


        <LogoutButton />
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
  },
  listContainer: {
    alignItems: 'center'
  },
  greetingText: {
    padding: 10,
    fontSize: 24,
    lineHeight: 32,
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

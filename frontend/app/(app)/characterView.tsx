import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context"
import { Pressable, ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColors } from '@/constants/Colors';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CharacterView() {
  const envIP = process.env.EXPO_PUBLIC_IP;
  const { id } = useLocalSearchParams<{ id: string }>();

  const [editable, setEditable] = useState(false);

  const [characterName, setCharacterName] = useState('');
  const [level, setLevel] = useState('')
  const [characterClass, setCharacterClass] = useState('');
  const [characterRace, setCharacterRace] = useState('');
  const [alignment, setAlignment] = useState('');
  const [speed, setSpeed] = useState('');
  const [ac, setAC] = useState('');
  const [hp, setHP] = useState('');
  const [statStr, setStatStr] = useState('');
  const [statDex, setStatDex] = useState('');
  const [statCon, setStatCon] = useState('');
  const [statInt, setStatInt] = useState('');
  const [statWis, setStatWis] = useState('');
  const [statChar, setStatChar] = useState('');
  const [appearance, setAppearance] = useState('');
  const [personalityTraits, setPersonalityTraits] = useState('');
  const [ideals, setIdeals] = useState('');
  const [bonds, setBonds] = useState('');
  const [flaws, setFlaws] = useState('');
  const [background, setBackground] = useState('');


  useEffect(() => {
    getCharacterInfo()
  }, []);


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

      setSpeed(result.speed)
      setAC(result.AC)
      setHP(result.HP)
      console.log(result)
      console.log(result.HP)
      setCharacterName(result.characterName)
      setCharacterClass(result.class)
      setCharacterRace(result.race)
      setLevel(result.level)
      setStatStr(result.statStr)
      setStatDex(result.statDex)
      setStatCon(result.statCon)
      setStatInt(result.statInt)
      setStatWis(result.statWis)
      setStatChar(result.statChar)

      setAlignment(result.alignment)
      setAppearance(result.appearance)
      setPersonalityTraits(result.personalityTraits)
      setIdeals(result.ideals)
      setBonds(result.bonds)
      setFlaws(result.flaws)
      setBackground(result.background)

      if (result.error) {
        throw new TypeError('Failed');
      }

    } catch (error) {
      console.log("error", error);

    }
  }

  async function updateCharacterInfo() {
    const tokenResult = await AsyncStorage.getItem("token");
    const url = "http://" + envIP + ":5000/character/update";
    const characterInfo =
    {
      characterName: characterName,
      level: level,
      class: characterClass,
      race: characterRace,
      alignment: alignment,
      speed: speed,
      AC: ac,
      HP: hp,

      statStr: statStr,
      statDex: statDex,
      statCon: statCon,
      statInt: statInt,
      statWis: statWis,
      statChar: statChar,

      appearance: appearance,
      personalityTraits: personalityTraits,
      ideals: ideals,
      bonds: bonds,
      flaws: flaws,
      background: background,
    }
    console.log(characterInfo)
    console.log(hp)

    const body = { token: tokenResult, _id: id, info: characterInfo };

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

    } catch (error) {
      console.log("error", error);

    }
  }
  return (
    <SafeAreaView>

      {/* Subheader */}
      <View style={styles.subHeader}>
        <View style={styles.subheaderInfo}>
          <Text style={styles.infoHeaderText}>Level:</Text>
          <TextInput
            onChangeText={(text) => setLevel(text)}
            value={level}
            editable={editable}
            placeholder="N/A"
          />
        </View>
        <View style={styles.subheaderInfo}>
          <Text style={styles.infoHeaderText}>HP:</Text>
          <TextInput
            onChangeText={(text) => setHP(text)}
            value={hp}
            editable={editable}
            autoCapitalize={"sentences"}
            placeholder="N/A"
          />
        </View>
        <View style={styles.subheaderInfo}>
          <Text style={styles.infoHeaderText}>AC:</Text>
          <TextInput
            onChangeText={(text) => setAC(text)}
            value={ac}
            editable={editable}
            autoCapitalize={"sentences"}
            placeholder="N/A"
          />
        </View>
        <View style={styles.subheaderInfo}>
          <Text style={styles.infoHeaderText}>Speed:</Text>
          <TextInput
            onChangeText={(text) => setSpeed(text)}
            value={speed}
            editable={editable}
            autoCapitalize={"sentences"}
            placeholder="N/A"

          />
        </View>
        {!editable && (
          <>
            <View style={styles.verticalLine}></View>
            <Pressable onPress={() => { setEditable(true) }} style={{ alignSelf: 'center' }}>
              <MaterialCommunityIcons name="square-edit-outline" size={26} color='white' />
            </Pressable>
          </>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Body */}

        <View style={styles.mainBodyContainer}>

          <View style={styles.infoContainer}>
            <Text style={styles.infoHeaderText}>Name</Text>
            <TextInput
              style={styles.basicCharacterInfoField}
              onChangeText={(text) => setCharacterName(text)}
              value={characterName}
              editable={editable}
              autoCapitalize={"sentences"}
              placeholder="N/A"
            />
          </View>
          <View style={styles.infoRowContainer}>
            <View style={{ ...styles.infoContainer, ...{ alignItems: 'center' } }}>
              <Text style={styles.infoHeaderText}>Race</Text>
              <TextInput
                style={{ ...styles.basicCharacterInfoField, ...{ minWidth: '40%', textAlign: 'center' } }}
                onChangeText={(text) => setCharacterRace(text)}
                value={characterRace}

                autoCapitalize={"sentences"}
                placeholder="N/A"
              />
            </View>
            <View style={{ ...styles.infoContainer, ...{ alignItems: 'center' } }}>
              <Text style={{ ...styles.infoHeaderText, ...{ textAlign: 'left' } }}>Class</Text>
              <TextInput
                style={{ ...styles.basicCharacterInfoField, ...{ minWidth: '40%', textAlign: 'center' } }}
                onChangeText={(text) => setCharacterClass(text)}
                value={characterClass}
                autoCapitalize={"sentences"}
                placeholder="N/A"
              />
            </View>
          </View>

          {/* Stat Block */}
          <View style={styles.statContainer}>
            <View style={styles.statRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statText}>Strength</Text>
                <TextInput
                  style={styles.statInfoField}
                  onChangeText={(text) => setStatStr(text)}
                  value={statStr}
                  editable={editable}
                  autoCapitalize={"sentences"}
                  placeholder="N/A"
                />
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statText}>Dexterity</Text>
                <TextInput
                  style={styles.statInfoField}
                  onChangeText={(text) => setStatDex(text)}
                  value={statDex}
                  editable={editable}
                  autoCapitalize={"sentences"}
                  placeholder="N/A"
                />
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statText}>Constitution</Text>
                <TextInput
                  style={styles.statInfoField}
                  onChangeText={(text) => setStatCon(text)}
                  value={statCon}
                  editable={editable}
                  autoCapitalize={"sentences"}
                  placeholder="N/A"
                />
              </View>
            </View>
            <View style={styles.statRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statText}>Intelligence</Text>
                <TextInput
                  style={styles.statInfoField}
                  onChangeText={(text) => setStatInt(text)}
                  value={statInt}
                  editable={editable}
                  autoCapitalize={"sentences"}
                  placeholder="N/A"
                />
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statText}>Wisdom</Text>
                <TextInput
                  style={styles.statInfoField}
                  onChangeText={(text) => setStatWis(text)}
                  value={statWis}
                  editable={editable}
                  autoCapitalize={"sentences"}
                  placeholder="N/A"
                />
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statText}>Charisma</Text>
                <TextInput
                  style={styles.statInfoField}
                  onChangeText={(text) => setStatChar(text)}
                  value={statChar}
                  editable={editable}
                  autoCapitalize={"sentences"}
                  placeholder="N/A"
                />
              </View>
            </View>
          </View>

          {/* Large Text Boxesw */}
          <View style={styles.textContainer}>
            <View style={styles.longTextContainer}>
              <Text style={styles.infoHeaderText}>Alignment</Text>
              <TextInput
                style={styles.longTextField}
                onChangeText={(text) => setAlignment(text)}
                value={alignment}
                editable={editable}
                autoCapitalize={"sentences"}
                placeholder="N/A"
                multiline={true}
                scrollEnabled={true}

              />
            </View>
            <View style={styles.longTextContainer}>
              <Text style={styles.infoHeaderText}>Appearance</Text>
              <TextInput
                style={styles.longTextField}
                onChangeText={(text) => setAppearance(text)}
                value={appearance}
                editable={editable}
                autoCapitalize={"sentences"}
                placeholder="N/A"
                multiline={true}
                scrollEnabled={true}
              />
            </View>
            <View style={styles.longTextContainer}>
              <Text style={styles.infoHeaderText}>Personality Traits</Text>
              <TextInput
                style={styles.longTextField}
                onChangeText={(text) => setPersonalityTraits(text)}
                value={personalityTraits}
                editable={editable}
                autoCapitalize={"sentences"}
                placeholder="N/A"
                multiline={true}
                scrollEnabled={true}
              />
            </View>
            <View style={styles.longTextContainer}>
              <Text style={styles.infoHeaderText}>Ideals</Text>
              <TextInput
                style={styles.longTextField}
                onChangeText={(text) => setIdeals(text)}
                value={ideals}
                editable={editable}
                autoCapitalize={"sentences"}
                placeholder="N/A"
                multiline={true}
                scrollEnabled={true}
              />
            </View>
            <View style={styles.longTextContainer}>
              <Text style={styles.infoHeaderText}>Bonds</Text>
              <TextInput
                style={styles.longTextField}
                onChangeText={(text) => setBonds(text)}
                value={bonds}
                editable={editable}
                autoCapitalize={"sentences"}
                placeholder="N/A"
                multiline={true}
                scrollEnabled={true}
              />
            </View>
            <View style={styles.longTextContainer}>
              <Text style={styles.infoHeaderText}>Flaws</Text>
              <TextInput
                style={styles.longTextField}
                onChangeText={(text) => setFlaws(text)}
                value={flaws}
                editable={editable}
                autoCapitalize={"sentences"}
                placeholder="N/A"
                multiline={true}
                scrollEnabled={true}
              />
            </View>
            <View style={styles.longTextContainer}>
              <Text style={styles.infoHeaderText}>Background</Text>
              <TextInput
                style={styles.longTextField}
                onChangeText={(text) => setBackground(text)}
                value={background}
                editable={editable}
                autoCapitalize={"sentences"}
                placeholder="N/A"
                multiline={true}
                scrollEnabled={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {editable && (
        <>
          <View style={styles.subHeader}>
            <Pressable onPress={() => { setEditable(false), getCharacterInfo() }} style={styles.cancelButton}>
              <View>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => { setEditable(false), updateCharacterInfo() }} style={styles.confirmButton}>
              <View>
                <Text style={styles.buttonText}>Confirm</Text>
              </View>
            </Pressable>
          </View>
        </>
      )}

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  //subheader
  subHeader: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 60,
    paddingHorizontal: 8,
    backgroundColor: ThemeColors['primary/.75'],
    justifyContent: 'space-between'
  },
  subheaderInfo:
  {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  infoHeaderText:
  {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
  },
  verticalLine:
  {
    height: '70%',
    width: 1,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  //body start
  mainBodyContainer:
  {
    flex: 1,
    alignItems: 'center',
  },
  //Name, Race, Class styling
  basicCharacterInfoField:
  {
    borderColor: ThemeColors['primary/.75'],
    borderWidth: 4,
    borderRadius: 8,
  },
  infoContainer:
  {
    minWidth: '50%',
    maxWidth: '75%'
  },
  infoRowContainer:
  {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  //Stat Block
  statContainer:
  {
    backgroundColor: ThemeColors['primary/.75'],
    // width: '85%',
    borderRadius: 8,
    marginVertical: 16,
    padding: 12,
    gap: 8,
  },
  statRow:
  {
    flexDirection: 'row',
    gap: 8

  },
  statText:
  {
    width: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingBottom: 4,
  },
  statInfoField:
  {
    aspectRatio: 4 / 3,
    width: 80,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 4,
  },
  statBlock:
  {
    backgroundColor: ThemeColors['primary'],
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 12,
    paddingTop: 4,
    borderRadius: 4,
  },
  //Big Text Boxes
  textContainer:
  {
    marginBottom: 32,
    gap: 16,
  },
  longTextContainer:
  {
    width: '80%',
    // height: 120
  },
  longTextField:
  {
    textAlign: 'justify',
    minHeight: 96,
    borderColor: ThemeColors['primary'],
    borderRadius: 8,
    borderWidth: 4,
    paddingHorizontal: 8,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cancelButton: {
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: ThemeColors['primary'],
    borderWidth: 4,
    borderRadius: 999,
    borderColor: ThemeColors['primary'],
    left: 8
  },
  confirmButton: {
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: ThemeColors['primary'],
    borderWidth: 4,
    borderRadius: 999,
    borderColor: ThemeColors['primary'],
    right: 8
  },
  buttonText: {
    color: 'white',
  },
})
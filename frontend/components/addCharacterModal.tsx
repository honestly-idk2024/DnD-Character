import { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemeColors } from '@/constants/Colors';
import DropDown from './dropDown';


type propValue = {
    isVisible: boolean;
    close: () => void;
}

export default function AddCharacterModal(props: propValue) {
    const [characterName, setCharacterName] = useState('')
    const [race, setRace] = useState('')
    const [level, setLevel] = useState('')

    const races = [
        { title: "Dragonborn", },
        { title: "Dwarf", },
        { title: "Elf", },
        { title: "Gnome", },
        { title: "Half-Elf", },
        { title: "Half-Orc", },
        { title: "Halfing", },
        { title: "High Elf", },
        { title: "Human", },
        { title: "Tiefling", },
        { title: "Drow", },
        { title: "Gearforged", },
        { title: "Minotaur", },
        { title: "Catfolk", },
    ];
    const levels = [
        { title: "1", },
        { title: "2", },
        { title: "3", },
        { title: "4", },
        { title: "5", },
        { title: "6", },
        { title: "7", },
        { title: "8", },
        { title: "9", },
        { title: "10", },
        { title: "11", },
        { title: "12", },
        { title: "13", },
        { title: "14", },
        { title: "15", },
        { title: "16", },
        { title: "17", },
        { title: "18", },
        { title: "19", },
        { title: "20", },
    ];

    return (
        <Modal transparent visible={props.isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.mainBodyContainer}>
                    <Text style={styles.headerText}>Create Character</Text>
                    <View style={styles.inputContainer}>
                        <Text className='bg-pink-600'>Character Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setCharacterName(text)}
                            value={characterName}
                            autoCapitalize={"words"}
                            placeholder="Enter Name"
                        />
                        <Text>Race</Text>
                        <DropDown dropDownList={races} title={"Select Race"} />
                        <Text>Level</Text>
                        <DropDown dropDownList={levels} title={"Select Level"} />

                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable onPress={() => { props.close(), setCharacterName('') }} style={styles.cancelButton}>
                            <View>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => { props.close(), setCharacterName('') }} style={styles.confirmButton}>
                            <View>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>


        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .8)'
    },
    mainBodyContainer: {
        width: '83.3333%',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 32
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
        margin: 12,
        borderRadius: 12,

    },
    input: {
        width: 200,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderColor: ThemeColors['primary'],
        borderWidth: 4,
        fontSize: 18,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cancelButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: ThemeColors['primary'],
        borderWidth: 4,
        borderRadius: 999,
        borderColor: ThemeColors['primary'],
        left: 8
    },
    confirmButton: {
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
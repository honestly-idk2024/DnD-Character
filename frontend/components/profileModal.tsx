import { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemeColors } from '@/constants/Colors';


type propValue = {
    isVisible: boolean;
    firstNamePassed: string;
    lastNamePassed: string;
    close: () => void;
    updateVisibleName: (updatedFirstName: string, updatedLastName: string) => void
}

export default function ProfileModal(props: propValue) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        setLastName(props.lastNamePassed)
        setFirstName(props.firstNamePassed)

    }, [props.isVisible])


    return (
        <Modal transparent visible={props.isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.mainBodyContainer}>
                    <Text style={styles.headerText}>Update Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputFields}
                            onChangeText={(text) => setFirstName(text)}
                            value={firstName}
                            autoCapitalize={"words"}

                        />

                        <TextInput
                            style={styles.inputFields}
                            onChangeText={(text) => setLastName(text)}
                            value={lastName}
                            autoCapitalize={"words"}


                        />
                    </View>
                    <View style={styles.buttonCotainer}>
                        <Pressable onPress={() => { props.close() }} style={styles.cancelButton}>
                            <View>
                                <Text>Cancel</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => { props.updateVisibleName(firstName, lastName), props.close() }} style={styles.confirmButton}>
                            <View>
                                <Text className='text-white '>Confirm</Text>
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
    headerText:
    {
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
        backgroundColor: ThemeColors['primary/.75']
    },
    inputFields: {
      width:  '75%',
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: 999, 
    },
    buttonCotainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cancelButton:{
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'white',
        borderWidth: 4,
        borderRadius: 999,
        borderColor: ThemeColors['primary'],
        left: 8
    },
    confirmButton:{
        padding: 8,
        borderRadius: 999,
        backgroundColor: ThemeColors['primary'],
        right: 8
    }
})
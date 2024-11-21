import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemeColors } from '@/constants/Colors';


type propValue = {
    isVisible: boolean;
    close: () => void;
}

export default function DeleteCharacterModal(props: propValue) {
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);

    


    return (
        <Modal transparent visible={props.isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.confirmContainer}>
                <Text style={styles.confirmDeleteText}>Are you sure you want to delete this character?</Text>

                    <View style={styles.buttonContainer}>
                        <Pressable onPress={() => { props.close() }} style={styles.cancelButton}>
                            <View>
                                <Text style={styles.buttonText}>No</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => { props.close() }} style={styles.confirmButton}>
                            <View>
                                <Text style={styles.buttonText}>Yes</Text>
                                
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
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 32
    },
    confirmContainer: {
        justifyContent: 'center',
        gap: 16,
        padding: 16,
        margin: 12,
        borderRadius: 12,
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        backgroundColor: "white",
        borderRadius: 16,
        textAlign: "center",
        width: "70%",
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
    confirmDeleteText: {
        color: 'black',

    }
})
import { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemeColors } from '@/constants/Colors';


type propValue = {
    isVisible: boolean;
    close: () => void;
    updatePassword: (updatedPassword: string) => void
}

export default function PasswordModal(props: propValue) {
    const [password, setPassword] = useState('')


    return (
        <Modal transparent visible={props.isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.mainBodyContainer}>
                    <Text style={styles.headerText}>Update Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                            placeholder='New Password'

                        />

                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable onPress={() => { props.close() }} style={styles.cancelButton}>
                            <View>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => { props.updatePassword(password), props.close() }} style={styles.confirmButton}>
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
        backgroundColor: ThemeColors['primary/.75']
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
})
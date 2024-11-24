//External Imports
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Internal Imports
import LogoutButton from "@/components/logoutButton";
import UserIcon from '../../components/userIcon'
import ProfileModal from "@/components/profileModal";
import PasswordModal from "@/components/passwordModal";
import { ThemeColors } from "@/constants/Colors";


export default function Profile() {
    const envIP = process.env.EXPO_PUBLIC_IP;

    const [nameModalVisible, setNameModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    //At first render
    useEffect(() => {
        getFromStorage()
    }, [])

    async function getFromStorage() {
        const resultLastName = await AsyncStorage.getItem("lastName");
        const resultFirstName = await AsyncStorage.getItem("firstName");

        if (resultLastName != null) {
            setLastName(resultLastName)
        }
        if (resultFirstName != null) {
            setFirstName(resultFirstName)
        }
    }

    async function updateName(updatedFirstName: string, updatedLastName: string) {

        const tokenResult = await AsyncStorage.getItem("token");
        const url = "http://" + envIP + ":5000/users/update";
        const body = { token: tokenResult, firstName: updatedFirstName, lastName: updatedLastName};

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            await AsyncStorage.setItem("firstName", updatedFirstName);
            await AsyncStorage.setItem("lastName", updatedLastName);

            if (result.error) {
                throw new TypeError('Failed');
            }

        } catch (error) {
            console.log("error", error);

        }

        getFromStorage()

    }

    async function updatePassword(updatedPassword: string) {

        const tokenResult = await AsyncStorage.getItem("token");
        const url = "http://" + envIP + ":5000/users/updatePassword";
        const body = { token: tokenResult, password: updatedPassword};

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

            if (result.error) {
                throw new TypeError('Failed');
            }

        } catch (error) {
            console.log("error", error);

        }

        getFromStorage()

    }

    return (
        <SafeAreaView style={styles.container}>
            {/* User Icon Holder */}
            <View style={styles.profileIcon}>
                <UserIcon containerSize={122} colorBorder={ThemeColors["primary/.75"]} />
                <Text style={styles.profileIconText}>{firstName} {lastName}</Text>
            </View>

            {/* Action Buttons */}
            <Pressable onPress={() => { setNameModalVisible(true) }} style={styles.updateButton}>
                <View>
                    <Text style={styles.buttonText}>Update Name</Text>
                </View>
            </Pressable>

            <Pressable onPress={() => { setPasswordModalVisible(true) }} style={styles.updateButton}>
                <View>
                    <Text style={styles.buttonText}>Change Password</Text>
                </View>
            </Pressable>
            <LogoutButton/>

            <ProfileModal isVisible={nameModalVisible} firstNamePassed={firstName} lastNamePassed={lastName} close={() => { setNameModalVisible(false) }} updateVisibleName={(updatedFirstName, updatedLastName) => { updateName(updatedFirstName, updatedLastName) }} />
            <PasswordModal isVisible={passwordModalVisible} close={() => { setPasswordModalVisible(false) }} updatePassword={(updatedPassword) => { updatePassword(updatedPassword) }} />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        gap: 15,
    },
    profileIcon:{
        alignItems: 'center',
        borderColor: ThemeColors["primary"],
        borderWidth: 8,
        borderRadius: 999,
        padding: 28,
        aspectRatio: 1/1,
        backgroundColor: ThemeColors["primary/.75"],      
    },
    profileIconText:{
        padding: 15,
        fontSize: 18,
        lineHeight: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    updateButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: ThemeColors['primary'],
        borderWidth: 4,
        borderRadius: 999,
        borderColor: ThemeColors['primary'],
    },
    buttonText: {
        color: 'white',
    },
});
import { View, Pressable, Text, StyleSheet} from 'react-native';
import { useSession } from "./auth";
import { ThemeColors } from "@/constants/Colors";

export default function LogoutButton() {
    const { signOut, session } = useSession();
    return (
        <Pressable onPress={() => { signOut() }} style={styles.LogoutButton}>
            <View>
                <Text style={styles.LogoutButtonText}>Logout</Text>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    LogoutButton: {
        padding: 16,
        marginTop: 80,
        borderRadius: 12,
        backgroundColor: ThemeColors['primary']
    },
    LogoutButtonText:
    {
        fontSize: 30,
        lineHeight: 36,
        color: 'white',
    }
})


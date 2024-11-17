import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context"
import { Text} from "react-native";

export default function CharacterView() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <SafeAreaView>
            <Text> {id}, end</Text>
        </SafeAreaView>
    )
}
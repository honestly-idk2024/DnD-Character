import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false}}>
            <Tabs.Screen name="index" options={{title: "Info"}}/>
            <Tabs.Screen name="level" options={{title: "Level"}}/>
            <Tabs.Screen name="stats" options={{title: "Stats"}}/>
        </Tabs>
    );}
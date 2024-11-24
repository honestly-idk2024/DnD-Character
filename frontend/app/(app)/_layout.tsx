import { Redirect, Stack, Link } from 'expo-router';
import { Pressable } from "react-native";
import UserIcon from '../../components/userIcon'

import { useSession } from '../../components/auth';
import { ThemeColors } from "@/constants/Colors";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function AppLayout() {
  const { session } = useSession();

  if (session == false) {
    return <Redirect href='../sign-in' />;
  }

  return (
    
    <Stack screenOptions={{headerStyle:{
      backgroundColor: ThemeColors['primary']
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
    }}>
    <Stack.Screen name='index' 
      options={{ title:"DnD Forge", headerRight: () => (
        <Link href='/profile' asChild>
          <Pressable>
            <UserIcon colorBorder='white' containerSize={36}/>
          </Pressable>
        </Link>
        ) }} />
    <Stack.Screen name='profile' options={{title:'Profile'}} />
    <Stack.Screen name="characterView" options={{ title: "Character View", headerRight: () => (
      <Link href={{ pathname: "/(app)/ar"}} asChild >
      <Pressable>
      <FontAwesome5 name="dice-d20" size={24} color="white" />
      </Pressable>
      </Link>
    )
     }} />
    <Stack.Screen name="ar" options={{ title: "AR", }} />

    
  </Stack>
  )
}
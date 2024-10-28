import { Slot } from 'expo-router';
import { SessionProvider } from '../components/auth';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Root() {
 

  return (
    <SessionProvider>
        <Slot />
    </SessionProvider>
  );
}
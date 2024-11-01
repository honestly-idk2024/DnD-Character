import { Slot } from 'expo-router';
import { SessionProvider } from '../components/auth';


export default function Root() {
 

  return (
    <SessionProvider>
        <Slot />
    </SessionProvider>
  );
}
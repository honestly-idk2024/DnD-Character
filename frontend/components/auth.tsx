import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { router } from "expo-router";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: boolean | null;
  loading?: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  loading: true,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

//Checks the token
function getSession() {
  const [token, setToken] = useState<string | null>();
  const [session, setSession] = useState<boolean | null>();

  useEffect(() => {
    async function getTokenValidation() {
      const tokenResult = await AsyncStorage.getItem("token");

      setToken(tokenResult);
      
      if (tokenResult == undefined || tokenResult == null) {
        await AsyncStorage.removeItem("token");
        router.replace("../sign-in");
        setSession(false);
      } else {
        const url = "http://192.168.1.158:5000/users/verify";
        const body = { token: tokenResult };

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const result = await response.json();

          if (result.error) {
            throw new TypeError('Failed');
          }

          setSession(true);
        } catch (error) {
          
          console.log("error", error);
          await AsyncStorage.removeItem("token");

          router.replace("../sign-in");
          setSession(false);
        }
      }
    }
    getTokenValidation();
  }, []);
  return { session, setSession };
}

async function removeToken() {
  await AsyncStorage.removeItem("token");
}
//controlls the auth logic
export function SessionProvider({ children }: PropsWithChildren) {
  const { session, setSession } = getSession();

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setSession(true);
        },
        signOut: () => {
          removeToken();
          setSession(false);
        },
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

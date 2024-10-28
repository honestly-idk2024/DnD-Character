import SelectDropdown from "react-native-select-dropdown";
import { Link, router } from "expo-router";
import { Text, StyleSheet, View, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useRef, useState } from 'react';

import { useSession } from "./auth";


export default function DropDown() {
  const { signOut, session } = useSession();

  const profileOptions = [
    { title: "Theme", backGround: "#fff", text: "#000" },
    { title: "View Profile", backGround: "#fff", text: "#000" },
    { title: "Logout", backGround: "#2196f3", text: "#fff" },
  ];


  return (

    <SelectDropdown
      data={profileOptions}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={() => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <FontAwesome name="user-circle" size={24} color="white" />
          </View>
        );
      }}
      renderItem={(item) => {
        return (
          <View>
            {item.title == "Theme" && (
              <Text
                style={{
                  ...styles.dropdownItemTxtStyle,
                  backgroundColor: item.backGround,
                  color: item.text
                }}
              >
                {item.title}
              </Text>
            )}
            {item.title == "View Profile" && (
              <Pressable>
                  <View>
                    <Text
                      style={{
                        ...styles.dropdownItemTxtStyle,
                        backgroundColor: item.backGround,
                        color: item.text
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
              </Pressable>
            )}
            {item.title == "Logout" && (
              <Pressable onPress={() => {signOut()}}>
              <View >
                <Text style={{...styles.dropdownItemTxtStyle, backgroundColor: item.backGround, color: item.text}}>{item.title}</Text>
              </View>
              </Pressable> 
            )}
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />

  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 125,
    height: 50, 
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 3,
  },
});

import SelectDropdown from "react-native-select-dropdown";
import { Text, StyleSheet, View, Pressable } from "react-native";
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ThemeColors } from "@/constants/Colors";


type propValue = {
  dropDownList: { title: string; }[];
  title: String;
}


export default function DropDown(props: propValue) {
  

  const profileOptions = [
    { title: "Theme", backGround: "#fff", text: "#000" },
    { title: "View Profile", backGround: "#fff", text: "#000" },
    { title: "Logout", backGround: "#2196f3", text: "#fff" },
  ];


  return (

    <SelectDropdown
      data={props.dropDownList}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || props.title}
            </Text>
            <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
            {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
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
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderColor: ThemeColors['primary'],
    borderWidth: 4,
    
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center'
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-community/picker";

export default function UnitsPicker({ unitsSystem, setUnitsSystem }) {
  return (
    <View style={styles.UnitsSystem}>
      <Picker
        style={styles.PickerContainer}
        selectedValue={unitsSystem}
        onValueChange={(item) => setUnitsSystem(item)}
        itemStyle={styles.itemStyle}
      >
        <Picker.Item label="C" value="metric" />
        <Picker.Item label="F" value="imperial" />
      </Picker>
    </View>
  );
}
const styles = StyleSheet.create({
  UnitsSystem: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -20,
      },
      android: {
        top: 140,
      },
    }),

    left: 150,
    height: 50,
    // width: 30,
  },
  PickerContainer: {
    width: 100,
    justifyContent: "center",
    // marginBottom: 100,
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});

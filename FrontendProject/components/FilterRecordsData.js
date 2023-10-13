import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const FilterRecordsData = ({ onFilterSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const applyFilter = () => {
    onFilterSelect(selectedAttributes, sortOrder);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Record Data By:</Text>
          <View style={styles.radioButtonGroup}>
            <RadioButton.Item
              label="Year"
              value="year"
              status={sortOrder === "year" ? "checked" : "unchecked"}
              onPress={() => setSortOrder("year")}
              color={
                sortOrder === "year" ? Color.steelblue_100 : undefined
              }
            />
            <RadioButton.Item
              label="Month"
              value="month"
              status={sortOrder === "month" ? "checked" : "unchecked"}
              onPress={() => setSortOrder("month")}
              color={
                sortOrder === "month" ? Color.steelblue_100 : undefined
              }
            />
            <RadioButton.Item
              label="Day"
              value="day"
              status={sortOrder === "day" ? "checked" : "unchecked"}
              onPress={() => setSortOrder("day")}
              color={
                sortOrder === "day" ? Color.steelblue_100 : undefined
              }
            />
          </View>
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  filterText: {
    top: -5,
    height: 20,
    left: 1,
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
    fontWeight: "500",
  },
  dropdown: {
    width: 200,
    height: 205,
    position: "absolute",
    top: 0,
    left: -235,
    backgroundColor: Color.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 10,
    zIndex: 999,
  },
  pickerContainer: {
    marginBottom: 8,
  },
  pickerLabel: {
    marginBottom: 2,
    fontWeight: "bold",
  },
  radioButtonGroup: {
    flexDirection: "column",
  },
  applyButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    zIndex:999
  },
});

export default FilterRecordsData;

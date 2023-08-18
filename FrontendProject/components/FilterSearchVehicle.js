import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const FilterSearchVehicle = ({onFilterSelect}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const applyFilter = () => {
    // Here, you can handle the logic for applying the filter
    onFilterSelect(selectedAttributes, sortOrder);
    
  };

  return (
    <View style={styles.container}>
      
      
        <View style={styles.dropdown}>
        
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Attributes:</Text>
            <View style={styles.radioButtonGroup}>
              <RadioButton.Item
                label="Name"
                value="firstName"
                status={selectedAttributes.includes('firstName') ? 'checked' : 'unchecked'}
                onPress={() => {
                  if (selectedAttributes.includes('firstName')) {
                    setSelectedAttributes(selectedAttributes.filter(attr => attr !== 'firstName'));
                  } else {
                    setSelectedAttributes([...selectedAttributes, 'firstName']);
                  }
                }}
                color={selectedAttributes.includes('firstName') ? Color.steelblue_100 : undefined}
              />
              <RadioButton.Item
                label="Contact"
                value="phoneNumber"
                status={selectedAttributes.includes('phoneNumber') ? 'checked' : 'unchecked'}
                onPress={() => {
                  if (selectedAttributes.includes('phoneNumber')) {
                    setSelectedAttributes(selectedAttributes.filter(attr => attr !== 'phoneNumber'));
                  } else {
                    setSelectedAttributes([...selectedAttributes, 'phoneNumber']);
                  }
                }}
                color={selectedAttributes.includes('phoneNumber') ? Color.steelblue_100 : undefined}
              />
              <RadioButton.Item
                label="Registration Number"
                value="registrationNumber"
                status={selectedAttributes.includes('registrationNumber') ? 'checked' : 'unchecked'}
                onPress={() => {
                  if (selectedAttributes.includes('registrationNumber')) {
                    setSelectedAttributes(selectedAttributes.filter(attr => attr !== 'registrationNumber'));
                  } else {
                    setSelectedAttributes([...selectedAttributes, 'registrationNumber']);
                  }
                }}
                color={selectedAttributes.includes('registrationNumber') ? Color.steelblue_100 : undefined}
              />
            </View>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Sort Order:</Text>
            <View style={styles.radioButtonGroup}>
              <RadioButton.Item
                label="Ascending"
                value="ascending"
                status={sortOrder === 'ascending' ? 'checked' : 'unchecked'}
                onPress={() => setSortOrder('ascending')}
                color={sortOrder === 'ascending' ? Color.steelblue_100 : undefined}
              />
              <RadioButton.Item
                label="Descending"
                value="descending"
                status={sortOrder === 'descending' ? 'checked' : 'unchecked'}
                onPress={() => setSortOrder('descending')}
                color={sortOrder === 'descending' ? Color.steelblue_100 : undefined}
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
    position: 'relative',
  },
  filterText: {
    top: -5,
    height: 20,
    left: 1,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    fontWeight: "500",
  },
  dropdown: {
    width: 200,
    height: 405,
    position: 'absolute',
    top: -17,
    right: 140,
    backgroundColor: Color.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 10,
    zIndex:999
  },
  pickerContainer: {
    marginBottom: 8,
  },
  pickerLabel: {
    marginBottom: 2,
    fontWeight: 'bold',
  },
  radioButtonGroup: {
    flexDirection: 'column',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterSearchVehicle;
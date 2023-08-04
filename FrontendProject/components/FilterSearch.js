import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const FilterSearch = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const applyFilter = () => {
    // Here, you can handle the logic for applying the filter
    console.log('Filter Applied:');
    console.log('Selected Attributes:', selectedAttributes);
    console.log('Sort Order:', sortOrder);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Attributes:</Text>
            <View style={styles.radioButtonGroup}>
              <RadioButton.Item
                label="Name"
                value="name"
                status={selectedAttributes.includes('name') ? 'checked' : 'unchecked'}
                onPress={() => {
                  if (selectedAttributes.includes('name')) {
                    setSelectedAttributes(selectedAttributes.filter(attr => attr !== 'name'));
                  } else {
                    setSelectedAttributes([...selectedAttributes, 'name']);
                  }
                }}
                color={selectedAttributes.includes('name') ? Color.white : undefined}
              />
              <RadioButton.Item
                label="Contact"
                value="contact"
                status={selectedAttributes.includes('contact') ? 'checked' : 'unchecked'}
                onPress={() => {
                  if (selectedAttributes.includes('contact')) {
                    setSelectedAttributes(selectedAttributes.filter(attr => attr !== 'contact'));
                  } else {
                    setSelectedAttributes([...selectedAttributes, 'contact']);
                  }
                }}
                color={selectedAttributes.includes('contact') ? Color.white : undefined}
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
                color={selectedAttributes.includes('registrationNumber') ? Color.white : undefined}
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
                color={sortOrder === 'ascending' ? Color.white : undefined}
              />
              <RadioButton.Item
                label="Descending"
                value="descending"
                status={sortOrder === 'descending' ? 'checked' : 'unchecked'}
                onPress={() => setSortOrder('descending')}
                color={sortOrder === 'descending' ? Color.white : undefined}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    left:-10,
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
    top: 10,
    right: 65,
    backgroundColor: Color.steelblue_200,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 10,
    zIndex: 2,
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

export default FilterSearch;
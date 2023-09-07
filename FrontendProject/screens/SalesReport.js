import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity, Modal, Dimensions, Pressable, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import * as ImagePicker from 'expo-image-picker';
const windowWidth = Dimensions.get('window');
import DateTimePicker from '@react-native-community/datetimepicker';
import Date2TimePicker from '@react-native-community/datetimepicker';

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

const SalesReport = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [DateError, setDataError] = useState(false);
  const [Date2Error, setData2Error] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDate2Picker, setShowDate2Picker] = useState(false);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const openDate2Picker = () => {
    setShowDate2Picker(true);
  };

  const handleDateChange = (event, Duedate) => {
    setShowDatePicker(false);
    if (Duedate) {
      setSelectedDate(Duedate, "Please Fill");

    }
  };

  const handleDate2Change = (event, Duedate2) => {
    setShowDate2Picker(false);
    if (Duedate2) {
      setSelectedDate2(Duedate2, "Please Fill");

    }
  };

  handleDate = () =>{
    let hasErrors = false;
    setDataError(false);
    setData2Error(false);

    if(!selectedDate){
      setDataError(true);
      hasErrors = true;
    }
    if(!selectedDate2){
      setData2Error(true);
      hasErrors = true;
    }
    if (!hasErrors) {
      const date = new Date(selectedDate).toLocaleDateString();
      const date2 = new Date(selectedDate2).toLocaleDateString();
      
      console.log(date);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Select range of dates for Sales Report
      </Text>
      <View style={styles.Formcontainer}>
   
        <View style={{
          
          marginTop: 18,
          alignItems:'center',
          justifyContent:'center',
          width: widthPercentageToDP('90%'),
          
        }}>


          <Pressable
            style={{
              flexDirection:'row',
            }}
            onPress={openDatePicker}
          >
            <TextInput
              style={[
                DateError ? styles.text1R : styles.text1
                , styles.text1Typo]}
              value={selectedDate ? selectedDate.toDateString() : ''}
              placeholder="Select from date"
              editable={false}></TextInput>
            <Image
              style={styles.date2SvgrepoCom11C}
              contentFit="cover"
              source={require("../assets/date2svgrepocom-1-11.png")}
            />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
           {DateError ? <Text style={styles.nameError}>Please provide Date</Text> : null}
 


          <Pressable
            style={{
              flexDirection:'row',
              marginTop:20,
             }}
            onPress={openDate2Picker}
          >
            <TextInput
              style={[
                DateError ? styles.text1R : styles.text1
                , styles.text1Typo]}
              value={selectedDate2 ? selectedDate2.toDateString() : ''}
              placeholder="Select to date"
              editable={false}>
            </TextInput>
            <Image
              style={styles.date2SvgrepoCom11C}
              contentFit="cover"
              source={require("../assets/date2svgrepocom-1-11.png")}
            />
          </Pressable>
          {showDate2Picker && (
            <Date2TimePicker
              value={selectedDate2 || new Date()}
              mode="date"
              display="default"
              onChange={handleDate2Change}
            />
          )}
    



        </View>
        {Date2Error ? <Text style={styles.nameError}>Please provide Date</Text> : null}
 
        <View style={styles.buttonContainer}>
        <TouchableOpacity
         onPress={handleDate}
         style={styles.button}>
          <Image
            style={styles.buttonImage}
            source={require('../assets/rectangle-73.png')}
          />
          <Text style={styles.buttonText}>Generate PDF</Text>
        </TouchableOpacity>
      </View>
      </View>



    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#dcebf5',
  },
  Formcontainer: {
    // backgroundColor:'red',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: heightPercentageToDP('1%'),
  },
  buttonContainer: {
    marginTop: heightPercentageToDP("65%"),
    alignItems: "center",
    position:'absolute',
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3, 29, 68, 1)",
    borderRadius: 10,
    width: '100%',
    height: heightPercentageToDP('6%'),
    paddingHorizontal: widthPercentageToDP('40%'),
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    position: "absolute", // Added position absolute
    textAlign: "center",
  },
  text1R: {
    
   
    borderBottomWidth: 2, // Set the width of the underline
    borderBottomColor: 'red', // Set the color of the underline
    // paddingHorizontal: 10,
  },
  nameError: {
    color: 'red',
    marginTop:heightPercentageToDP('1%'),
  },
  heading: {
    marginTop: heightPercentageToDP('15%'),
    marginLeft: widthPercentageToDP('5%'),
    fontSize: 18,
    fontWeight: 'bold', 
    
  },
  
  date2SvgrepoCom11C: {
    left: -10,
    height: 25,
    width: 25,
    top: 0,
    position: "relative",
    overflow: "hidden",
  },
  text1Typo: {
    top: 0,
    color: Color.dimgray_100,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base, 
    position: "relative",
    width: widthPercentageToDP('80%'),

  },
  text1: {
    
    
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10, 
  }


});

export default SalesReport;
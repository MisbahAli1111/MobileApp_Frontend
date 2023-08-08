import React from "react";
import { Image } from "expo-image";
import { TouchableWithoutFeedback, TouchableOpacity, StyleSheet, View, Text, Pressable, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import ImagePickerCamera from "../components/ImagePickerCamera";
import ImagePickerGallery from "../components/ImagePickerGallery";
import Footer from "../components/Footer";




const AddRecord = () => {
  const navigation = useNavigation();

  
  const [details, setDetails] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [date, setDate] = useState(new  Date());
  const [time, setTime] = useState(new Date());
  const [driven, setDriven] = useState('');
  const [user, setUser] = useState('');
  const [service, setService] = useState('');

  const [detailFocused, setDetailFocused] = useState(false);
  const [carNumberFocused, setCarNumberFocused] = useState(false);
  const [DateFocused, setDateFocused] = useState(false);
  const [drivenFocused, setDrivenFocused] = useState(false);
  const [UserFocused, setUserFocused] = useState(false);
  const [TimeFocused, setTimeFocused] = useState(false);
  const [ServiceFocused, setServiceFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const services = ['Oil and Coolant Level', 'Air Filter', 'Tire Pressure', 'Lights', 'Oil and Filter Change','Rotate tires','Wax Vechile','Transmission Fluid','Spark Plugs','Serpentine Belt','Winshield Wipers','Battery Checkup'];
  const [showCameraImagePicker, setShowCameraImagePicker] = useState(false);
  const [showGalleryImagePicker, setShowGalleryImagePicker] = useState(false);
  const [selectedGalleryImageUri, setSelectedGalleryImageUri] = useState(null);
  const [selectedCameraImageUri, setSelectedCameraImageUri] = useState(null);

  const handleCameraIconClick = () => {
    setShowCameraImagePicker(true);
  };

  const handleCameraImageSelected = (uri) => {
    setSelectedCameraImageUri(uri);
    setShowCameraImagePicker(false);
  };

  const handleGalleryIconClick = () => {
    setShowGalleryImagePicker(true);
  };

  const handleGalleryImageSelected = (uri) => {
    setSelectedGalleryImageUri(uri);
    setShowGalleryImagePicker(false);
  };

  const handleDeleteGalleryImage = () => {
    setSelectedGalleryImageUri(null);
  };

  const handleDeleteCameraImage = () => {
    setSelectedCameraImageUri(null);
  };

    const handleDateChange = (event, date) => {
      setShowDatePicker(false);
      if (date) {
        setSelectedDate(date);
      }
    };
  
    const openDatePicker = () => {
      setShowDatePicker(true);
    };

    const handleTimeChange = (event, time) => {
      setShowTimePicker(false);
      if (time) {
        setSelectedTime(time);
      }
    };
  
    const openTimePicker = () => {
      setShowTimePicker(true);
    };

   
  
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  
    const handleCodeSelect = (code) => {
      setSelectedCode(code);
      setShowDropdown(false);
    };

    
    



  const handleSave = () => {

    if (
      details.trim() === '' ||
      selectedCode.trim() === '' ||
      carNumber.trim() === '' ||
      selectedDate.toDateString().trim() === '' ||
      selectedTime.toLocaleTimeString().trim() === '' ||
      user.trim() === '' ||
      driven.trim() === ''
    ) {
      alert('Please enter all input fields.');
      return;
    }
    navigation.navigate("MaintenanceRecord");
  };



  return (
    <View style={styles.addRecord}>

      <Image
        style={[styles.lightTexture22341Icon, styles.iconGroupLayout]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />

      
      <View style={styles.breadcrumbs}>
        <View style={[styles.housefill, styles.housefillFlexBox]}>
          <Image
            style={styles.homeMutedIcon}
            contentFit="cover"
            source={require("../assets/homemuted.png")}
          />
        </View>
        <View style={styles.elementPosition} />
        <View style={styles.elementPosition}>
          <Text style={styles.textTypo}>\</Text>
        </View>

      </View>
      <Image
        style={[styles.addRecordChild, styles.text1Position]}
        contentFit="cover"
        source={require("../assets/rectangle-65.png")}
      />


        <TextInput style={[styles.text2, styles.pmTypo]}
          value={selectedDate ? selectedDate.toDateString() : ''}
        placeholder="Select a date"
        editable={false}
        ></TextInput>
      
      
      <View style={[styles.addRecordItem, styles.addPosition]} />
      <View style={[styles.addRecordInner, styles.addPosition]} />

      <TextInput style={[styles.pm, styles.pmTypo]}
        placeholder="06: 00pm"
        value={selectedTime ? selectedTime.toLocaleTimeString() : ''}
        editable={false}
      ></TextInput>
      
      <TextInput style={[styles.loritaDaniel, styles.pmTypo]}
        placeholder="Lorita Daniel"
        value={user}
        onFocus={() => setUserFocused(true)}
        onBlur={() => setUserFocused(false)}
        onChangeText={setUser}
      ></TextInput>
      <TextInput style={[styles.kmDriven, styles.pmTypo]}
        placeholder="KM Driven"
        keyboardType="numeric"
        value={driven}
        onFocus={() => setDrivenFocused(true)}
        onBlur={() => setDrivenFocused(false)}
        onChangeText={setDriven}
      ></TextInput>
      <TextInput style={[styles.oilChange, styles.pmTypo]}
        placeholder="Oil Change"
        value={selectedCode}
        editable={false}
      ></TextInput>
      <View style={[styles.lineView, styles.childLayout]} />
      <View style={[styles.addRecordChild1, styles.childLayout]} />
      <View style={[styles.addRecordChild2, styles.childLayout]} />
      <View style={[styles.addRecordChild3, styles.childLayout]} />
      <TextInput style={[styles.jxc7789, styles.pmTypo]}
        placeholder="JXC - 7789"
        value={carNumber}
        onFocus={() => setCarNumberFocused(true)}
        onBlur={() => setCarNumberFocused(false)}
        onChangeText={setCarNumber}
      >
      </TextInput>
      {/* this  */}

      <Image
        style={[styles.vectorIcon1, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector1.png")}
      />

      <Image
        style={[styles.groupIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/group-92.png")}
      />

      <Pressable
        onPress={openDatePicker}
        >
      <Image
        style={[styles.date2SvgrepoCom11, styles.svgrepoIconLayout1]}

        contentFit="cover"
        source={require("../assets/date2svgrepocom-1-1.png")}
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
        

      



      <Image
        style={styles.licensePlateNumberSvgrepoCIcon}
        contentFit="cover"
        source={require("../assets/licenseplatenumbersvgrepocom-1.png")}
      />
      <View style={styles.enterDetailParent}>
        <TextInput style={[styles.enterDetail, styles.pmTypo]}
          placeholder="Enter Detail..."
          value={details}
          onFocus={() => setDetailFocused(true)}
          onBlur={() => setDetailFocused(false)}
          onChangeText={setDetails}

        ></TextInput>
        <View style={[styles.groupChild, styles.childLayout]} />
        
        <View style={[position="absolute"]}>
        {/* gallery image start  */}
        <Pressable onPress={handleGalleryIconClick} >
        <Image
          style={[styles.gallerySvgrepoCom1Icon, styles.svgrepoIconLayout1]}
          contentFit="cover"
          source={require("../assets/gallerysvgrepocom-1.png")}
        />
        </Pressable>
        
      {/* gallery image end  */}

        {/* camera image start */}
        <Pressable onPress={handleCameraIconClick}
        >
        <Image
          style={[styles.cameraSvgrepoCom61, styles.svgrepoIconLayout1]}
          contentFit="cover"
          source={require("../assets/camerasvgrepocom-6-1.png")}
        />
        </Pressable>
      
      {/* camera image end  */}
      </View>
      

       {showCameraImagePicker && (
         <ImagePickerCamera onImageSelected={handleCameraImageSelected} />
       )}
      {selectedCameraImageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedCameraImageUri }} style={styles.image} />
          <TouchableOpacity onPress={handleDeleteCameraImage} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        </View>
      )}

      {showGalleryImagePicker && (
        <ImagePickerGallery onImageSelected={handleGalleryImageSelected} />
      )}
      {selectedGalleryImageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedGalleryImageUri }} style={styles.image} />
          <TouchableOpacity onPress={handleDeleteGalleryImage} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        </View>
      )}
      </View>
      
     
      

      



<Pressable
onPress={openTimePicker}>
      <Image
        style={[styles.timeOclockSvgrepoCom1Icon, styles.svgrepoIconLayout1]}
        contentFit="cover"
        source={require("../assets/timeoclocksvgrepocom-1.png")}
      />
</Pressable>
{showTimePicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
        )}


      <Pressable onPress={handleSave}>
        <View style={[styles.vectorParent, styles.groupItemLayout]}>
          <Image
            style={[styles.groupItem, styles.groupItemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-73.png")}
          />
          <Text style={styles.save}>Save</Text>
        </View>
      </Pressable>
      <View style={[styles.cont]}>
        <Footer prop={"MaintenanceRecord"}   />
      </View>
      



      {/* addMaintenanceRecord */}
      <View style={[styles.vectorGroup, styles.iconGroupLayout]}>
      
  
        <View style={styles.groupChild1} />
        
        <View style={styles.addMaintenanceRecordGroupp}>
          <Text style={ styles.addTypo}>
            Add Maintenance Record
          </Text>
        </View>
        
      </View>
     

      
      <Image
        style={[styles.vectorIcon3, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector3.png")}
      />
      
      
      { (
        <View style={styles.servicesClick} >
        <Picker
          selectedValue={selectedCode}
          onValueChange={(itemValue) => handleCodeSelect(itemValue)}
        >
          <Picker.Item  label="Select Maintenance Type " value="" />
          {services.map((code) => (
            <Picker.Item key={code} label={code} value={code} />
          ))}
        </Picker>
        </View>
      )}


    </View>
  );
};

const styles = StyleSheet.create({
  iconGroupLayout: {
    width: 430,
    left: 0,
  },
  text1Position: {
    display: "none",
    position: "absolute",
  },
  housefillFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    lineHeight: 17,
    fontSize: FontSize.caption2Regular_size,
  },
  image: {
    bottom:15,
    width: 350,
    height: 150,
    contentFit: 'cover',
    
  },
  pmTypo: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    textAlign: "left",
    position: "absolute",
    width: 200
  },
  addPosition: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    top: 265,
    position: "absolute",
  },
  
  childLayout: {
    width: 384,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "absolute",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 60,
    position:"relative"
  },
  // here 
  iconLayout: {
    maxHeight: "150%",
    maxWidth: "100%",
    position: "relative",
    overflow: "hidden",

  },
  iconLayout1: {
    maxHeight: "150%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",

  },
  servicesClick:{
    top: 312,
    width: 80,
    left:323


  },
  cont: {
    padding: 6,
    top: -55,
    right: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgrepoIconLayout1: {
    height: 25,
    width: 25,
    position: "absolute",
    overflow: "hidden",
  },
  deleteButton: {
    position: "absolute",
    top:140,
    backgroundColor: "#ff0000", // Customize the background color as needed
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  // Style for the delete button text
  deleteButtonText: {
    color: "#ffffff", // Customize the text color as needed
    fontSize: 16,
    fontWeight: "bold",
  },
  groupItemLayout: {
    height: 45,
    width: 381,
    position: "absolute",
  },
  addRecordChild4Layout: {
    height: 43,
    position: "absolute",
  },
  addTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.darkslateblue,
    fontWeight: "500",
    position: "absolute",
  },
  frameLayout: {
    width: 45,
    top: 797,
    height: 45,
    position: "absolute",

  },
  frameLayoutt: {
    width: 45,
    top: 747,
    height: 45,
    position: "absolute",

  },
  wrapperPosition: {
    left: 98,
    width: 45,
    top: 798,
    height: 45,
    position: "absolute",
  },
  svgrepoIconLayout: {

    height: 26,
    width: 26,
    position: "absolute",
    overflow: "hidden",
  },
  groupPressableLayout: {
    height: 104,
    width: 104,
    top: 732,
    position: "absolute",
  },
  groupPressableLayoutt: {
    height: 104,
    width: 104,
    top: 679,
    position: "absolute",
  },
  lightTexture22341Icon: {
    top: 0,
    position: "absolute",
    height: 932,
  },
  image2Icon: {
    top: 803,
    height: 129,
    width: 430,
    left: 0,
  },
  homeMutedIcon: {
    width: 12,
    height: 14,
  },
  housefill: {
    width: 14,
    height: 20,
    left: -2,
    top: 0,
  },
  elementPosition: {
    left: 18,
    justifyContent: "center",
    height: 20,
    top: 0,
    position: "absolute",
  },
  addMaintenanceRecord: {
    top: 9,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.darkslateblue,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  text1: {
    left: 88,
    display: "none",
    position: "absolute",
    top: 0,
  },
  addMaintenanceRecordParent: {
    left: 40,
    width: 93,
    height: 17,
    top: -25,
    position: "absolute",
  },
  breadcrumbs: {
    top: 130,
    width: 120,
    height: 20,
    left: 19,
    position: "absolute",
  },
  addRecordChild: {
    top: 381,
    height: 216,
    width: 430,
    left: 0,
  },
  text2: {
    left: 24,
    top: 232,
    fontFamily: FontFamily.poppinsRegular,
  },
  addRecordItem: {
    width: 167,
    left: 23,
  },
  addRecordInner: {
    left: 220,
    width: 182,
  },
  pm: {
    left: 221,
    top: 232,
    fontFamily: FontFamily.poppinsRegular,
  },
  loritaDaniel: {
    top: 287,
    left: 24,
  },
  kmDriven: {
    top: 342,
    left: 24,
  },
  oilChange: {
    top: 398,
    left: 24,
  },
  lineView: {
    top: 376,
    left: 23,
  },
  addRecordChild1: {
    top: 432,
    left: 23,
  },
  addRecordChild2: {
    top: 320,
    left: 23,
  },
  addRecordChild3: {
    top: 211,
    left: 23,
  },
  jxc7789: {
    top: 184,
    left: 24,
  },
  vectorIcon: {
    right: "7.09%",
    left: "87.09%",
    bottom: "66.63%",
    top: "30.69%",
    width: "5.81%",
    height: "2.68%",
    maxWidth: "100%",
  },
  // this 
  vectorIcon1: {
    right: "6.98%",
    left: "89.50%",
    bottom: "66.63%",
    top: "30.50%",
    width: "5.81%",
    height: "2.68%",
    maxWidth: "100%",
    position: "relative",
  },
  groupIcon: {
    height: "2.82%",
    width: "6.1%",
    top: "33.50%",
    right: "6.95%",
    bottom: "60.6%",
    left: "88.95%",
  },
  date2SvgrepoCom11: {
    left: 162,
    top: 180,
    height: 25,
  },
  licensePlateNumberSvgrepoCIcon: {
    top: 170,
    left: 360,
    width: 40,
    height: 40,
    position: "absolute",
    overflow: "hidden",
  },
  enterDetail: {
    left: 0,
    top: 0,
  },
  groupChild: {
    top: 34,
    left: -1,
  },
  gallerySvgrepoCom1Icon: {
    left: 350,
    top: 2,
    position:"absolute"
  },
  cameraSvgrepoCom61: {
    left: 318,
    top: 2,
    position:"absolute"
  },
  enterDetailParent: {
    top: 454,
    width: 382,
    height: 35,
    left: 24,
    position: "absolute",
  },
  timeOclockSvgrepoCom1Icon: {
    left: 371,
    top: 180,
    height: 25,
  },
  groupItem: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  save: {
    top: 11,
    left: 171,
    color: Color.snow,
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontWeight: "500",
    position: "absolute",
  },
  vectorParent: {
    top: 650,
    left: 18,
  },
  addRecordChild4: {
    top: 3,
    left: 29,
    width: 372,
  },
  rectangleView: {
    top: 785,
    backgroundColor: Color.steelblue_300,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    height: 102,
    position: "absolute",
  },
  addRecordChild5: {
    top: 917,
    left: 139,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.darkslateblue,
    width: 154,
    height: 6,
    position: "absolute",
  },
  home: {
    left: 22,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 845,
  },
  vehicles: {
    left: 92,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 845,
  },
  addVehicle: {
    top: 825,
    left: 172,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
  },
  records: {
    left: 271,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 845,
  },
  invoices: {
    left: 350,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 845,
  },
  // dashboard and down
  ellipseIcon: {
    left: 20,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  homeMutedIcon1: {
    height: 27,
    width: 25,
  },
  // dashboard
  housefill1: {
    top: 755,
    left: 30,
  },
  // invoicecss
  container: {
    left: 277,
  },
  carCitroenTopVehicleSvgrepIcon: {
    overflow: "hidden",
  },
  frame: {
    left: 358,
  },
  //invoiceicon
  invoiceWarrantyLineSvgrepoIcon: {
    top: 9,
    left: 11,
  },
  // wheelcss
  groupPressable: {
    left: 163,
  },
  addRecordChild6: {

    left: 164,
  },
  groupInner: {
    top: -6,
    height: 80,
    position: "absolute",
  },
  groupChild1: {
    top: 13,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  addMaintenanceRecord1: {
    top: -5,
    left: "30.03%",
    textAlign: "center",
    fontSize: FontSize.size_base,
  },
  // here 
  vectorIcon2: {
    height: "30.85%",
    width: "4.70%",
    top: 17,
    right: "42.53%",
    bottom: "2.82%",
    left: "4%",
  },
  addMaintenanceRecordGroupp: {
    height: "38.1%",
    width: "68.14%",
    top: "132.16%",
    right: "26.74%",
    bottom: "31.75%",
    left: "12.12%",
    position: "absolute",
  },
  addMaintenanceRecordGroup: {
    height: "38.1%",
    width: "68.14%",
    top: "30.16%",
    right: "26.74%",
    bottom: "31.75%",
    left: "5.12%",
    position: "absolute",
  },
  rectanglePressable: {
    top: 59,
    width: 49,
    left: 19,
  },
  vectorGroup: {
    top: 47,
    height: 63,
    position: "absolute",
  },
  maskGroupIcon: {
    top: 58,
    left: 372,
    width: 31,
    height: 31,
    position: "absolute",
  },
  microphoneSvgrepoCom1Icon: {
    left: 12,
    top: 8,
  },
  vectorIcon3: {
    height: "1.26%",
    width: "4.65%",
    top: "36.65%",
    right: "7.67%",
    bottom: "55.39%",
    left: "89.80%",
  },
  addRecord: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
    position: "absolute"
  },
});

export default AddRecord;
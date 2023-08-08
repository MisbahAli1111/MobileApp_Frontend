import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text,TextInput, Pressable,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';



const AddVehicle = () => {
  const navigation = useNavigation();
  const [vehicleType, setvehicleType]=React.useState('');
  const [vehicleModel, setvehicleModel]=React.useState('');
  const [Registration, setRegistration]=React.useState('');
  const [name,setName]=useState('');
  const [Vehiclecolor,setvehiclecolor]=useState("");
  const [phoneNumber, setphoneNumber]=useState('');
  const [km, setKm]=useState('');
  const [image, setImage] = useState(null);

  
    const vehicleCategories = ['Bike','Car','Truck','Richshaw'];
    const modelCategories = [  "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989",  "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",  "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",  "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",  "2020", "2021", "2022", "2023"];
    
  
   

    const pickImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.uri);
      }
      
    };
    
  
    const handleVechileTypeSelect = (code) => {
      setvehicleType(code);
      
    };

    const handleVechileModelSelect = (code) => {
      setvehicleModel(code);
      
    };

    const handleVechileColorSelect = (code) => {
      setvehiclecolor(code);
      
    };


 function saveVehicle()
 {
  if(vehicleModel && vehicleType && Registration && name && vehicleModel  && Vehiclecolor
    && phoneNumber && km) 
    {
      navigation.navigate('Vehicles');
    }
    else
    {
      alert('Fill all Fields')
    }
 }
 function handleInvoicePress()
{
  navigation.navigate("Invoices");
}
function handleHomePress() { 
  navigation.navigate("Home");
 }

  function handleRecordPress()
  {
    navigation.navigate("MaintenanceRecord");
  }
  function handleVehiclePress()
  {
    navigation.navigate("AddVehicle");
  }
  
  return (
    <View style={styles.addVehicle}>
      <Image
        style={[styles.lightTexture22341Icon, styles.iconLayout1]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <Image
        style={[styles.image2Icon, styles.text1Position]}
        contentFit="cover"
        source={require("../assets/image-2.png")}
      />
      <View style={[styles.housefill, styles.housefillFlexBox]}>
      <Pressable
      onPress={() => navigation.navigate("Home")}>
        <Image
          style={styles.homeMutedIcon}
          contentFit="cover"
          source={require("../assets/homemuted.png")}
        />
        </Pressable>
      </View>
      <View style={styles.elementPosition} />
      <View style={styles.elementPosition}>
        <Text style={[styles.text, styles.textTypo]}>\</Text>
      </View>
      
      <View style={styles.noImageFoundParent}>
       
        <View style={[styles.uploadParent, styles.uploadPosition]}>
        <Pressable
        onPress={pickImage}>
          <Text style={[styles.upload, styles.uploadPosition]} type="file" >Upload</Text>
          </Pressable>
          
          <Image
            style={[styles.vectorIcon1, styles.vectorIconLayout]}
            contentFit="cover"
            source={require("../assets/vector16.png")}
          />
      
        </View>
      </View>
      <View style={[styles.addVehicleInner, styles.addInnerPosition]}>
        <View style={styles.vehicleTypeParent}>
          <TextInput
            style={[styles.vehicleType, styles.vehicleTypo] }
            placeholder="Vehicle Type   "
            
        value={vehicleType}
        editable={false}
          ></TextInput>
          <View style={styles.carParent}>
          
            <Image
              style={[styles.frameChild, styles.childLayout]}
              contentFit="cover"
              source={require("../assets/vector-61.png")}
            />
          
            { (
        <View  style={styles.vechilePicker}>
        <Picker
        style={styles.picker}
          selectedValue={vehicleType}
          onValueChange={(itemValue) =>handleVechileTypeSelect(itemValue)}
        >
          <Picker.Item label="Select Vehicle Type" value="" />
          {vehicleCategories.map((code) => (
            <Picker.Item key={code} label={code} value={code} />
          ))}
        </Picker>
        </View>
      )}


          </View>
        </View>
      </View>
      <View style={[styles.lineView, styles.childBorder]} />
      <View style={[styles.addVehicleChild1, styles.childBorder]} />
      <TextInput style={[styles.vehicleModel, styles.vehicleTypo]} 
      placeholder="Modal "
      value={vehicleModel}
      editable={false}  
        />
      {/* <Text style={[styles.text2, styles.vehicleTypo]}>{`2011 `}</Text> */}
      <Image
        style={[styles.addVehicleChild2, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/vector-61.png")}
      />
      {(
      <View  style={styles.vehicleModelPicker}>
        <Picker
          selectedValue={vehicleModel}
          onValueChange={(itemValue) =>handleVechileModelSelect(itemValue)}
        >
          <Picker.Item label="Select Vehicle Model" value="" />
          {modelCategories.map((code) => (
            <Picker.Item key={code} label={code} value={code} />
          ))}
        </Picker>
        </View>
      )}

      <View style={[styles.frameParent, styles.lineParentLayout]}>
        <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput
              style={[styles.vehicleType, styles.vehicleTypo]}
            placeholder="Registration Number     "
            onChange={setRegistration}
            ></TextInput>
          </View>
        </View>
        <View style={[styles.groupChild, styles.groupPosition]} />
        <View style={[styles.groupItem, styles.savePosition]} />
        <View style={styles.frameContainer}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[styles.vehicleType, styles.vehicleTypo]} 
              placeholder="Vehicle Color   " 
              onChange={Vehiclecolor}


              />
              
            
            {/* <View style={styles.carParent1}>
              <Text style={[styles.car, styles.vehicleTypo]}>Black</Text>
              <Image
                style={[styles.frameChild, styles.childLayout]}
                contentFit="cover"
                source={require("../assets/vector-61.png")}
              />
              
             {( <View  style={styles.vechileColor}>
        <Picker
          selectedValue={Vehiclecolor}
          onValueChange={(itemValue) =>handleVechileColorSelect(itemValue)}
        >
          <Picker.Item label="Select Vehicle Colour" value="" />
          {colorCategories.map((code) => (
            <Picker.Item key={code} label={code} value={code} />
          ))}
        </Picker>
        </View>
      )}


            </View> */}
          </View>
        </View>
      </View>
      <View style={[styles.lineParent, styles.lineParentLayout]}>
        <View style={[styles.groupInner, styles.groupInnerLayout]} />
        <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[styles.davidDaniel, styles.vehicleTypo]}    onChange={setName} placeholder="Name">
          
            </TextInput>
          </View>
        </View>
      </View>
      <View style={[styles.lineGroup, styles.lineParentLayout]}>
        <View style={[styles.groupInner, styles.groupInnerLayout]} />
        <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[styles.vehicleType, styles.vehicleTypo]}    onChange={setKm} placeholder="Km Driven   "
            keyboardType="numeric">
             
            </TextInput>
          </View>
        </View>
      </View>
      
      <View style={[styles.addVehicleChild3, styles.groupInnerLayout]} />
      <View style={[styles.addVehicleInner1, styles.addInnerPosition]}>
        <View style={styles.vehicleTypeParent}>
          <TextInput style={[styles.vehicleType, styles.vehicleTypo]}    
          onChange={setphoneNumber} placeholder="Phone Number    "
          keyboardType="numeric"
          maxLength={11}>
           
          </TextInput>
        </View>
      </View>
      <Image
        style={[styles.mdiuserCircleOutlineIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/mdiusercircleoutline.png")}
      />
      <Image
        style={[styles.materialSymbolspermContactIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/materialsymbolspermcontactcalendaroutline2.png")}
      />
   
      
      <Image
        style={[styles.odometerSvgrepoCom1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/odometersvgrepocom-1.png")}
      />
      <Pressable
        style={[styles.groupParent, styles.groupLayout]}
        onPress= {saveVehicle}
      >
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/group-166.png")}
        />
        <Text style={[styles.savebutton, styles.saveTypo]}>Save</Text>
      </Pressable>
      
      
      {/* <Image
        style={[styles.addVehicleChild8, styles.addChildLayout1]}
        contentFit="cover"
        source={require("../assets/rectangle-622.png")}
      />
      <Image
        style={[styles.addVehicleChild9, styles.addChildLaydaout1]}
        contentFit="cover"
        source={require("../assets/rectangle-74.png")}
      />
      <Text style={[styles.steeda, styles.text4Position]}>STEEDA</Text>
      <Text style={[styles.text4, styles.text4Position]}>2023</Text> */}
      <Image
        style={[styles.addVehicleChild10, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/vector-71.png")}
      />
      <Image
        style={[styles.addVehicleChild11, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/vector-8.png")}
      />
    <View style={[styles.rectangleView, styles.iconLayout1]} />
      <View style={styles.addVehicleChild12} />
      <Text style={[styles.home, styles.homeTypo]}>Home</Text>
      <Text style={[styles.vehicles, styles.homeTypo]}>Vehicles</Text>
      <Text style={[styles.addVehicle3, styles.homeTypo]}>Add Vehicle</Text>
      <Text style={[styles.records, styles.homeTypo]}>Records</Text>
      <Text style={[styles.invoices, styles.homeTypo]}>Invoices</Text>
      <TouchableOpacity onPress={handleHomePress}>
      <Image
        style={[styles.ellipseIcon, styles.ellipseLayout1]}
        contentFit="cover"
        source={require("../assets/ellipse-5.png")}
      />
      </TouchableOpacity>
      <View style={[styles.housefill1, styles.text4Position]}>
     <TouchableOpacity onPress={handleHomePress}>
        <Image
          style={styles.homeMutedIcon1}
          contentFit="cover"
          source={require("../assets/homemuted1.png")}
        />
</TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.frame, styles.ellipseLayout]}
        onPress={handleRecordPress}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-8.png")}
        />
       </TouchableOpacity> 
     
      <TouchableOpacity
        style={[styles.ellipsePressable, styles.ellipseLayout]}
        onPress={handleInvoicePress}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-8.png")}
        />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleInvoicePress}>
      <Image
        style={styles.invoiceWarrantyLineSvgrepoIcon}
        contentFit="cover"
        source={require("../assets/invoicewarrantylinesvgrepocom-1.png")}
      />
      </TouchableOpacity>
      <Pressable
        style={[styles.groupPressable, styles.groupPressableLayout]}
        onPress={() => navigation.navigate("AddVehicle")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/group-111.png")}
        />
      </Pressable>
      <Image
        style={[styles.addVehicleChild13, styles.groupPressableLayout]}
        contentFit="cover"
        source={require("../assets/group-174.png")}
      />
      <TouchableOpacity onPressIn={handleVehiclePress}
        style={[styles.wrapper1, styles.ellipseLayout]}
        onPress={handleVehiclePress}
      >

        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-7.png")}
        />
        </TouchableOpacity>
      
       <TouchableOpacity onPress={handleVehiclePress}>
      <Image
        style={styles.carCitroenTopVehicleSvgrepIcon}
        contentFit="cover"
        source={require("../assets/carcitroentopvehiclesvgrepocom-13.png")}
      />
    </TouchableOpacity>
      
       <TouchableOpacity onPress={handleRecordPress}>
        <Image
          style={styles.record641Icon}
          source={require('../assets/record64-1.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout1: {
    width: 430,
    left: 0,
  },
 vehicleModelPicker:{
  top:400,
  width: 60,
  left: 359
 },
 vehicleColorPicker:{
  
 },
  text1Position: {
    display: "none",
    position: "absolute",
  },
  housefillFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    lineHeight: 17,
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontSize: FontSize.caption2Regular_size,
  },
  addVehicle1Position: {
    fontSize: FontSize.size_sm,
    left: 0,
    position: "absolute",
  },
  uploadTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  wrapperLayout: {
    height: 43,
    position: "absolute",
  },
  vehicleTypo: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  uploadPosition: {
    top: "0%",
    position: "absolute",
  },
  addInnerPosition: {
    left: 24,
    position: "absolute",
  },
  childLayout: {
    height: 9,
    width: 14,
    
  },
  childBorder: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "absolute",
  },
  lineParentLayout: {
    height: 34,
    width: 382,
    left: 24,
    position: "absolute",
  },
  groupPosition: {
    left: -1,
    top: 33,
  },
  savePosition: {
    left: 196,
    position: "absolute",
  },
  groupInnerLayout: {
    width: 384,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "absolute",
  },
  addChildLayout2: {
    width: 20,
    top: 691,
    height: 20,
    position: "absolute",
  },
  iconLayout: {
    height: 30,
    width: 30,
    left: 372,
    position: "absolute",
    overflow: "hidden",
  },
  saveTypo: {
    color: Color.white,
    fontFamily: FontFamily.poppinsMedium,
    textAlign: "left",
    fontWeight: "500",
  },
  addChildLayout1: {
    height: 65,
    borderRadius: Border.br_2xs,
    top: 164,
    width: 392,
    position: "absolute",
  },
  text4Position: {
    left: 31,
    position: "absolute",
  },
  addChildLayout: {
    width: 9,
    top: 299,
    height: 14,
    position: "absolute",
  },
  homeTypo: {
    lineHeight: 18,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  ellipseLayout: {
    height: 45,
    top: 800,
    width: 45,
    position: "absolute",
  },
  ellipseLayout1: {
    height: 45,
    top: 748,
    width: 45,
    position: "absolute",
  },
  groupPressableLayout: {
    height: 104,
    width: 104,
    top: 735,
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
    height: 20,
    width: 13,
    top: 130,
    justifyContent: "center",
    left: 19,
    position: "absolute",
  },
  elementPosition: {
    left: 37,
    justifyContent: "center",
    height: 20,
    top: 130,
    position: "absolute",
  },
  text: {
    textAlign: "left",
    color: Color.textTxtPrimary,
  },
  addVehicle1: {
    top: -2,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.darkslateblue,
    textAlign: "left",
  },
  text1: {
    left: 88,
    textAlign: "left",
    color: Color.textTxtPrimary,
    display: "none",
    position: "absolute",
    top: 0,
  },
  addVehicleParent: {
    top: 132,
    left: 46,
    width: 93,
    height: 17,
    position: "absolute",
  },
  addVehicleChild: {
    top: 41,
    height: 80,
    position: "absolute",
  },
  addVehicleItem: {
    top: 60,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  addVehicle2: {
    top: "7.08%",
    left: "38.14%",
    position: "absolute",
  },
  vectorIcon: {
    height: "2.29%",
    width: "5.09%",
    top: "7.3%",
    right: "89.8%",
    bottom: "90.42%",
    left: "5.12%",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    top: 59,
    width: 49,
    left: 19,
  },
  noImageFound: {
    top: 26,
    fontSize: FontSize.size_sm,
    left: 0,
    position: "absolute",
    color: Color.textTxtPrimary,
  },
  upload: {
    left: "10.96%",
 //   textDecoration: "display",
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  vectorIcon1: {
    height: "66.67%",
    width: "26.09%",
    top: "16.67%",
    right: "73.91%",
    bottom: "16.67%",
    left: "-29%",
  },
  uploadParent: {
    height: "51.06%",
    width: "79.31%",
    right: "10.34%",
    bottom: "48.94%",
    left: "10.34%",
  },
  noImageFoundParent: {
    top: 277,
    left: 157,
    width: 116,
    height: 47,
    position: "absolute",
  },
  vehicleType: {
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
  },
  car: {
    fontSize: FontSize.size_base,
    color: Color.textTxtPrimary,
  },
  frameChild: {
    marginLeft: 38,
  },
  vechilePicker: {
    left: -12,
    width: 30,
    bottom:-1,
  },
  vechileColor: {
    left: -12,
    width: 30,
    bottom:-1,
  },
  carParent: {
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  carParent1: {
    marginLeft: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleTypeParent: {
    flexDirection: "row",
  },
  addVehicleInner: {
    top: 400,
  },
  lineView: {
    width: 167,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    left: 23,
    top: 446,
  },
  addVehicleChild1: {
    left: 220,
    width: 182,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    top: 446,
  },
  vehicleModel: {
    left: 221,
    top: 413,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    position: "absolute",
  },
  text2: {
    left: 349,
    top: 413,
    fontSize: FontSize.size_base,
    color: Color.textTxtPrimary,
    position: "absolute",
  },
  addVehicleChild2: {
    top: 421,
    left: 387,
    position: "absolute",
  },
  frameWrapper: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupChild: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "absolute",
    width: 167,
  },
  groupItem: {
    width: 187,
    top: 33,
    left: 196,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
  },
  frameContainer: {
    left: 197,
    top: -1,
    position: "absolute",
  },
  frameParent: {
    top: 467,
  },
  groupInner: {
    left: -1,
    top: 33,
  },
  davidDaniel: {
    width: 168,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
  },
  lineParent: {
    top: 522,
  },
  lineGroup: {
    top: 632,
  },
  lineContainer: {
    top: 687,
  },
  starIcon: {
    left: 338,
    display:"none"
  },
  addVehicleChild3: {
    top: 610,
    left: 23,
  },
  addVehicleInner1: {
    top: 577,
  },
  mdiuserCircleOutlineIcon: {
    top: 519,
  },
  materialSymbolspermContactIcon: {
    top: 574,
  },
  addVehicleChild4: {
    left: 359,
  },
  addVehicleChild5: {
    left: 380,
  },
  addVehicleChild6: {
    left: 296,
  },
  addVehicleChild7: {
    left: 317,
  },
  maskGroupIcon: {
    top: 63,
    width: 31,
    height: 31,
    left: 372,
    position: "absolute",
  },
  odometerSvgrepoCom1Icon: {
    top: 626,
  },
  rectangleIcon: {
    top: 737,
    left: 25,
    borderRadius: Border.br_7xs,
    width: 381,
    height: 45,
    position: "absolute",
  },
  save: {
    top: 747,
    left: 196,
    position: "absolute",
    fontSize: FontSize.size_base,
  },
  groupIcon: {
    top: 3,
    left: 29,
    width: 372,
  },
  maskGroupIcon1: {
    top: 227,
    height: 173,
    width: 392,
    left: 19,
    position: "absolute",
  },
  addVehicleChild8: {
    left: 19,
  },
  addVehicleChild9: {
    left: 129,
  },
  steeda: {
    top: 177,
    color: "#fefcfc",
    fontFamily: FontFamily.poppinsMedium,
    left: 31,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontWeight: "500",
  },
  text4: {
    top: 201,
    color: Color.white,
    fontFamily: FontFamily.poppinsMedium,
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.caption2Regular_size,
    left: 31,
  },
  addVehicleChild10: {
    left: 391,
  },
  addVehicleChild11: {
    left: 32,
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
    height: 98,
    position: "absolute",
  },
  addVehicleChild12: {
    top: 917,
    left: 139,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
    position: "absolute",
  },
  home: {
    left: 19,
    top: 850,
    lineHeight: 18,
  },
  vehicles: {
    left: 90,
    top: 850,
    lineHeight: 18,
  },
  addVehicle3: {
    top: 827,
    left: 166,
  },
  records: {
    left: 265,
    top: 850,
    lineHeight: 18,
  },
  invoices: {
    top: 850,
    lineHeight: 18,
    left: 340,
  },
  ellipseIcon: {
    left: 18,
  },
  homeMutedIcon1: {
    width: 25,
    height: 27,
    left:-3
  },
  housefill1: {
    top: 808,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    left: 270,
  },
  ellipsePressable: {
    left: 348,
  },
  invoiceWarrantyLineSvgrepoIcon: {
    top: 755,
    left: 360,
    width: 26,
    height: 26,
    position: "absolute",
    overflow: "hidden",
  },
  groupPressable: {
   
    left: 155,
  },
  addVehicleChild13: {
    
    left: 155,
  },
  wrapper1: {
    left: 98,
  },
  carCitroenTopVehicleSvgrepIcon: {
    top: 750,
    left: 103,
    width: 36,
    height: 36,
    position: "absolute",
    overflow: "hidden",
  },
  record641Icon: {
    top: 755,
    left: 282,
    width: 27,
    height: 27,
    position: "absolute",
    overflow: "hidden",
  },
  addVehicle: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
    position:"absolute"
  },
  groupParent: {
    top: 700,
    left: 14,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  groupLayout: {
    height: 45,
    width: 391,
    position: "absolute",
  },
  savebutton: {
    top: 11,
    left: 174,
    color: Color.white,
    width: 41,
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.size_base,
  },
  saveTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
});

export default AddVehicle;
import * as React from "react";
import { useState,useEffect,useRef } from "react";
import { Image } from "expo-image";
import {Button, Modal,StyleSheet, View, Text,ScrollView,TextInput, Pressable,TouchableOpacity,FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import Footer from "../components/Footer";
import { Picker } from "@react-native-picker/picker";
import Carousel,{Pagination} from "react-native-snap-carousel";
import {Video} from "expo-av";
import ImagePickerCamera from "../components/ImagePickerCamera";
import ImagePickerGallery from "../components/ImagePickerGallery";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';

//172.20.64.1 shayan ip
//192.168.100.71 misbah ip

const AddVehicle = () => {
  const navigation = useNavigation();
  const [vehicleType, setvehicleType]=React.useState('');
  const [vehicleModel, setvehicleModel]=React.useState('');
  const [Registration, setRegistration]=React.useState('');
  const [name,setName]=useState('');
  const [keyCustomer,setKeyCustomer] = useState('');
  const [Vehiclecolor,setvehiclecolor]=useState("");
  const [phoneNumber, setphoneNumber]=useState('');
  const [ customerType, setCusomterType] = useState('');
  const [ customerTypeError, setCusomterTypeError] = useState(false);
  const [ CompanyNameError, setCompanyNameError] = useState(false);
  
  const [km, setKm]=useState('');
  const [Nmsg,setNmsg]= useState('');
  const [vehicleTypeError, setvehicleTypeError]=useState(false);
  const [vehicleModelError, setvehicleModelError]=useState(false);
  const [RegistrationError, setRegistrationError]=useState(false);
  const [nameError,setNameError]=useState(false);
  const [VehiclecolorError,setvehiclecolorError]=useState(false);
  const [phoneNumberError, setphoneNumberError]=useState(false);
  const [kmError, setKmError]=useState(false);
  const [Msg, setMsg ]=useState('');
  const [RMsg, setRMsg ]=useState('');
  const [make, setMake]= useState('');
  const [year, setYear]= useState('');
  const [ makeError, setMakeError] = useState(false);
  const vehicleCategories = ['Bike','Car','Truck','Auto','Other'];
  const CusomterCategories = ['Walk-in','Company'];
  const modelCategories = [  "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989",  "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",  "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",  "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",  "2020", "2021", "2022", "2023"];
  const [showCameraImagePicker, setShowCameraImagePicker] = useState(false);
  const [showGalleryImagePicker, setShowGalleryImagePicker] = useState(false);
  const [selectedImage,setSelectedImage] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [originalUri, setOriginalUri] = useState('');
  const [status, setStatus] = useState({});
  const video = React.useRef(null);
  const [customers , setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(transformedResponse);
  const [selectedCountry, setSelectedCountry] = useState('');
  const searchRef = useRef();
  const [userId,setUserId] = useState('');
  const  [ CompanyName,setCompanyName] = useState('');
  const getCustomer = async () =>{
    let token= await AsyncStorage.getItem("accessToken");
    const accessToken = 'Bearer ' + token;
    const Business_id = await AsyncStorage.getItem("Business_id");

    
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.100.71:8080/api/users/get-customer/${Business_id}`,
      headers: { 
        'Authorization': accessToken
      }
    };
    
    axios.request(config)
    .then((response) => {

      JSON.stringify(response.data);
      setCustomers(response.data);
      // console.log(customers);
    })
    .catch((error) => {
      console.log(error);
    });

  }



  useEffect(() => {
    getCustomer();
   },[selectedCountry]);
 
   const transformedResponse = customers.map(item => {
    const { id, name } = item;
    return {
      name: name,
      id: id
    };
  });

   const renderCarouselItem = ({ item, index }) => (
    <View key={index} style={styles.carouselItem}>
      {item.type === "image" ? (
        <Pressable style={styles.mediaContainer}
        onPress={() => handleOpen(item.uri)}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        </Pressable>
      ) : (
        <View style={styles.videoContainer1}>
        <Pressable style={styles.mediaContainer}
        onPress={() => handleOpen(item.uri)}>
        <Video
          source={{ uri: item.uri }}
          style={styles.video}
          controls
        />
       <View style={styles.iconContainer}>
            <EvilIcons name="play" size={50} color="white" />
          </View>
        </Pressable>
        </View>
      )}
      <TouchableOpacity onPress={() => handleImageDelete(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  
  const onSearch = search => {
    if (search != '') {
      let tempData = transformedResponse.filter(item => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(transformedResponse);
    }
  }

  const handleClick = () => {
    setClicked(!clicked);

  };
  const handleAddCustomer =() =>{
    navigation.navigate('AddCustomer');
  };

  const fetchData = async () => {
    const index = parseInt(await AsyncStorage.getItem("Business_id"));
    setCurrentPressedIndex(index);
    
  };

  const handlePlayButton = async () => {
    if (video.current) {
      await video.current.playAsync();
    }
  };
  
  const handleOpen = (uri) => {
    setOriginalUri(uri);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setOriginalUri('');
  };

 
    const handleCameraIconClick = () => {
      setShowCameraImagePicker(true);
    };
  
    const handleGalleryIconClick = () => {
      setShowGalleryImagePicker(true);
    };
  
    const handleCameraImageSelected = (uri,type) => {
      
      setSelectedImage([...selectedImage, { uri, type }]);
      setShowGalleryImagePicker(false);
      console.log(selectedImage);
    };
  
    const handleGalleryImageSelected = (uri,type) => {
      
      setSelectedImage([...selectedImage, { uri, type }]);
      setShowGalleryImagePicker(false);
      console.log(selectedImage);
    };
  
    const handleImageDelete = (index) => {
      const newSelectedImage = [...selectedImage];
      newSelectedImage.splice(index, 1);
      setSelectedImage(newSelectedImage);
    };
    
  
    const handleVechileTypeSelect = (code) => {
      setvehicleType(code);
      
    };

    const handleCustomerTypeSelect = (code) => {
      setCusomterType(code);
      
    };

    const uploadImage = async (vehicleId) => {
      let token= await AsyncStorage.getItem("accessToken");
      const accessToken = 'Bearer ' + token;
      const imageData = new FormData();
        // Iterate through the image array and append images to the FormData
        try {
          selectedImage.forEach((entry, index) => {
            const image_uri = entry.uri;
            imageData.append('files', {
              uri: image_uri,
              name: new Date() + ".jpeg",
              type: 'image/jpeg',
            });
          });

          // imageData.append('files', {
          //   uri: selectedImage,
          //   name: new Date + "_profile"+".jpeg",
          //   type: 'image/jpeg', // Adjust the MIME type as needed
          // });
          console.log("formData: " ,imageData );

          
      
          const response = await axios.post(
            `http://192.168.100.71:8080/api/file/upload/vehicle/${vehicleId}`,
            imageData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
      
          console.log('Response:', response.data);
          if (response.data.status == "OK") {
            console.log("image uploaded");
          }
      
          console.log('Images uploaded successfully');
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
    
    

    



    const  saveVehicle= async () => {
      let isValid = true;
      
      if (!vehicleType) {
        setMsg('Please Enter Vehicle Type');
        setvehicleTypeError(true);
        isValid = false;
      } else {
        if (!vehicleModel) {
          setMsg('Please Enter Vehicle Modal');
          setvehicleTypeError(true);
          isValid = false;
        } else {
          setvehicleTypeError(false);
        }
      }
    
      if (!Registration) {
        setRMsg('Please Enter Registration Number');
        setRegistrationError(true);
        isValid = false;
      } else {
        if (!Vehiclecolor) {
          setRMsg('Please Enter Vehicle Color');
          setRegistrationError(true);
          isValid = false;
        } else {
          setRegistrationError(false);
        }
      }

      if(!make || !year){
        setMakeError(true);
        setNmsg('Please provide make and Year of vehicle');
      }else{
        setMakeError(false);
      }
    
      if (!customerType) {
        setCusomterTypeError(true);
        isValid = false;
      } else {
        setCusomterTypeError(false);
      }

      
      if(customerType== 'Company'){
        setCompanyNameError(false);
        if(!CompanyName){
          setCompanyNameError(true);
        }
      }



      if (!keyCustomer) {
        setNameError(true);
        isValid = false;
      } else {
        setNameError(false);
      }
    
      if (!phoneNumber) {
        setphoneNumberError(true);
        isValid = false;
      } else {
        setphoneNumberError(false);
      }
    
      if (!km) {
        setKmError(true);
        isValid = false;
      } else {
        setKmError(false);
      }
    
      if (isValid) {
        let token= await AsyncStorage.getItem("accessToken");
        const accessToken = 'Bearer ' + token;
        const Business_id = await AsyncStorage.getItem("Business_id");
        

        
        let data = JSON.stringify({
          "type": vehicleType,
          "model": vehicleModel,
          "make": make,
          "year": year,
      
          "registrationNumber": Registration,
          "color": Vehiclecolor,
          "ownerId": keyCustomer,
          "kilometerDriven": km,
          "customerType":customerType,
          "parentCompany": customerType === 'Walk-in' ? null : CompanyName
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `http://192.168.100.71:8080/api/vehicle/${Business_id}/add-vehicle`,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': accessToken
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.status === 'OK') {
          
            const createdUserId = response.data.data;
            console.log(response.data.data);
            setUserId(createdUserId);
            
            
            if (createdUserId) {
              uploadImage(createdUserId);
            }
            navigation.navigate('Vehicles');
          }
        })
        .catch((error) => {
          console.log(error);
        });
        
    }
  };

  const customer = customers.map(customer => ({
    key: customer.id.toString(),
    value: customer.name,
  }));


  
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
      <View style={[styles.housefill
        , styles.housefillFlexBox]}>
      <Pressable
      onPress={() => navigation.navigate("Home")}>
        <Image
          style={styles.homeMutedIcon}
          contentFit="cover"
          source={require("../assets/homemuted.png")}
        />
        </Pressable>
        <Text style={[styles.text, styles.textTypo,]}>\</Text>
      </View>
      
    
      {/* Image Upload  */}
 
      <ScrollView style={styles.wrap}>
      <View style={styles.noImageFoundParent}>


      <View style={styles.container}>
     {selectedImage.length > 0 && (
       <View style={styles.imageContainer}>
         <Carousel
           data={selectedImage}
           renderItem={renderCarouselItem}
           sliderWidth={350}
           itemWidth={400}
           onSnapToItem={(index) => setActiveSlide(index)}
           sliderHeight={100}
         />
         {/* {console.log(selectedImage)} */}
         <Pagination
           dotsLength={selectedImage.length}
           activeDotIndex={activeSlide}
           containerStyle={styles.paginationContainer}
           dotColor="#007aff"
           dotStyle={styles.paginationDot}
           inactiveDotColor="#ccc"
           inactiveDotOpacity={0.4}
           inactiveDotScale={0.6}
         />
         
       </View>
     )}
     
     
     
   </View>    


       
       <View style={[styles.uploadParent, styles.uploadPosition]}>

 
           {showCameraImagePicker && (
           <ImagePickerCamera onImageSelected={(uri, type) => handleCameraImageSelected(uri, type)} />
         )}
         {showGalleryImagePicker && (
           <ImagePickerGallery onImageSelected={(uri, type) => handleGalleryImageSelected(uri, type)} />
         )}
                <TouchableOpacity
         onPress={handleGalleryIconClick}>
           <Text style={[styles.upload]}  >Upload</Text>
           </TouchableOpacity>
          <TouchableOpacity
          onPress={handleCameraIconClick}
          >
           <Image
             style={[styles.vectorIcon1]}
             contentFit="cover"
             source={require("../assets/vector16.png")}
           />
           </TouchableOpacity>
         </View>

   
             
       
         
       </View>

        {/* form start */}
        <View style={styles.formWrap}>
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
      <View style={[styles.lineView,
        vehicleTypeError  ? styles.childBorderR :styles.childBorder
         ]} />
      


      
      <TextInput style={[styles.vehicleModel, styles.vehicleTypo]} 
      placeholder="Model "
      onChangeText={text => setvehicleModel(text)}
      value={vehicleModel}
        
        />
     
      
      
<View style={[styles.addVehicleChild1,
 vehicleTypeError  ? styles.childBorderR :styles.childBorder
   ]} />

{vehicleTypeError ? <Text style={styles.nameError}>{Msg}</Text> : null}



      <View style={[styles.frameParent, styles.lineParentLayout]}>
        <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput
              style={[styles.vehicleType, styles.vehicleTypo]}
            placeholder="Registration Number     "
            onChangeText={text => setRegistration(text)}
            value={Registration}
            ></TextInput>
          </View>
        </View>
        <View style={[
         RegistrationError ? styles.groupChildR : styles.groupChild
          , styles.groupPosition]} />
        <View style={[
         RegistrationError ?  styles.groupItemR: styles.groupItem 
          , styles.savePosition]} />
        <View style={styles.frameContainer}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[styles.vehicleType, styles.vehicleTypo]} 
              placeholder="Vehicle Color   " 
              onChangeText={text => setvehiclecolor(text)}
              value={Vehiclecolor}
              />
              
            
            
          </View>
        </View>
      </View>
      {RegistrationError ? <Text style={styles.nameError}>{RMsg}</Text> : null}
      
      
      <View style={[styles.lineParentm, styles.lineParentLayout]}>
         <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[
             makeError ? styles.davidDanielmR : styles.davidDanielm
              ,
               styles.vehicleTypo]} value={make} onChangeText={text => setMake(text)} placeholder="Make">
          
            </TextInput>
            <TextInput style={[
              makeError ? styles.davidDanielmR : styles.davidDanielm
              , 
              styles.vehicleTypo
              ]}  value={year} onChangeText={text => setYear(text)}placeholder="Year">
          
            </TextInput>
            
          </View>
        </View>
      </View>
      {makeError ? <Text style={styles.nameError}>{Nmsg}</Text> : null}
     
      <TouchableOpacity
      onPress={handleClick}>
      <View style={[styles.lineParent, styles.lineParentLayout]}>
         <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <Text style={[styles.davidDaniel, styles.vehicleTypo]} 
            
            >{selectedCountry == '' ? 'Select Customer' : selectedCountry}</Text>
            
          </View>
        </View>
      </View>
      </TouchableOpacity>
      <Image
        style={[styles.mdiuserCircleOutlineIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/mdiusercircleoutline.png")}
      />
      <View style={[
        styles.groupInner,
        nameError ? styles.groupInnerLayoutR : styles.groupInnerLayout ]} />
      {nameError ? <Text style={styles.nameError}>Please Provide Name</Text> : null}

   
      
      
      {clicked ? (
        <Modal transparent={true} animationType="slide">
        <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    }}>
        <View
          style={{
            elevation: 5,
            marginTop: 20,
            height: 600,
            alignSelf: 'center',
            width: '90%',
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: '90%',
              height: 50,
              alignSelf: 'center',
              borderWidth: 0.2,
              borderColor: '#8e8e8e',
              borderRadius: 7,
              marginTop: 20,
              paddingLeft: 20,
            }}
          />
          <ScrollView>
          <FlatList
            data={data}
            style={styles.FlatList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setSelectedCountry(item.name);
                    setKeyCustomer(item.id);
                    setClicked(!clicked);
                    onSearch('');
                    setSearch('');
                  }}>
                  <Text style={{fontWeight: '600'}}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
          </ScrollView>
          <TouchableOpacity
          style={{
            backgroundColor: 'rgba(3, 29, 68, 1)',
            paddingVertical: 10,
            alignSelf:"center",
            borderRadius: 5,
            paddingLeft:10,
            width:"50%",
            marginTop: 10,
            position:"fixed",
            zIndex:999,
            bottom:5,
          }}
          onPress={handleAddCustomer}
        >
          <Text style={{
            fontSize: FontSize.size_sm,
            fontFamily: FontFamily.poppinsMedium,
            color: 'white',
            textAlign: 'center',
          }}>Add Customer</Text>
        </TouchableOpacity>
          </View>
          <TouchableOpacity
        style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 999,
          }}
        onPress={
          handleClick
        }>
        
        <AntDesign name="closecircle" size={24} color="rgba(3, 29, 68, 1)" />
        
      </TouchableOpacity>
        </View>  
          </Modal>
      ) : null}
    

     

      <View style={[styles.addVehicleInner1, styles.addInnerPosition]}>
        <View style={styles.vehicleTypeParent}>
          <TextInput style={[styles.vehicleType, styles.vehicleTypo]}    
         onChangeText={text => setphoneNumber(text)} placeholder="Phone Number    "
          keyboardType="numeric"
          maxLength={11}
          value={phoneNumber}>
           
          </TextInput>
        </View>
      </View>
      <Image
        style={[styles.materialSymbolspermContactIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/materialsymbolspermcontactcalendaroutline2.png")}
      />
      <View style={[
        styles.groupInner
        , 
        phoneNumberError ? styles.groupInnerLayoutR : styles.groupInnerLayout ]} />
      {phoneNumberError ? <Text style={styles.nameError}>Please Provide Contact Number</Text> : null}
     

      <View style={[styles.addVehicleInner1, styles.addInnerPosition]}>
        <View style={styles.vehicleTypeParent}>
          <TextInput style={[styles.vehicleTypeC, styles.vehicleTypo]}    
         onChangeText={text => setCusomterType(text)} placeholder="Customer Type"
          editable={false}
          value={customerType}>
           

            {/* here  */}
          </TextInput>
          <View style={styles.carParentC}>
          
          <Image
            style={[styles.frameChild, styles.childLayout]}
            contentFit="cover"
            source={require("../assets/vector-61.png")}
          />
        
          { (
      <View  style={styles.vechilePicker}>
      <Picker
      style={styles.picker}
        selectedValue={customerType}
        onValueChange={(itemValue) =>handleCustomerTypeSelect(itemValue)}
      >
        <Picker.Item label="Select Customer Type" value="" />
        {CusomterCategories.map((code) => (
          <Picker.Item key={code} label={code} value={code} />
        ))}
      </Picker>
      </View>
    )}
     </View>
        </View>
      </View>

      <View style={[
        styles.groupInnerC
        , 
        customerTypeError ? styles.groupInnerLayoutR : styles.groupInnerLayout ]} />
      {customerTypeError ? <Text style={styles.nameError}>Please provide Customer Type</Text> : null}





      {customerType === 'Company' && (
         <View style={[styles.lineGroup, styles.lineParentLayout]}>
         <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[
             CompanyNameError ?  styles.vehicleTypeeR :styles.vehicleTypee 
              , styles.vehicleTypo]}
            onChangeText={text => setCompanyName(text)} placeholder="Company Name   "
            value={CompanyName}> 
            </TextInput>
          </View>
        </View>
      </View>
      )}
     {CompanyNameError ? <Text style={styles.nameError}>Please provide company Name</Text> : null}
   



      <View style={[styles.lineGroup, styles.lineParentLayout]}>
         <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[styles.vehicleType, styles.vehicleTypo]}
            onChangeText={text => setKm(text)} placeholder="Km Driven   "
            keyboardType="numeric" value={km}> 
            </TextInput>
          </View>
        </View>
      </View>
      {/* odometersvgrepocom-1@3x */}
      <Image
        style={[styles.materialSymbolspermContactIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/odometersvgrepocom-1.png")}
      />
      <View style={[
        styles.groupInner, 
        kmError ? styles.groupInnerLayoutR : styles.groupInnerLayout ]} />
      {kmError ? <Text style={styles.nameError}>Please provide Mileage</Text> : null}
      
      {customerType === 'Company' && (
        <View  style={styles.gap}></View>
      )}
      {km  && (
        <View  style={styles.gape}></View>
      )}
      </View>
      </ScrollView>

      
      

      
      <Image
        style={[styles.odometerSvgrepoCom1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/odometersvgrepocom-1.png")}
      />
      <TouchableOpacity
        style={[styles.groupParent, styles.groupLayout]}
        onPress= {saveVehicle}
      >
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/group-166.png")}
        />
        <Text style={[styles.savebutton, styles.saveTypo]}>Save</Text>
      </TouchableOpacity>
      
      
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


      <View style={[styles.cont]}>
        <Footer prop={"Vehicles"}/>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {originalUri.endsWith('.mp4') ? (
            <View style={styles.videoContainer}>
            <Video
            ref={video}
            source={{ uri: originalUri }}
            style={styles.modalMedia}
            useNativeControls
            contentFit="contain"
            isLooping
            onPlaybackStatusUpdate={setStatus}
            />
            <View style={styles.iconContainer1}>
            {!status.isPlaying && ( 
              <TouchableOpacity onPress={handlePlayButton} style={styles.playButton}>
            <EvilIcons name="play" size={50} color="white" />
            </TouchableOpacity>
            )}
          </View>
          </View>
          ) : (
            <Image source={{ uri: originalUri }} style={styles.modalMedia} contentFit="contain" />
          )}
          <TouchableOpacity onPress={handleClose} style={styles.deleteButton1}>
            <Text style={styles.deleteButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  FlatList:{
    overflow:"scroll",
  },
  videoContainer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
    
  },
  iconContainer1:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  iconContainer: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust the values based on the icon size
  },
  gap:{
    marginTop:70,
  },
  gape:{
    marginTop:60,
  },
  modalContainer: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  modalMedia: {
    width: '100%',
    height: '100%',
    
  },
  modalImage: {
    width: "100%",
    height:"100%",
  },
  modalVideo: {
    width: '100%',
    height:"100%"
    
  },
  mediaContainer: {
    width: 350,
    height: 160,
    position: 'relative',
    alignItems:"center",
    justifyContent:"center"
  },

  media: {
    width: '100%',
    height: '100%',
  },

  playIcon: {
    position: 'absolute',
    width: 50, // Adjust the size of the play icon as needed
    height: 50, // Adjust the size of the play icon as needed
    alignSelf: 'center',
    tintColor: 'white', // Customize the play icon color
  },
  deleteButton1: {
    position: "relative",
    top: -30,
    left:0,
    backgroundColor: "#ff0000", // Customize the background color as needed
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  formWrap:{
    marginTop:100,
    position:'relative',
  },
video: {
    width: "100%",
    height:"100%",
    left:80
  },
  carouselItem: {
    width: 350,
    height: 200,
    position:"relative",
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    paddingVertical: 5,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  imageUpload:{
    position:"absolute",

  },
  container: {
    flex: 1,
    marginTop:-50,
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: -180,
    // position: 'relative',
    width: "100%",
    height: "100%",
    
  },
  image: {
    width: "100%",
    height: "100%",
    contentFit: 'cover',
  },
  deleteButton: {
    position: "relative",
    top: 10,
    left:0,
    backgroundColor: "#ff0000", // Customize the background color as needed
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconLayout1: {
    width: 430,
    left: 0,
  },
  cont:{
    position:'absolute',
  },
 vehicleModelPicker:{
  top:0,
  marginTop:-38,
  width: 60,
  left: 359
 },
 vehicleColorPicker:{
  
 },
 nameError: {
  marginTop: 5,
  marginBottom:4,
  marginLeft: 28,
  color: 'red',
},
wrap:{
  // backgroundColor:'red',
  marginTop:145,
  marginVertical:225,
  flex:1,
  overflow:'hidden',
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
    top: -100,
    left:-25,
    position: "absolute",
  },
  addInnerPosition: {
    left: 24,
    position: "relative",
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
    position: "relative",
    // backgroundColor:'red',
  },
  childBorderR: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "red",
    borderStyle: "solid",
    position: "relative",
    // backgroundColor:'red',
  },
  lineParentLayout: {
    height: 34,
    width: 382,
    left: 24,
    position: "relative",
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
    width: 375,
    height: 2,
    borderTopWidth: 2,
    
    borderStyle: "solid",
    position: "relative",
  },
  groupInnerLayoutR: {
    width: 375,
    height: 2,
    borderTopWidth: 2,
    borderColor: "red",
    borderStyle: "solid",
    position: "relative",
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
    position: "relative",
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
    top: 0,
    height: 14,
    position: "relative",
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
    top: 120,
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
    top:-15,
    left:12
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
    top:220,
    left:35,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position:'relative',
  },
  vectorIcon1: {
    height: "39.67%",
    width: "26.09%",
    top: 195,

    right: "73.91%",
    bottom: "16.67%",
    left: "18%",
  },
  uploadParent: {
    height: "51.06%",
    width: "79.31%",
    right: "10.34%",
    bottom: "48.94%",
    left: "10.34%",
  },
  noImageFoundParent: {
    top: 147,
      left: 157,
      width: 116,
      height: 200,
      position: "relative",
  },
  vehicleType: {
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    // width:'80%',
  },
  vehicleTypee: {
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
        borderBottomWidth: 2,
        borderColor: "#cbcbcb",
    paddingBottom:9,
    
    width:'98%',
  },
  vehicleTypeeR: {
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
        borderBottomWidth: 2,
        borderColor: 'red',
    paddingBottom:9,
    
    width:'98%',
  },
  vehicleTypeC: {
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    width:'80%',
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
  carParentC: {
    marginLeft: -10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom:-5,
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
    top: 0,
    marginTop:0,
    marginBottom:10,
  },
  lineView: {
    width: 167,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    left: 23,
    top: -17,
  },
  addVehicleChild1: {
    left: 220,
    width: 182,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    marginTop:-5,
    top: 0,
  },
  vehicleModel: {
    marginLeft:230,
    marginTop: -54,
    fontSize: FontSize.size_base,
    color: Color.Black,
    position: "relative",
    marginBottom:10,
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
  groupChildR: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "red",
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
  groupItemR: {
    width: 187,
    top: 33,
    left: 196,
    height: 2,
    borderTopWidth: 2,
    borderColor: "red",
    borderStyle: "solid",
  },
  frameContainer: {
    left: 197,
    top: -1,
    position: "absolute",
  },
  frameParent: {
    top: 0,
    marginTop:18,
  },
  groupInner: {
    left:20,
    marginTop:6,
    marginBottom:5,
    borderColor: "#cbcbcb",
  },
  groupInnerC: {
    left:20,
    marginTop:0,
    marginBottom:5,
    borderColor: "#cbcbcb",
  },
  groupInnerR: {
    left:20,
    marginTop:8,
    marginBottom:5,
    borderColor: "red",
  },
  davidDanielm: {
    width: 168,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    borderBottomWidth: 2,
    borderBottomColor: "#c4bfbe",
    width: '49%',
  },
  davidDanielmR: {
    width: 168,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    borderBottomWidth: 2,
    borderBottomColor: "red",
    width: '49%',
  },
  davidDaniel: {
    width: 350,
    fontSize: FontSize.size_base,
    color: 'black',
 
  },
  lineParent: {
    top: 0,
    marginTop:18,
  },
  lineParentm: {
    top: 0,
    marginTop:18,
  },
  lineGroup: {
    marginTop:20,
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
    marginTop:8,
  },
  mdiuserCircleOutlineIcon: {
    marginTop:-37,
  },
  materialSymbolspermContactIcon: {
    top: 0,
    marginTop:-28,
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
    top: 0,
    marginTop:-40,
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
  customerName: {
    fontSize: 16,
    paddingVertical: 5,
  },
  // customerList: {
  //   width: '100%',
  //   marginTop: 10,
  //   maxHeight: 150,
  // },
  selectedCustomer: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerName: {
    fontSize: 16,
    paddingVertical: 5,
  },
  customerList: {
    width: '100%',
    marginTop: 10,
  },
  customerListHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedCustomer: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listButton:{
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  centeredFlatList:{
    // alignSelf:"center",

  },

});

export default AddVehicle;
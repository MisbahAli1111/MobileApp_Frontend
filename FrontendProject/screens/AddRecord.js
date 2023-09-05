import {React} from "react";
import { Image } from "expo-image";
import { AntDesign } from '@expo/vector-icons';
import {Dimensions,Modal,ScrollView, TouchableOpacity, StyleSheet, View, Text, Pressable, TextInput,FlatList  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useState,useEffect,useRef } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import ImagePickerCamera from "../components/ImagePickerCamera";
import ImagePickerGallery from "../components/ImagePickerGallery";
import Footer from "../components/Footer";
import Carousel,{Pagination} from "react-native-snap-carousel";
import {Video} from "expo-av";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowHeight = Dimensions.get('window').height;

const AddRecord = () => {
  const navigation = useNavigation();

const [Msg,setMsg]=useState('');
const [userId,setUserId] = useState('');
  const [NumberError, setNumberError] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [driven, setDriven] = useState('');
  const [user, setUser] = useState('');
  const [service, setService] = useState('');
  const [type,setType] =useState('');

  const [details, setDetails] = useState(false);
  const [NameError, setNameError] = useState(false);
  const [DateError, setDateError] = useState(false);
  const [TimeError, setTimeError] = useState(false);
  const [drivenError, setDrivenError] = useState(false);
  const [DetailError, setDetailError] = useState('');
  const [serviceError, setServiceError] = useState('');





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
  const [serviceDue,setServiceDue] = useState('');
  const services = ['Oil Change', 'Car Wash', 'Car Maintenance', 'Servicing', 'Alignment'];
  const [showCameraImagePicker, setShowCameraImagePicker] = useState(false);
  const [showGalleryImagePicker, setShowGalleryImagePicker] = useState(false);
 const [selectedImage,setSelectedImage] = useState([]);
 const [activeSlide, setActiveSlide] = useState(0);
  const [OwnerName,setOwnerName]= useState('');
  const [numberPlates,setNumberPlates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [originalUri, setOriginalUri] = useState('');
  const [status, setStatus] = useState({});
  const video = useRef(null);
  const [ RegMsg , setRegMsg ]=useState('');
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(transformedResponse);
  const [selectedCountry, setSelectedCountry] = useState('');
  const searchRef = useRef();

  
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
    };
  
    const handleGalleryImageSelected = (uri,type) => {
      
      setSelectedImage([...selectedImage, { uri, type }]);
      setShowGalleryImagePicker(false);
    };
  
    const handleImageDelete = (index) => {
      const newSelectedImage = [...selectedImage];
      newSelectedImage.splice(index, 1);
      setSelectedImage(newSelectedImage);
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

  const handleAddCustomer =() =>{
    navigation.navigate('AddVehicle');
  };



  const calculateServiceDue = (type ,selectedCode) => {
    console.log(type);
    console.log(selectedCode)
    const serviceTypeMap = {
      'Car': {
        'Oil Change': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 3000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 1000,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 15000,
        },
        'Alignment': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 2000,
        },
        'Servicing': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 2500,
        },
      },
      'Auto': {
        'Oil Change': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 3000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 1000,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 1350,
        },
        'Alignment': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 1800,
        },
        'Servicing': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 2250,
        },
      },
      'Bike': {
        'Oil Change': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 600,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 900,
        },
        'Alignment': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1200,
        },
        'Servicing': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1500,
        },
      },
      'Truck': {
        'Oil Change': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 10000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 2000,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 3000,
        },
        'Alignment': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 4000,
        },
        'Servicing': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 5000,
        },
      },
      'Other': {
        'Oil Change': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1000,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 2000,
        },
        'Alignment': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1200,
        },
        'Servicing': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1500,
        },
      },
    };
  
  
  
  
    if (serviceTypeMap[type] && serviceTypeMap[type][selectedCode]) {
      const { kilometersDrivenPerDay, totalKilometersBetweenServices } = serviceTypeMap[type][selectedCode];
      const daysUntilNextService = totalKilometersBetweenServices / kilometersDrivenPerDay;
      return addDays(selectedDate, Math.floor(daysUntilNextService));
    }
  
    return addDays(selectedDate, 30); // Default value if service or type is unknown
  };
  
  

  // Function to add days to a date
  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setServiceDue(newDate.toISOString());
    console.log("ServiceDue: ",serviceDue);
  };




  const getType = async (carNumber) => {
    let token= await AsyncStorage.getItem("accessToken");
    const accessToken = 'Bearer ' + token;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.0.236:8080/api/maintenance-record/${carNumber}/type`,
      headers: { 
        'Authorization': accessToken
      }
    };
    
    axios.request(config)
    .then((response) => {

      JSON.stringify(response.data);
      setType(response.data);
      console.log("Type: ",type);
    })
    .catch((error) => {
      console.log(error);
    });

  };
  
  const getRegistrationNumber = async () =>{
    let token= await AsyncStorage.getItem("accessToken");
    const accessToken = 'Bearer ' + token;
    const Business_id = await AsyncStorage.getItem("Business_id");
    // console.log(Business_id);
    // console.log(accessToken);
    //172.16.82.53 shayan uni ip

    
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.0.236:8080/api/maintenance-record/get-registration-number/${Business_id}`,
      headers: { 
        'Authorization': accessToken
      }
    };
    
    axios.request(config)
    .then((response) => {

      JSON.stringify(response.data);
      setNumberPlates(response.data);
      console.log(numberPlates);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  getCustomer = async (carNumber)=>{
    
    let token= await AsyncStorage.getItem("accessToken");
    const accessToken = 'Bearer ' + token;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.0.236:8080/api/maintenance-record/get-customer/${carNumber}`,
      headers: { 
        'Authorization': accessToken
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));

      const Name = `${response.data[0].firstName} ${response.data[0].lastName}`;
      setUser(Name);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    setUser('No Customer Found');
    getCustomer(carNumber);
    getRegistrationNumber();
    if(carNumber){
    getType(carNumber);
    }
    if(type && selectedCode)
    {
      console.log("calcltaing....");
      calculateServiceDue(type,selectedCode);
      
    }
  },[carNumber,selectedCode]);

  const transformedResponse = numberPlates.map(item => {
    const { registration_number } = item;
    return {
      name: registration_number,
      
    };
  });

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

  const uploadImage = async (recordId) => {
    if(selectedImage)
    {
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

        console.log("formData: " ,imageData );

        
    
        const response = await axios.post(
          `http://192.168.0.236:8080/api/file/upload/record/${recordId}`,
          imageData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
    
        console.log('Response:', response.data);
        if (response.data.status == 'OK') {
          console.log("image uploaded");
        }
    
        console.log('Images uploaded successfully');
      } catch (error) {
        console.error('Error:', error.message);
      }
  }};

  const handleSave = async () => {
    
    let hasErrors = false; // Initialize the flag
    setNumberError(false);
    if (!carNumber) {
      setNumberError(true);
      setRegMsg('Please provide Vehicle Registration Number');
      hasErrors = true;
    } else {
      
      setNumberError(false);
    }
  
    // console.log(selectedDate.toDateString());
    // console.log(selectedTime.toTimeString());
    // console.log(selectedImage);
    
    if (!selectedDate) {
      
      setDateError(true);
      setTimeError(true);
      setMsg('Please provide Date');
      hasErrors = true;
    } else {

      setTimeError(false);
      setDateError(false); // Clear any previous date errors
      
      if (!selectedTime) {
        console.log(selectedTime);
        setDateError(true);
        setMsg('Please provide Time');
        hasErrors = true;
      }
    }
  
    if (!user) {
      setNameError(true);
      hasErrors = true;
    } else {
    
      
      setNameError(false);
    }
  
    if (!driven) {
      setDrivenError(true);
      hasErrors = true;
    } else {
      setDrivenError(false);
    }
  
    if (!selectedCode) {
      setServiceError(true);
      hasErrors = true;
    } else {
      setServiceError(false);
    }
  
    if (!details) {
      setDetailError(true);
      hasErrors = true;
    } else {
      setDetailError(false);
    }
  
    if (!hasErrors) {
      try {
        const dateTime=`${selectedDate.toISOString().split('T')[0]}T${selectedTime.toISOString().split('T')[1]}`;
        const token = await AsyncStorage.getItem("accessToken");
        const accessToken = 'Bearer ' + token;
        // const axios = require('axios');
        const data = {
          "kilometerDriven": driven,
          "service": selectedCode,
          "maintanenceDetail": details,
          "registrationNumber": carNumber,
          "maintanenceDateTime": selectedDate,
          "serviceDue" : serviceDue
        };
          
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://192.168.0.236:8080/api/maintenance-record/add-record',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': accessToken
          },
          data: data
        };
          
        const response = await axios.request(config);
        // console.log(JSON.stringify(response.data));
        if(response.data.status=="EXPECTATION_FAILED"){
         setRegMsg(JSON.stringify(response.data.message));
        setNumberError(true);
        }else{
          console.log(JSON.stringify(response.data));
          if (response.data.status === 'OK') {
          
            const createdUserId = response.data.data;
            console.log(response.data.data);
            setUserId(createdUserId);
            
            // Perform logic using the updated userId here
            if (createdUserId) {
              uploadImage(createdUserId);
            }
            navigation.navigate('MaintenanceRecord');
          }
        }
        
        
      } catch (error) {
        console.error(error);
      }
    }
    
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


      <ScrollView  style={styles.wrap}>


      <TouchableOpacity onPress={handleClick}>
      <Text style={[styles.jxc7789, styles.pmTypof]}>
       {selectedCountry == '' ? 'Select Number Plate' : selectedCountry}
      
      </Text>
      <Image
        style={styles.licensePlateNumberSvgrepoCIcon}
        contentFit="cover"
        source={require("../assets/licenseplatenumbersvgrepocom-1.png")}
      />
      </TouchableOpacity>
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
                    setCarNumber(item.name)
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
          }}>Add Vehicle</Text>
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
        
        <AntDesign name="closecircle" size={24} color="red~~" />
        {/* //rgba(3, 29, 68, 1) */}

      </TouchableOpacity>
        </View>  
          </Modal>
      ) : null}


      <View style={[styles.addRecordChild3,
          NumberError ? styles.childLayoutR :styles.childLayout
         ]} />
      {NumberError ? <Text style={styles.nameError}>{RegMsg}</Text> : null}


      <TextInput style={[styles.text2, styles.pmTypo]}
        value={selectedDate ? selectedDate.toDateString() : ''}
        placeholder="Select a date"
        editable={false}
      ></TextInput>
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
      <View style={[styles.addRecordItem, 
         TimeError ? styles.addPositionR:styles.addPosition
        ]} />


      <TextInput style={[styles.pm, styles.pmTypo]}
        placeholder="06: 00pm"
        value={selectedTime ? selectedTime.toLocaleTimeString() : ''}
        editable={false}
      ></TextInput>
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
      <View style={[styles.addRecordInner,
        DateError ? styles.addPositionR:styles.addPosition
         ]} />
      {DateError ? <Text style={styles.nameError}>{Msg}</Text> : null}


      <TextInput style={[styles.loritaDaniel, styles.pmTypo]}
        placeholder="Lorita Daniel"
        value={user}
        onFocus={() => setUserFocused(true)}
        onBlur={() => setUserFocused(false)}
        editable={false}
      ></TextInput>
    <Image
        style={[styles.vectorIcon1, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector1.png")}
      />
      <View style={[styles.groupChild,
          styles.childLayout
         ]} />
     

      <TextInput style={[styles.kmDriven, styles.pmTypo]}
        placeholder="KM Driven"
        keyboardType="numeric"
        value={driven}
        onFocus={() => setDrivenFocused(true)}
        onBlur={() => setDrivenFocused(false)}
        onChangeText={setDriven}
      ></TextInput>
      <Image
        style={[styles.groupIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/group-92.png")}
      />
<View style={[styles.lineView,
   drivenError ? styles.childLayoutR :styles.childLayout
   ]} />
{drivenError ? <Text style={styles.nameError}>Please provide Mileage</Text> : null}



      <TextInput style={[styles.oilChange, styles.pmTypo]}
        placeholder="Oil Change"
        value={selectedCode}
        editable={false}
      ></TextInput>
      <Image
        style={[styles.vectorIcon3, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector3.png")}
      />
       {(
        <View style={styles.servicesClick} >
          <Picker
            selectedValue={selectedCode}
            onValueChange={(itemValue) => handleCodeSelect(itemValue)}
          >
            <Picker.Item label="Select Maintenance Type " value="" />
            {services.map((code) => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
        </View>
      )}
       <View style={[styles.addRecordChild2,
          serviceError ? styles.childLayoutR :styles.childLayout
         ]} />
       {serviceError ? <Text style={styles.nameError}>Please provide service</Text> : null}

      
      
      
     

      {/* this  */}

      <View style={styles.enterDetailParent}>
        <TextInput style={[styles.enterDetail, styles.pmTypo]}
          placeholder="Enter Detail..."
          value={details}
          onFocus={() => setDetailFocused(true)}
          onBlur={() => setDetailFocused(false)}
          onChangeText={setDetails}
        ></TextInput>
        <View style={[position = "absolute"]}>
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
              style={[styles.cameraSvgrepoCom61, 
                styles.svgrepoIconLayout1
              ]}
              contentFit="cover"
              source={require("../assets/camerasvgrepocom-6-1.png")}
            />
          </Pressable>

          {/* camera image end  */}
        </View>
        <View style={[styles.addRecordChild22,
          DetailError ? styles.childLayoutR :styles.childLayout
           ]} />
        {DetailError ? <Text style={styles.nameError}>Please provide Details</Text> : null}


        {showCameraImagePicker && (
          <ImagePickerCamera onImageSelected={(uri, type) => handleCameraImageSelected(uri, type)} />
        )}
        {showGalleryImagePicker && (
          <ImagePickerGallery onImageSelected={(uri, type) => handleGalleryImageSelected(uri, type)} />
        )}
        
       
     
      </View>

      
      
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
     
      </ScrollView>
     

      

      

    
      
      <View style={[styles.vectorParent, styles.groupItemLayout]}>
      <Pressable onPress={handleSave}>
          <Image
            style={[styles.groupItem, styles.groupItemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-73.png")}
          />
          <Text style={styles.save}>Save</Text>
          </Pressable>
        </View>
      
      

      












    

      <View style={[styles.cont]}>
        <Footer prop={"MaintenanceRecord"} />
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




      {/* addMaintenanceRecord */}
      <View style={[styles.vectorGroup, styles.iconGroupLayout]}>


        <View style={styles.groupChild1} />

        <View style={styles.addMaintenanceRecordGroupp}>
          <Text style={styles.addTypo}>
            Add Maintenance Record
          </Text>
        </View>

      </View>



      
     


    </View>

  );
};

const styles = StyleSheet.create({
  pgContainer:{
    top:200,
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
video: {
    width: "100%",
    height:"100%",
    left:80
  },

  imageUpload:{
    position:"absolute",

  },
  
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
    position: 'relative',
    width: "100%",
    height: "60%",
    justifyContent: 'center',
    
  },
  image: {
    width: "100%",
    height: "100%",
    contentFit: 'cover',
  },
  carouselItem: {
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    top:-100,
    position:"relative"
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height:"100%",
    width:"100%",
  },
  deleteButton: {
    position: "absolute",
    top: 190,
    left:130,
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
  iconGroupLayout: {
    width: 430,
    left: 0,
  },
  nameError: {
    marginTop: 12,
    marginLeft: 28,
    color: 'red',
  },
  nameErrorL: {
    marginTop: 12,
    marginLeft: 28,
   position:'relative',
    color: 'red',
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
  pmTypof: {
    marginLeft: 8,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    textAlign: "left",
    position: "relative",
    width: 200,
    marginTop: 10,
  },
  pmTypo: {
    marginLeft: 8,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    textAlign: "left",
    position: "relative",
    width: 200,
    
  },
  addPosition: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    top: 0,
marginTop:5,
    position: "relative",
  },
  addPositionR: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "red",
    borderStyle: "solid",
    top: 0,
marginTop:5,
    position: "relative",
  },


  childLayout: {
    width: 375,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "relative",
  },
  childLayoutR: {
    width: 375,
    height: 2,
    borderTopWidth: 2,
    borderColor: 'red',
    borderStyle: "solid",
    position: "relative",
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
  servicesClick: {
    top: 0,
    width: 80,
    left: 323,
    marginTop:-45,
    marginBottom:2,

  },
  cont: {
    position:'absolute',
  },
  
  svgrepoIconLayout1: {
    height: 25,
    width: 25,
    position: "relative",
    overflow: "hidden",
  },

  wrap:{
    // backgroundColor:'red',
    // marginVertical:90,
    maxHeight:510,
    marginTop:190,
    // flex:1,
    overflow:'hidden',
    
    // justifyContent: 'center',
  },
  groupItemLayout: {
    height: 45,
    width: 381,
    position: "absolute",
  },
  groupItem2Layout: {
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
    top: 0,
    marginTop: 18,
    fontFamily: FontFamily.poppinsRegular,
  },
  addRecordItem: {
    width: 175,
    left: 28,

  },
  addRecordInner: {
    left: 220,
    width: 182,
    marginTop:16,
  },
  pm: {
    left: 221,
    top: 0,
    marginTop: -35,
    fontFamily: FontFamily.poppinsRegular,
  },
  loritaDaniel: {
    top: 0,
    marginTop:16,
    marginBottom:6,
    left: 24,
  },
  kmDriven: {
    top: 0,
    left: 24,
    marginTop:16,
    marginBottom:5,
  },
  oilChange: {
    top: 0,
    left: 25,
    marginTop:25,
  },
  lineView: {
    top: 0,
    left: 23,
    marginTop:5,
  },
  addRecordChild1: {
    top: 0,
    left: 23,
    
  },
  addRecordChild22: {
    top: 0,
    left: 12,
    marginTop:6,
    marginBottom:6,
  },
  addRecordChild2: {
    top: 0,
    left: 23,
    marginTop:-10,
  },
  addRecordChild3: {
    top: 0,
    left: 23,
  },
  jxc7789: {

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
    left: "89.20%",
    bottom: "66.63%",
    top: 0,
    marginTop:-35,
    marginBottom:5,
    width: 25,
    height: 25,
    maxWidth: "100%",
    position: "relative",
  },
  groupIcon: {
    height: 25,
    width: 25,
    top: 0,
    marginTop:-35,
    right: "6.95%",
    bottom: "60.6%",
    left: "88.99%",
    marginBottom:6,
  },
  date2SvgrepoCom11: {
    marginLeft: 178,
    top: 0,
    marginTop: -30,
    height: 25,
  },
  licensePlateNumberSvgrepoCIcon: {
    top: 0,
    marginTop: -40,
    marginLeft: 350,
    width: 40,
    height: 40,
    position: "relative",
    overflow: "hidden",
  },
  enterDetail: {
    left: 0,
    top: 0,
    paddingHorizontal: 20,
  },
  groupChild: {
    top: 0,
    left: 22,
    marginTop:10,
  },
  gallerySvgrepoCom1Icon: {
    left: 345,
    top: 0,
    marginTop:-30,
    position: "relative"
  },
  cameraSvgrepoCom61: {
    left: 310,
    top: 0,
    marginTop:-30,
    position: "relative"
  },
  enterDetailParent: {
    top: 0,
    width: 382,
    height: 35,
    left: 10,
    marginTop:25,
    position: "relative",
  },
  timeOclockSvgrepoCom1Icon: {
    left: 365,
    top: 0,
    height: 25,
    marginTop:-30,
  },
  groupItem: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  save: {
    top: 0,
    left: 171,
    
    color: Color.snow,
    marginTop:10,
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontWeight: "500",
    position: "relative",
  },
  vectorParent: {
    top: 695,
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
    height: "4.00%",
    width: "4.00%",
    top: -10,
    marginTop:-15,
    marginBottom:5,
    right: "7.67%",
    bottom: "55.39%",
    left: "89.80%",
  },
  addRecord: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    
    width: "100%",
    position: "relative",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default AddRecord;
import React, { useRef } from 'react';
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const VehicleCarousel = () => {
    const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const images = [
    require("../assets/pngwing-3.png"),
    require("../assets/pngwing-1.png"),
    require("../assets/pngwing-2.png"),
    require("../assets/pngegg-1.png"),
    null, 
  ];

  const imageTexts = [
    "Car",
    "Bike",
    "Truck",
    "Auto",
    "Other",
  ];

  const handleNextPress = () => {
    scrollViewRef.current.scrollTo({ x: 300, animated: true });
  };

  const handlePrevPress = () => {
    scrollViewRef.current.scrollTo({ x: 0, animated: true });
  };

// ... (previous imports and code) ...

return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePrevPress}>
        <Image source={require('../assets/left.png')} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        snapToInterval={100} // Width of each item + margin
        decelerationRate="fast"
      >
        {images.map((image, index) => (
          <TouchableOpacity
          key={index}
          onPress={() => {
            let vehicleType = '';
            switch (index) {
              case 0:
                vehicleType = 'Car';
                break;
              case 1:
                vehicleType = 'Bike';
                break;
              case 2:
                vehicleType = 'Bus';
                break;
              case 3:
                vehicleType = 'Auto';
                break;
              case 4:
                vehicleType = 'Other';
                break;
              default:
                break;
            }
            
            navigation.navigate('Vehicles', { type: vehicleType });
          }}
        >
            <LinearGradient
              style={styles.item}
              locations={[0, 1]}
              colors={["rgba(7, 132, 199, 0.5)", "rgba(217, 217, 217, 0)"]}
            >
              <Image
                source={image}
                style={[
                  styles.image,
                  (index === 1 || index === 3) && styles.smallImage,
                ]}
              />
              <Text style={[
                styles.imageText,
                (index === 1 || index === 3) && styles.imageText2,
              ]}>{imageTexts[index]}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handleNextPress}>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  // ... (remaining styles and export) ...
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigation: {
    width: 35,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color:'blue',
  },
  item: {
    width: 80,
    height: 104,
    borderRadius: 5,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  smallImage: {
    width: '60%', 
    height: '40%', 
  },
  imageText: {
    top: 4,
    fontSize: FontSize.size_sm,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsMedium,
    color: 'black',
    textAlign: 'center',
  },
  imageText2: {
    top:20,
   
    fontSize: FontSize.size_sm,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsMedium,
  },
});

export default VehicleCarousel;

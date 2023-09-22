import { React } from "react";
import {
  ImageBackground,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


const SaveButton = () => {
    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.saveButton} >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          </View>
    );

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
saveButton: {
    height: hp("5%"), // Adjust the height as needed
    width: wp("90.5%"), // Adjust the width as needed
    backgroundColor: "rgba(3, 29, 68, 1)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Center the button horizontally // Add some margin at the top for spacing
    position:"absolute", // Add border radius if needed // Add horizontal padding
},
  buttonText: {
    color: "white",
    fontSize: wp("4%"), // Adjust the font size as needed
  },
});

export default SaveButton;
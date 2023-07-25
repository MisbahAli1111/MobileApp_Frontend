const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import AddRecord from "./screens/AddRecord";
import MaintenanceDetailView from "./screens/MaintenanceDetailView";
import InvoiceDetailView from "./screens/InvoiceDetailView";
import AddEmployee from "./screens/AddEmployee";
import SwitchBusiness from "./screens/SwitchBusiness";
import SwitchBusiness1 from "./screens/SwitchBusiness1";
import SwitchBusiness2 from "./screens/SwitchBusiness2";
import BusinessInfo from "./screens/BusinessInfo";
import SwitchBusiness3 from "./screens/SwitchBusiness3";
import OwnerInfo from "./screens/OwnerInfo";
import CreateInvoice from "./screens/CreateInvoice";
import Invoices from "./screens/Invoices";
import MaintenanceRecord from "./screens/MaintenanceRecord";
import Vehicles from "./screens/Vehicles";
import AddVehicle from "./screens/AddVehicle";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    Inter_medium: require("./assets/fonts/Inter_medium.ttf"),
    Poppins_regular: require("./assets/fonts/Poppins_regular.ttf"),
    Poppins_medium: require("./assets/fonts/Poppins_medium.ttf"),
    Poppins_semibold: require("./assets/fonts/Poppins_semibold.ttf"),
    Poppins_bold: require("./assets/fonts/Poppins_bold.ttf"),
    Montserrat_regular: require("./assets/fonts/Montserrat_regular.ttf"),
    Montserrat_semibold: require("./assets/fonts/Montserrat_semibold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
           {/* <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
              name="AddRecord"
              component={AddRecord}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MaintenanceDetailView"
              component={MaintenanceDetailView}
              options={{ headerShown: false }}
        />*/}
              
               
            
            {/* <Stack.Screen
              name="AddEmployee"
              component={AddEmployee}
              options={{ headerShown: false }}
            />

            */}
                        {/* <Stack.Screen
              name="SwitchBusiness"
              component={SwitchBusiness}
              options={{ headerShown: false }}
            /> */}
            {/*
            <Stack.Screen
              name="SwitchBusiness1"
              component={SwitchBusiness1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SwitchBusiness2"
              component={SwitchBusiness2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BusinessInfo"
              component={BusinessInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SwitchBusiness3"
              component={SwitchBusiness3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OwnerInfo"
              component={OwnerInfo}
              options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
              name="Invoices"
              component={Invoices}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="CreateInvoice"
              component={CreateInvoice}
              options={{ headerShown: false }}
            /> 
            
            
            <Stack.Screen
              name="InvoiceDetailView"
              component={InvoiceDetailView}
              options={{ headerShown: false }}
            />     
             {/* <Stack.Screen
              name="MaintenanceRecord"
              component={MaintenanceRecord}
              options={{ headerShown: false }}
            /> */}
             {/*
            <Stack.Screen
              name="MaintenanceDetailView"
              component={MaintenanceDetailView}
              options={{ headerShown: false }}
            /> */}
            {/*<Stack.Screen
              name="Vehicles"
              component={Vehicles}
              options={{ headerShown: false }}
            /> 
             <Stack.Screen 
              name="AddVehicle"
              component={AddVehicle}
              options={{ headerShown: false }}
            />  */}
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;

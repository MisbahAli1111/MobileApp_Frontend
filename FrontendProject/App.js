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
import Login from "./screens/Login";
import VehicleDetails from  "./screens/VehiclesDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Header from "./components/Header";
import ChangePassword from "./screens/ChangePassword";
import EditProfile from "./screens/EditProfile";

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
          <Stack.Navigator  screenOptions={({ route, navigation }) => ({
        header: ({ previous }) => {
          
          const { title = route.name, showBackArrow = previous !== undefined,onBackPress = "Home", profileImage } = route.params;
      //     console.log("title:", title);
      // console.log("showBackArrow:", showBackArrow);
      // console.log("onBackPress:", onBackPress);
          return (
            <Header
              title={title}
              showBackArrow={showBackArrow}
               onBackPress={() => navigation.navigate(onBackPress)}
              profileImage={profileImage}
              
            />
            
          );
          
        },
      })}
      >
          {/* <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{
          title: 'Login', 
          // showBackArrow: true, 
          // profileImage: require('./assets/mask-group1.png'), 
          }}/> */}

          {/* <Stack.Screen
              name="Home"
              component={Home}
              initialParams={{
          title: 'Dashboard', 
          showBackArrow: false,
          profileImage: require('./assets/mask-group1.png'),
              }}
            />  */}

          <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          initialParams={{
          title: 'Edit Profile', 
          showBackArrow: true, 
          // profileImage: require('./assets/mask-group1.png'), 
          }}/>

          {/* 
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              initialParams={{
                title: '',
              showBackArrow: true,
              onBackPress:'Home',
              }}
            /> 

           <Stack.Screen
              name="AddRecord"
              component={AddRecord}
              initialParams={{
          title: 'Add Record', 
          showBackArrow: true, 
          onBackPress:'Vehicles',
          profileImage: require('./assets/mask-group1.png'),
              }}
            />

            <Stack.Screen
              name="MaintenanceDetailView"
              component={MaintenanceDetailView}
              initialParams={{
          title: 'Maintenance Record', 
          showBackArrow: true, 
          onBackPress:'Vehicles',
          profileImage: require('./assets/mask-group1.png'),
              }}
              /> 


            <Stack.Screen
              name="Invoices"
              component={Invoices}
              initialParams={{
          title: 'Invoices', 
          showBackArrow: true, 
          onBackPress:'Vehicles',
          profileImage: require('./assets/mask-group1.png'),
              }}
               
              />  
               
            
            <Stack.Screen
              name="AddEmployee"
              component={AddEmployee}
              initialParams={{
              title: ' ', 
              showBackArrow: true, 
              onBackPress:'Home',
              }}
            />

            
            <Stack.Screen
              name="SwitchBusiness"
              component={SwitchBusiness}
              initialParams={{
              title: ' ', 
              showBackArrow: true, 
              onBackPress:'Home',
              }}
            /> */}

            {/* Useless screens hain  */}

            {/* <Stack.Screen
              name="SwitchBusiness1"
              component={SwitchBusiness1}
            />
             <Stack.Screen
              name="SwitchBusiness3"
              component={SwitchBusiness3}
              options={{ headerShown: false }}
            /> 

            <Stack.Screen
              name="SwitchBusiness2"
              component={SwitchBusiness2}
              options={{ headerShown: false }}
            /> */}

            {/* Yaha tak useless hai  */}
            

            {/* <Stack.Screen
              name="BusinessInfo"
              component={BusinessInfo}
              initialParams={{
              title: '', 
              showBackArrow: true, 
              onBackPress:'Vehicles',
              }}
            /> */}

            
            
            <Stack.Screen
              name="OwnerInfo"
              component={OwnerInfo}
              initialParams={{
              title: '', 
              showBackArrow: true, 
              onBackPress:'Vehicles',
              }}
          /> 


            <Stack.Screen
                name="CreateInvoice"
                component={CreateInvoice}
                initialParams={{
                title: 'Create Invoice', 
                showBackArrow: true, 
                onBackPress:'Vehicles',
                profileImage: require('./assets/mask-group1.png'),
                }}
              /> 
            
            
            <Stack.Screen
              name="InvoiceDetailView"
              component={InvoiceDetailView}
              initialParams={{
                title: 'Invoice Detail', 
                showBackArrow: true, 
                onBackPress:'Vehicles',
                profileImage: require('./assets/mask-group1.png'),
                }}
            />
            
              <Stack.Screen
              name="MaintenanceRecord"
              component={MaintenanceRecord}
              initialParams={{
                title: 'Records', 
                showBackArrow: true, 
                onBackPress:'Vehicles',
                profileImage: require('./assets/mask-group1.png'),
                }}
            />  
             
           
            <Stack.Screen
              name="Vehicles"
              component={Vehicles}
              initialParams={{
                title: 'Vehicles', 
                showBackArrow: true, 
                onBackPress:'Vehicles',
                profileImage: require('./assets/mask-group1.png'),
                }}
            />  


             <Stack.Screen 
              name="AddVehicle"
              component={AddVehicle}
              initialParams={{
                title: 'Vehicles', 
                showBackArrow: true, 
                onBackPress:'Add Vehicles',
                profileImage: require('./assets/mask-group1.png'),
                }}
            />  



             <Stack.Screen 
              name="VehicleDetails"
              component={VehicleDetails}
              initialParams={{
                title: 'Vehicle Details', 
                showBackArrow: true, 
                onBackPress:'AddVehicle',
                profileImage: require('./assets/mask-group1.png'),
                }}
            />  
            
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;

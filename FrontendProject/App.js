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
import BusinessInfo from "./screens/BusinessInfo";
import OwnerInfo from "./screens/OwnerInfo";
import CreateInvoice from "./screens/CreateInvoice";
import Invoices from "./screens/Invoices";
import SalesReport from "./screens/SalesReport";
import MaintenanceRecord from "./screens/MaintenanceRecord";
import Vehicles from "./screens/Vehicles";
import AddVehicle from "./screens/AddVehicle";
import Login from "./screens/Login";
import VehicleDetails from "./screens/VehiclesDetails";
import ListRecords from "./screens/ListRecords";
import AddCustomer from "./screens/AddCustomer";
import CustomerDetails from "./screens/CustomerDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Header from "./components/Header";
import ChangePassword from "./screens/ChangePassword";
import EditProfile from "./screens/EditProfile";
import Config from "./screens/Config";
import { AppRegistry, LogBox } from "react-native";

// Ignore the specific warning
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
]);
LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop']);
LogBox.ignoreLogs([
  " Failed prop type: Invalid prop `transform` of type `string` supplied to `Text`, expected an array",
]);
LogBox.ignoreLogs(['Failed prop type: Invalid prop `value` of type `boolean` supplied to `TextInput`, expected `string`']);

// Register your app
AppRegistry.registerComponent("YourApp", () => YourAppComponent);

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
          <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
              header: ({ previous }) => {
                const {
                  title = route.name,
                  showBackArrow = previous !== undefined,
                  onBackPress = "Home",
                  profileImage = "No",
                } = route.params;

                return (
                  <Header
                    title={title}
                    showBackArrow={showBackArrow}
                    onBackPress={onBackPress}
                    profileImage={profileImage}
                  />
                );
              },
            })}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              initialParams={{
                title: "",
                profileImage: "No",
              }}
            />
            <Stack.Screen
              name="Config"
              component={Config}
              initialParams={{
                title: "",
                profileImage: "No",
              }}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              initialParams={{
                title: "Dashboard",
                showBackArrow: false,
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              initialParams={{
                title: "Edit Profile",
                showBackArrow: true,
                onBackPress: "SwitchBusiness",
                profileImage: "No",
              }}
            />

            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              initialParams={{
                title: "Change Password",
                showBackArrow: true,
                onBackPress: "SwitchBusiness",
                profileImage: "No",
              }}
            />

            <Stack.Screen
              name="AddRecord"
              component={AddRecord}
              initialParams={{
                title: "Add Record",
                showBackArrow: true,
                onBackPress: "MaintenanceRecord",
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="MaintenanceDetailView"
              component={MaintenanceDetailView}
              initialParams={{
                title: "Maintenance Record",
                showBackArrow: true,
                onBackPress: "MaintenanceRecord",
                profileImage: "Yes",
              }}
            />
            <Stack.Screen
              name="CustomerDetails"
              component={CustomerDetails}
              initialParams={{
                title: "Customer Details",
                showBackArrow: true,
                onBackPress: "Vehicles",
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="Invoices"
              component={Invoices}
              initialParams={{
                title: "Invoices",
                showBackArrow: true,
                onBackPress: "Home",
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="SalesReport"
              component={SalesReport}
              initialParams={{
                title: "Sales Report",
                showBackArrow: true,
                onBackPress: "Home",
              }}
            />

            <Stack.Screen
              name="AddEmployee"
              component={AddEmployee}
              initialParams={{
                title: "Add Employee",
                showBackArrow: true,
                onBackPress: "SwitchBusiness",
                profileImage: "No",
              }}
            />

            <Stack.Screen
              name="SwitchBusiness"
              component={SwitchBusiness}
              initialParams={{
                title: "Switch Business",
                showBackArrow: true,
                onBackPress: "Login",
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="BusinessInfo"
              component={BusinessInfo}
              initialParams={{
                title: "Business Info",
                showBackArrow: true,
                onBackPress: "SwitchBusiness",
                profileImage: "No",
              }}
            />

            <Stack.Screen
              name="OwnerInfo"
              component={OwnerInfo}
              initialParams={{
                title: "Owner Info",
                showBackArrow: true,
                onBackPress: "Login",
                profileImage: "No",
              }}
            />

            <Stack.Screen
              name="CreateInvoice"
              component={CreateInvoice}
              initialParams={{
                title: "Invoice",
                showBackArrow: true,
                onBackPress: "Invoices",
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="InvoiceDetailView"
              component={InvoiceDetailView}
              initialParams={{
                title: "Invoice Detail",
                showBackArrow: true,
                onBackPress: "Invoices",
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="MaintenanceRecord"
              component={MaintenanceRecord}
              initialParams={{
                title: "Records",
                showBackArrow: true,
                onBackPress: "Home",
                profileImage: "Yes",
              }}
            />
            <Stack.Screen
              name="ListRecords"
              component={ListRecords}
              initialParams={{
                title: "Records List",
                showBackArrow: true,
                onBackPress: "Home",
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="Vehicles"
              component={Vehicles}
              initialParams={{
                title: "Vehicles",
                showBackArrow: true,
                onBackPress: "Home",
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="AddVehicle"
              component={AddVehicle}
              initialParams={{
                title: "Vehicles",
                showBackArrow: true,
                onBackPress: "Vehicles",
                profileImage: "Yes",
              }}
            />

            <Stack.Screen
              name="AddCustomer"
              component={AddCustomer}
              initialParams={{
                title: "Add Customer",
                showBackArrow: true,
                onBackPress: "AddVehicle",
                profileImage: "No",
              }}
            />

            <Stack.Screen
              name="VehicleDetails"
              component={VehicleDetails}
              initialParams={{
                title: "Vehicle Details",
                showBackArrow: true,
                onBackPress: "Vehicles",
                profileImage: "Yes",
              }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
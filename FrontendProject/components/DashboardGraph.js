import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
const chartConfig = {
  backgroundGradientFrom: "#c5e9f7", // Use the steelblue_300 color for background
  backgroundGradientTo: "#c5e9f7", // Use the steelblue_300 color for background
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 40, ${opacity})`,
  propsForBackgroundLines: {
    translateX: 40,
  },
};



const DashboardGraph = (props) => {
  const [data,setData] = useState(['']);
  const isFocused = useIsFocused();
  // console.warn(data);
  // console.warn(props.RecordData);
    // setData(props.RecordData);
  // const data = [
  //   { timestamp: "M", value: 10 },
  //   { timestamp: "T", value: 20 },
  //   { timestamp: "W", value: 5 },
  //   { timestamp: "T", value: 25 },
  //   { timestamp: "F", value: 15 },
  //   { timestamp: "S", value: 30 },
  // ];
  useEffect(()=>{
    getData();
  },[isFocused]);
  
    getData = async () =>{
        const Business_id = await AsyncStorage.getItem("Business_id");
        let token = await AsyncStorage.getItem("accessToken");
        const accessToken = "Bearer " + token;
        const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");
    
    
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          
          url: `${apiServerUrl}/api/maintenance-record/get-month-record/${Business_id}`,
          headers: {
            'Authorization': accessToken
          }
        };
    
        axios.request(config)
          .then((response) => {
            // console.warn(JSON.stringify(response.data));
            // setRecordData(response.data);
            // console.warn(RecordData);
            
            const monthLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

            const graphData = response.data.map(([dayIndex, value]) => ({
              timestamp: dayLabels[dayIndex - 1], // Subtract 1 because the index starts from 1
              value: value,
            }));
            console.warn(graphData);
            setData(graphData);
            

          })
          .catch((error) => {
            console.log(error);
          });
    
      
    }

  return (
    <View style={styles.container}>

      <BarChart
        data={{
          labels: data.map((item) => item.timestamp),
          datasets: [
            {
              data: data.map((item) => item.value),
            },
          ],
        }}
        width={350}
        height={180}
        chartConfig={chartConfig}
        style={{
          borderRadius: 10,
          alignSelf: "center",
        }}
        fromZero
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  vehiclesText: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    marginBottom: "10%",
  },
});
export default DashboardGraph;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
const chartConfig = {
  backgroundGradientFrom: "#c5e9f7",
  backgroundGradientTo: "#c5e9f7", 
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 40, ${opacity})`,
  propsForBackgroundLines: {
    translateX: 40,
  },
};



const DashboardGraph = (props) => {
  const [data, setData] = useState(['']);

  useEffect(() => {
    getData();
  }, [props.searchOrder]); 
  const getData = async () => {

    const Business_id = await AsyncStorage.getItem('Business_id');
    const token = await AsyncStorage.getItem('accessToken');
    const apiServerUrl = await AsyncStorage.getItem('apiServerUrl');
    const accessToken = 'Bearer ' + token;

    const apiUrl = `${apiServerUrl}/api/maintenance-record/get-${props.searchOrder}-record/${Business_id}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: accessToken,
        },
      });

      const monthLabels = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en-US', { month: 'short' }));


      const graphData = response.data.map(([dayIndex, value]) => ({
        timestamp: monthLabels[dayIndex - 1],
        value: value,
      }));

      setData(graphData);
    } catch (error) {
      console.log(error);
    }
  };

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

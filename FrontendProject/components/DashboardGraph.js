import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";

const chartConfig = {
  backgroundGradientFrom: "#c5e9f7", // Use the steelblue_300 color for background
  backgroundGradientTo: "#c5e9f7", // Use the steelblue_300 color for background
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 40, ${opacity})`,
  propsForBackgroundLines: {
    translateX: 30,
  },
};

const DashboardGraph = () => {
  const data = [
    { timestamp: "M", value: 10 },
    { timestamp: "T", value: 20 },
    { timestamp: "W", value: 5 },
    { timestamp: "T", value: 25 },
    { timestamp: "F", value: 15 },
    { timestamp: "S", value: 30 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.vehiclesText}>Vehicles Maintained</Text>

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
    // height:"20%",
    width: "100%",
  },
  vehiclesText: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    top: 10,
    marginBottom: 10,
    left: 10,
  },
});
export default DashboardGraph;

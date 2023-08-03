import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const chartConfig = {
  backgroundGradientFrom: '#B2DEED', // Use the steelblue_300 color for background
  backgroundGradientTo: '#B2DEED',   // Use the steelblue_300 color for background
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
 

  
  
};

const DashboardGraph = () => {
  const data = [
    { timestamp: 'M', value: 10 },
    { timestamp: 'T', value: 20 },
    { timestamp: 'W', value: 5 },
    { timestamp: 'TH', value: 25 },
    { timestamp: 'F', value: 15 },
    { timestamp: 'S', value: 30 },
  ];

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
        width={387} // Decreased the width to make the chart smaller
        height={200}
        chartConfig={chartConfig}
        style={{
          borderRadius: 10,         // Set border radius to 10
          paddingLeft: -30,        // Move values on Y-axis more to the left
        }}
        fromZero

        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 4, 
  },
});

export default DashboardGraph;
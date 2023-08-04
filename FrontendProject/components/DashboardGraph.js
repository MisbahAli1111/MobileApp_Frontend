import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const chartConfig = {
  backgroundGradientFrom: '#c5e9f7', // Use the steelblue_300 color for background
  backgroundGradientTo: '#c5e9f7',   // Use the steelblue_300 color for background
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForBackgroundLines: {
    translateX: 30
  }
 

  
  
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
        width={350} // Decreased the width to make the chart smaller
        height={180}
        chartConfig={chartConfig}
        style={{
          borderRadius: 10, 
          alignSelf:"center"        // Set border radius to 10      // Move values on Y-axis more to the left
        }}
        fromZero


        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: -16, 
  },
  vehiclesText:{
    fontSize:20,
    top:6

  },
 
});
export default DashboardGraph;
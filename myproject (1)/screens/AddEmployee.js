import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const AddEmployee = () => {
  return (
    <View style={styles.addEmployee}>
      <Image
        style={[styles.lightTexture22341Icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <Text style={[styles.daviddaniel33outlookcom, styles.passwordTypo]}>
        daviddaniel33@outlook.com
      </Text>
      <Text style={[styles.name, styles.passwordTypo]}>Name</Text>
      <Text style={[styles.password, styles.passwordTypo]}>Password</Text>
      <Text style={[styles.confirmPassword, styles.passwordTypo]}>
        Confirm Password
      </Text>
      <Text style={[styles.cnicNumber, styles.passwordTypo]}>CNIC Number</Text>
      <Text style={[styles.text, styles.textPosition]}>+92 (345) 123-3234</Text>
      <Text style={styles.pk}>{`PK `}</Text>
      <Image
        style={styles.addEmployeeChild}
        contentFit="cover"
        source={require("../assets/vector-1.png")}
      />
      <Image
        style={[styles.addEmployeeItem, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.addEmployeeInner, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/line-2.png")}
      />
      <Image
        style={[styles.lineIcon, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/line-8.png")}
      />
      <Image
        style={[styles.addEmployeeChild1, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/line-9.png")}
      />
      <Image
        style={[styles.addEmployeeChild2, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/line-7.png")}
      />
      <Image
        style={[styles.addEmployeeChild3, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/line-3.png")}
      />
      <Text style={[styles.text1, styles.textPosition]}>
        +92 (345) 123-3234
      </Text>
      <Text style={styles.pk}>{`PK `}</Text>
      <Image
        style={styles.addEmployeeChild}
        contentFit="cover"
        source={require("../assets/vector-2.png")}
      />
      <Image
        style={[styles.addEmployeeChild3, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/line-3.png")}
      />
      <View style={[styles.groupParent, styles.groupLayout]}>
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/group-166.png")}
        />
        <Text style={[styles.register, styles.registerTypo]}>Register</Text>
      </View>
      <Text style={[styles.employeeInfo, styles.registerTypo]}>
        Employee Info
      </Text>
      <Image
        style={[styles.vectorIcon1, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vector6.png")}
      />
      <Image
        style={[styles.vectorIcon2, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vector7.png")}
      />
      <View style={styles.rectangleView} />
      <Image
        style={[styles.groupIcon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/group-26.png")}
      />
      <Image
        style={styles.addEmployeeChild5}
        contentFit="cover"
        source={require("../assets/group-10.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  passwordTypo: {
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  textPosition: {
    left: "16.98%",
    width: "40.93%",
    top: "35.52%",
    height: "2.9%",
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  addChildLayout: {
    left: "4.73%",
    right: "4.73%",
    width: "90.54%",
    height: "0.22%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupLayout: {
    height: 45,
    width: 391,
    position: "absolute",
  },
  registerTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  vectorIconPosition: {
    left: "85.58%",
    right: "9.07%",
    width: "5.35%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  lightTexture22341Icon: {
    top: 0,
    width: 430,
    height: 932,
  },
  daviddaniel33outlookcom: {
    width: "55.81%",
    top: "42.38%",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "4.65%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  name: {
    width: "13.02%",
    top: "21.67%",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "4.65%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  password: {
    width: "20.47%",
    top: "49.25%",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "4.65%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  confirmPassword: {
    width: "39.07%",
    top: "56.12%",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "4.65%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  cnicNumber: {
    width: "29.07%",
    top: "28.54%",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "4.65%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  text: {
    color: Color.dimgray_100,
  },
  pk: {
    width: "5.12%",
    color: Color.textTxtPrimary,
    top: "35.52%",
    height: "2.9%",
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "4.65%",
    position: "absolute",
  },
  addEmployeeChild: {
    height: "0.98%",
    width: "3.58%",
    top: "36.51%",
    right: "85.19%",
    bottom: "62.51%",
    left: "11.23%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  addEmployeeItem: {
    top: "26.12%",
    bottom: "73.66%",
  },
  addEmployeeInner: {
    top: "46.25%",
    bottom: "53.53%",
  },
  lineIcon: {
    top: "53.14%",
    bottom: "46.64%",
  },
  addEmployeeChild1: {
    top: "60.04%",
    bottom: "39.75%",
  },
  addEmployeeChild2: {
    top: "32.46%",
    bottom: "67.32%",
  },
  addEmployeeChild3: {
    top: "39.36%",
    bottom: "60.43%",
  },
  text1: {
    color: Color.darkslateblue,
  },
  groupChild: {
    left: 0,
    width: 391,
    top: 0,
  },
  register: {
    top: 11,
    left: 157,
    color: Color.white,
    width: 76,
    textAlign: "left",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  groupParent: {
    top: 845,
    left: 19,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  employeeInfo: {
    height: "3.54%",
    width: "37.21%",
    top: "14.27%",
    left: "31.4%",
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.darkslateblue,
  },
  vectorIcon1: {
    height: "1.82%",
    top: "50.11%",
    bottom: "48.07%",
  },
  vectorIcon2: {
    height: "1.93%",
    top: "56.97%",
    bottom: "41.09%",
  },
  rectangleView: {
    top: 917,
    left: 138,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
    position: "absolute",
  },
  groupIcon: {
    top: 44,
    height: 80,
  },
  addEmployeeChild5: {
    top: 3,
    left: 29,
    width: 372,
    height: 43,
    position: "absolute",
  },
  addEmployee: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 932,
  },
});

export default AddEmployee;

import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const FrameComponent = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.groupParent}>
      <View style={styles.rectangleParent}>
        <View style={styles.groupChild} />
        <Text style={[styles.logOut, styles.logOutPosition]}>Log Out</Text>
        <Text style={[styles.waleedAli, styles.logOutPosition]}>
          Waleed Ali
        </Text>
        <Text style={[styles.waleedaligmailcom, styles.logOutPosition]}>
          waleedali@gmail.com
        </Text>
        <View style={[styles.groupItem, styles.groupChildLayout]} />
        <View style={[styles.groupInner, styles.groupChildLayout]} />
        <View style={[styles.lineView, styles.groupChildLayout]} />
        <View style={[styles.groupChild1, styles.groupChildLayout]} />
        <View style={[styles.groupChild2, styles.groupChildLayout]} />
        <Pressable
          style={[styles.rectangleGroup, styles.rectangleGroupLayout]}
          onPress={() => navigation.navigate("AddEmployee")}
        >
          <View style={[styles.rectangleView, styles.rectangleGroupLayout]} />
          <Text style={[styles.addEmployee, styles.addEmployeePosition]}>
            Add Employee
          </Text>
        </Pressable>
        <Pressable
          style={[styles.rectangleContainer, styles.groupChild3Layout]}
          onPress={() => navigation.navigate("SwitchBusiness3")}
        >
          <View style={[styles.groupChild3, styles.groupChild3Layout]} />
          <Text style={[styles.switchBusiness, styles.addEmployeePosition]}>
            Switch Business
          </Text>
        </Pressable>
        <View style={[styles.changePasswordParent, styles.groupChild3Layout]}>
          <Text style={[styles.switchBusiness, styles.addEmployeePosition]}>
            Change Password
          </Text>
          <Pressable
            style={[styles.groupChild3, styles.groupChild3Layout]}
            onPress={() => navigation.navigate("OwnerInfo")}
          />
        </View>
        <Pressable
          style={[styles.groupPressable, styles.rectangleGroupLayout]}
          onPress={() => navigation.navigate("OwnerInfo")}
        >
          <View style={[styles.rectangleView, styles.rectangleGroupLayout]} />
          <Text style={[styles.editProfile, styles.addEmployeePosition]}>
            Edit Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logOutPosition: {
    color: Color.darkslateblue,
    left: 10,
    textAlign: "center",
    position: "absolute",
  },
  groupChildLayout: {
    height: 1,
    width: 153,
    borderTopWidth: 1,
    borderStyle: "solid",
    left: 0,
    position: "absolute",
  },
  rectangleGroupLayout: {
    height: 25,
    left: 0,
    position: "absolute",
    width: 152,
  },
  addEmployeePosition: {
    top: 4,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.caption2Regular_size,
    left: 10,
    position: "absolute",
  },
  groupChild3Layout: {
    height: 26,
    left: 0,
    position: "absolute",
    width: 152,
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.white,
    left: 0,
    position: "absolute",
    top: 0,
    height: 183,
    width: 152,
  },
  logOut: {
    top: 156,
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
    color: Color.darkslateblue,
    left: 10,
    fontSize: FontSize.caption2Regular_size,
  },
  waleedAli: {
    top: 10,
    fontSize: FontSize.size_sm,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    textAlign: "center",
    color: Color.darkslateblue,
    left: 10,
  },
  waleedaligmailcom: {
    top: 29,
    fontSize: 10,
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
    color: Color.darkslateblue,
    left: 10,
  },
  groupItem: {
    borderColor: "rgba(217, 217, 217, 0.5)",
    width: 153,
    borderTopWidth: 1,
    borderStyle: "solid",
    top: 126,
  },
  groupInner: {
    top: 100,
    borderColor: "rgba(217, 217, 217, 0.5)",
    width: 153,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  lineView: {
    top: 74,
    borderColor: "rgba(217, 217, 217, 0.5)",
    width: 153,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  groupChild1: {
    top: 152,
    borderColor: "rgba(217, 217, 217, 0.5)",
    width: 153,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  groupChild2: {
    top: 48,
    borderColor: "#665d5d",
    width: 153,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  rectangleView: {
    top: 0,
  },
  addEmployee: {
    width: 87,
    height: 17,
    textAlign: "center",
  },
  rectangleGroup: {
    top: 74,
  },
  groupChild3: {
    top: 0,
  },
  switchBusiness: {
    textAlign: "center",
  },
  rectangleContainer: {
    top: 126,
  },
  changePasswordParent: {
    top: 100,
  },
  editProfile: {
    textAlign: "left",
  },
  groupPressable: {
    top: 49,
  },
  rectangleParent: {
    height: 183,
    width: 152,
  },
  groupParent: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: 152,
  },
});

export default FrameComponent;

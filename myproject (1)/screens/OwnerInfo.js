import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const OwnerInfo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.ownerInfo}>
      <Image
        style={[styles.lightTexture22341Icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <Text style={[styles.davidDaniel, styles.registerTypo1]}>
        David Daniel
      </Text>
      <Text style={[styles.daviddaniel33outlookcom, styles.david1Typo]}>
        daviddaniel33@outlook.com
      </Text>
      <Text style={[styles.david, styles.textTypo]}>1234david</Text>
      <Text style={[styles.david1, styles.david1Typo]}>1234david</Text>
      <Text style={[styles.text, styles.textTypo]}>0000-1234-4567-8912</Text>
      <Image
        style={[styles.ownerInfoChild, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-12.png")}
      />
      <Image
        style={[styles.ownerInfoItem, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-22.png")}
      />
      <Image
        style={[styles.ownerInfoInner, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-81.png")}
      />
      <Image
        style={[styles.lineIcon, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-91.png")}
      />
      <Image
        style={[styles.ownerInfoChild1, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-72.png")}
      />
      <Image
        style={[styles.ownerInfoChild2, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-32.png")}
      />
      <Text style={[styles.text1, styles.textPosition]}>
        +92 (345) 123-3234
      </Text>
      <Text style={[styles.pk, styles.pkPosition]}>{`PK `}</Text>
      <Image
        style={[styles.vectorIcon, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector-12.png")}
      />
      <Text style={[styles.text2, styles.textPosition]}>
        +92 (345) 123-3234
      </Text>
      <Text style={[styles.pk1, styles.pkPosition]}>{`PK `}</Text>
      <Image
        style={[styles.ownerInfoChild3, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector-22.png")}
      />
      <Image
        style={[styles.ownerInfoChild2, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-32.png")}
      />
      <Text style={[styles.ownerInfo1, styles.registerTypo]}>Owner Info</Text>
      <Text
        style={[styles.letsRegister, styles.letsPosition]}
      >{`Let’s Register `}</Text>
      <Text style={[styles.letsLevelUp, styles.letsPosition]}>
        Let’s level up your business, together.
      </Text>
      <Image
        style={[styles.vectorIcon1, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vector9.png")}
      />
      <Image
        style={[styles.vectorIcon2, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vector10.png")}
      />
      <View style={styles.rectangleView} />
      <Image
        style={[styles.groupIcon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/group-261.png")}
      />
      <Pressable
        style={[styles.groupParent, styles.groupLayout]}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/group-166.png")}
        />
        <Text style={[styles.register, styles.registerTypo]}>Register</Text>
      </Pressable>
      <Image
        style={[styles.atSign1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/atsign-1.png")}
      />
      <Image
        style={[styles.phone1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/phone-1.png")}
      />
      <Image
        style={[styles.key1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/key-1.png")}
      />
      <Image
        style={[styles.user1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/user-1.png")}
      />
      <Image
        style={styles.ownerInfoChild5}
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
  registerTypo1: {
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  david1Typo: {
    height: "3%",
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "12.79%",
    position: "absolute",
  },
  textTypo: {
    height: "2.9%",
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "12.79%",
    position: "absolute",
  },
  ownerChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    right: "4.65%",
    width: "90.7%",
    height: "0.22%",
    left: "4.65%",
    position: "absolute",
    overflow: "hidden",
  },
  textPosition: {
    left: "25.12%",
    top: "48.82%",
    width: "41.16%",
    height: "3%",
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  pkPosition: {
    width: "5.12%",
    top: "48.82%",
    height: "3%",
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "12.79%",
    position: "absolute",
  },
  vectorIconLayout: {
    bottom: "49.21%",
    top: "49.81%",
    width: "3.81%",
    height: "0.98%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  registerTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  letsPosition: {
    left: "4.65%",
    textAlign: "left",
    color: Color.darkslateblue,
    position: "absolute",
  },
  vectorIconPosition: {
    left: "85.35%",
    right: "9.07%",
    width: "5.58%",
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
  iconLayout: {
    height: 20,
    width: 20,
    left: 20,
    position: "absolute",
    overflow: "hidden",
  },
  lightTexture22341Icon: {
    top: 0,
    width: 430,
    height: 932,
  },
  davidDaniel: {
    width: "30%",
    top: "35.3%",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "12.79%",
    textAlign: "left",
    position: "absolute",
  },
  daviddaniel33outlookcom: {
    width: "55.81%",
    top: "55.69%",
  },
  david: {
    width: "20.7%",
    top: "62.88%",
  },
  david1: {
    width: "38.84%",
    top: "69.53%",
  },
  text: {
    width: "63.95%",
    top: "42.17%",
  },
  ownerInfoChild: {
    top: "39.48%",
    bottom: "60.3%",
  },
  ownerInfoItem: {
    top: "59.64%",
    bottom: "40.14%",
  },
  ownerInfoInner: {
    top: "66.55%",
    bottom: "33.23%",
  },
  lineIcon: {
    top: "73.46%",
    bottom: "26.33%",
  },
  ownerInfoChild1: {
    top: "45.83%",
    bottom: "53.95%",
  },
  ownerInfoChild2: {
    top: "52.74%",
    bottom: "47.05%",
  },
  text1: {
    color: "#0096c7",
  },
  pk: {
    color: Color.textTxtPrimary,
  },
  vectorIcon: {
    right: "77.05%",
    left: "19.14%",
  },
  text2: {
    color: Color.darkslateblue,
  },
  pk1: {
    color: Color.darkslateblue,
  },
  ownerInfoChild3: {
    right: "76.82%",
    left: "19.37%",
  },
  ownerInfo1: {
    height: "3.54%",
    width: "37.21%",
    top: "30.15%",
    left: "31.4%",
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.darkslateblue,
  },
  letsRegister: {
    top: "14.27%",
    fontSize: FontSize.size_8xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
  },
  letsLevelUp: {
    height: "2.58%",
    width: "68.6%",
    top: "18.99%",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "4.65%",
  },
  vectorIcon1: {
    height: "1.82%",
    top: "63.52%",
    bottom: "34.66%",
  },
  vectorIcon2: {
    height: "1.93%",
    top: "70.39%",
    bottom: "27.68%",
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
  groupChild: {
    left: 0,
    width: 391,
    top: 0,
  },
  register: {
    top: 11,
    left: 157,
    color: "#fffdfd",
    width: 76,
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  groupParent: {
    top: 845,
    left: 19,
  },
  atSign1Icon: {
    top: 524,
  },
  phone1Icon: {
    top: 455,
  },
  key1Icon: {
    top: 591,
  },
  user1Icon: {
    top: 333,
  },
  ownerInfoChild5: {
    top: 3,
    left: 29,
    width: 372,
    height: 43,
    position: "absolute",
  },
  ownerInfo: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 932,
  },
});

export default OwnerInfo;

import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const SwitchBusiness1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.switchBusiness}>
      <Image
        style={[
          styles.lightTexture22341Icon,
          styles.switchBusinessItemPosition,
        ]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <Text style={[styles.switchBusiness1, styles.businessFlexBox]}>
        Switch Business
      </Text>
      <Image
        style={[styles.switchBusinessInner, styles.groupInnerLayout]}
        contentFit="cover"
        source={require("../assets/rectangle-69.png")}
      />
      <Text style={[styles.abcBusiness, styles.businessFlexBox]}>
        ABC Business
      </Text>
      <Text style={[styles.signedIn, styles.signedInTypo]}>Signed in</Text>
      <Image
        style={styles.checkCircleSvgrepoCom1Icon}
        contentFit="cover"
        source={require("../assets/checkcirclesvgrepocom-1.png")}
      />
      <Pressable
        style={[styles.groupPressable, styles.groupInnerLayout]}
        onPress={() => navigation.navigate("SwitchBusiness3")}
      >
        <View style={[styles.vectorParent, styles.groupInnerLayout]}>
          <Image
            style={[styles.groupChild, styles.groupInnerLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-691.png")}
          />
          <View style={[styles.abcBusinessParent, styles.abcParentPosition]}>
            <Text style={[styles.abcBusiness1, styles.signedInTypo]}>
              ABC Business
            </Text>
            <Text
              style={[styles.lastSignedIn, styles.lastSignedInFlexBox]}
            >{`Last Signed in 2 hours ago `}</Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        style={[styles.switchBusinessInner1, styles.groupInnerLayout]}
        onPress={() => navigation.navigate("SwitchBusiness")}
      >
        <View style={[styles.vectorParent, styles.groupInnerLayout]}>
          <Image
            style={[styles.groupChild, styles.groupInnerLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-691.png")}
          />
          <View style={[styles.abcBusinessGroup, styles.abcParentPosition]}>
            <Text style={[styles.abcBusiness1, styles.signedInTypo]}>
              ABC Business
            </Text>
            <Text style={[styles.lastSignedIn1, styles.lastTypo]}>
              Last Signed in 2 days ago
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        style={[styles.switchBusinessInner2, styles.groupInnerLayout]}
        onPress={() => navigation.navigate("SwitchBusiness2")}
      >
        <View style={[styles.vectorParent, styles.groupInnerLayout]}>
          <Image
            style={[styles.groupChild, styles.groupInnerLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-691.png")}
          />
          <View
            style={[
              styles.lastSignedInMoreThanAWeeParent,
              styles.abcParentPosition,
            ]}
          >
            <Text style={[styles.lastSignedIn2, styles.lastTypo]}>
              Last Signed in more than a week ago
            </Text>
            <Text style={[styles.abcBusiness1, styles.signedInTypo]}>
              ABC Business
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        style={[styles.vectorParent1, styles.vectorParent1Layout]}
        onPress={() => navigation.navigate("BusinessInfo")}
      >
        <Image
          style={[styles.rectangleIcon, styles.vectorParent1Layout]}
          contentFit="cover"
          source={require("../assets/rectangle-731.png")}
        />
        <Text style={[styles.createNewBusiness, styles.lastSignedInFlexBox]}>
          Create New Business
        </Text>
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  switchBusinessItemPosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  businessFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  groupInnerLayout: {
    height: 65,
    width: 393,
    position: "absolute",
  },
  signedInTypo: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "center",
    position: "absolute",
  },
  abcParentPosition: {
    left: "2.8%",
    bottom: "15.38%",
    top: "15.38%",
    height: "69.23%",
    position: "absolute",
  },
  lastSignedInFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  lastTypo: {
    top: "53.33%",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    color: Color.darkslateblue,
  },
  vectorParent1Layout: {
    height: 45,
    width: 393,
    position: "absolute",
  },
  lightTexture22341Icon: {
    top: 0,
    width: 430,
    height: 932,
  },
  switchBusiness1: {
    top: "14.27%",
    left: "29.53%",
    fontSize: FontSize.size_3xl,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  switchBusinessChild: {
    top: 917,
    left: 138,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
    position: "absolute",
  },
  switchBusinessItem: {
    top: 44,
    height: 80,
  },
  switchBusinessInner: {
    top: 356,
    borderRadius: Border.br_3xs,
    width: 393,
    left: 18,
  },
  abcBusiness: {
    top: "39.27%",
    left: "6.05%",
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.aliceblue_200,
    fontSize: FontSize.size_base,
  },
  signedIn: {
    top: "41.85%",
    left: "6.74%",
    color: Color.gray_100,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
  },
  checkCircleSvgrepoCom1Icon: {
    top: 372,
    left: 360,
    width: 33,
    height: 33,
    position: "absolute",
    overflow: "hidden",
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    width: 393,
    left: 0,
    top: 0,
  },
  abcBusiness1: {
    top: "0%",
    left: "0%",
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
  },
  lastSignedIn: {
    top: "53.33%",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    color: Color.darkslateblue,
    left: "0%",
  },
  abcBusinessParent: {
    width: "46.56%",
    right: "50.64%",
  },
  vectorParent: {
    left: 0,
    top: 0,
  },
  groupPressable: {
    top: 186,
    left: 18,
  },
  lastSignedIn1: {
    left: "0%",
    textAlign: "center",
    position: "absolute",
  },
  abcBusinessGroup: {
    width: "45.29%",
    right: "51.91%",
  },
  switchBusinessInner1: {
    top: 271,
    left: 18,
  },
  lastSignedIn2: {
    left: "0.39%",
    textAlign: "center",
    position: "absolute",
  },
  lastSignedInMoreThanAWeeParent: {
    width: "65.9%",
    right: "31.3%",
  },
  switchBusinessInner2: {
    top: 441,
    left: 18,
  },
  rectangleIcon: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  createNewBusiness: {
    top: 10,
    left: 113,
    color: Color.white,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  vectorParent1: {
    top: 845,
    left: 19,
  },
  groupIcon: {
    top: 3,
    left: 29,
    width: 372,
    height: 43,
    position: "absolute",
  },
  switchBusiness: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 932,
  },
});

export default SwitchBusiness1;

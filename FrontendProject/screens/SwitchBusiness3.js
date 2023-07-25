import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const SwitchBusiness3 = () => {
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
      <Text style={[styles.switchBusiness1, styles.lastFlexBox]}>
        Switch Business
      </Text>
      <View style={styles.switchBusinessChild} />
      <Image
        style={[styles.switchBusinessItem, styles.switchBusinessItemPosition]}
        contentFit="cover"
        source={require("../assets/group-261.png")}
      />
      <Image
        style={[styles.switchBusinessInner, styles.groupLayout]}
        contentFit="cover"
        source={require("../assets/rectangle-69.png")}
      />
      <Text style={styles.abcBusiness}>ABC Business</Text>
      <Text style={[styles.signedIn, styles.signedInTypo]}>Signed in</Text>
      <Image
        style={styles.checkCircleSvgrepoCom1Icon}
        contentFit="cover"
        source={require("../assets/checkcirclesvgrepocom-11.png")}
      />
      <Image
        style={[styles.rectangleIcon, styles.groupLayout]}
        contentFit="cover"
        source={require("../assets/rectangle-691.png")}
      />
      <View style={styles.abcBusinessParent}>
        <Text style={[styles.abcBusiness1, styles.signedInTypo]}>
          ABC Business
        </Text>
        <Text
          style={[styles.lastSignedIn, styles.lastSignedInFlexBox]}
        >{`Last Signed in 2 hours ago `}</Text>
      </View>
      <View style={[styles.vectorParent, styles.groupLayout]}>
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-691.png")}
        />
        <View
          style={[styles.abcBusinessGroup, styles.abcBusinessGroupPosition]}
        >
          <Text style={[styles.abcBusiness1, styles.signedInTypo]}>
            ABC Business
          </Text>
          <Text style={[styles.lastSignedIn1, styles.lastTypo]}>
            Last Signed in 2 days ago
          </Text>
        </View>
      </View>
      <Pressable
        style={[styles.groupPressable, styles.groupLayout]}
        onPress={() => navigation.navigate("SwitchBusiness2")}
      >
        <View style={[styles.vectorGroup, styles.groupLayout]}>
          <Image
            style={[styles.groupChild, styles.groupLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-691.png")}
          />
          <View
            style={[
              styles.lastSignedInMoreThanAWeeParent,
              styles.abcBusinessGroupPosition,
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
        style={[styles.vectorContainer, styles.groupInnerLayout]}
        onPress={() => navigation.navigate("BusinessInfo")}
      >
        <Image
          style={[styles.groupInner, styles.groupInnerLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-731.png")}
        />
        <Text style={[styles.createNewBusiness, styles.lastSignedInFlexBox]}>
          Create New Business
        </Text>
      </Pressable>
      <Image
        style={styles.groupIcon}
        contentFit="cover"
        source={require("../assets/group-103.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchBusinessItemPosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  lastFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  groupLayout: {
    height: 65,
    width: 393,
    position: "absolute",
  },
  signedInTypo: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "center",
    position: "absolute",
  },
  lastSignedInFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  abcBusinessGroupPosition: {
    left: "2.8%",
    bottom: "15.38%",
    top: "15.38%",
    height: "69.23%",
    position: "absolute",
  },
  lastTypo: {
    top: "53.33%",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    color: Color.darkslateblue,
  },
  groupInnerLayout: {
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
    top: 186,
    borderRadius: Border.br_3xs,
    width: 393,
    left: 18,
  },
  abcBusiness: {
    top: "21.03%",
    left: "6.05%",
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.gray_100,
    fontSize: FontSize.size_base,
    textAlign: "center",
    position: "absolute",
  },
  signedIn: {
    top: "23.61%",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    left: "6.74%",
    color: Color.gray_100,
  },
  checkCircleSvgrepoCom1Icon: {
    top: 202,
    left: 360,
    width: 33,
    height: 33,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleIcon: {
    top: 271,
    borderRadius: Border.br_3xs,
    width: 393,
    left: 18,
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
    height: "4.83%",
    width: "42.56%",
    top: "30.15%",
    right: "50.7%",
    bottom: "65.02%",
    left: "6.74%",
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    width: 393,
    left: 0,
    top: 0,
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
  vectorParent: {
    top: 356,
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
  vectorGroup: {
    left: 0,
    top: 0,
  },
  groupPressable: {
    top: 441,
    left: 18,
  },
  groupInner: {
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
  vectorContainer: {
    top: 845,
    left: 18,
  },
  groupIcon: {
    top: 3,
    left: 30,
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

export default SwitchBusiness3;

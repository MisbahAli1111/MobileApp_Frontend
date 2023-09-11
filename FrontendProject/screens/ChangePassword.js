import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Config from "./Config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const navigation = useNavigation();


  const toggleShowPassword = (field) => {
    if (field === "currentPassword") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirmNewPassword") {
      setShowConfirmNewPassword(!showConfirmNewPassword);
    }
  };

  const renderPasswordInput = (field, placeholder, value, showPassword) => {
    return (
      <View style={styles.inputContainer}>
        <View
          style={[styles.inputWrapper, errors[field] && styles.errorBorder]}
        >
          <TextInput
            style={[styles.input, showPassword && styles.inputShowPassword]}
            placeholder={`Enter ${placeholder}`}
            secureTextEntry={!showPassword}
            value={value}
            onChangeText={(text) => handleFieldChange(field, text)}
          />
          <TouchableOpacity
            style={styles.showHideButton}
            onPress={() => toggleShowPassword(field)}
          >
            <Text style={styles.showHideText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        {errors[field] && (
          <Text style={styles.errorText}>This field should be filled</Text>
        )}
      </View>
    );
  };

  const handleFieldChange = (field, value) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: false });
    }
    if (field === "currentPassword") {
      setCurrentPassword(value);
    } else if (field === "newPassword") {
      setNewPassword(value);
    } else if (field === "confirmNewPassword") {
      setConfirmNewPassword(value);
    }
  };

  const handleChangePassword = async () => {
    let hasErrors = false;
    const newErrors = { ...errors };

    if (currentPassword === "") {
      newErrors.currentPassword = true;
      hasErrors = true;
    } else {
      newErrors.currentPassword = false;
    }

    if (newPassword === "") {
      newErrors.newPassword = true;
      hasErrors = true;
    } else {
      newErrors.newPassword = false;
    }

    if (confirmNewPassword === "") {
      newErrors.confirmNewPassword = true;
      hasErrors = true;
    } else {
      newErrors.confirmNewPassword = false;
    }

    if (!hasErrors) {
      const userId = await AsyncStorage.getItem("userId");

      let data = JSON.stringify({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${Config.apiServerUrl}/api/users/update-password/${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (!isPasswordValid(newPassword)) {
      setErrorMessage(
        "Password must be between 8 and 15 characters and contain at least one uppercase letter, one number, and one special character(@$!%*?&)."
      );
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      return;
    }

    if (
      currentPassword === "currentPassword123" &&
      newPassword === confirmNewPassword
    ) {
      setSuccessMessage("Password changed successfully.");
      setErrorMessage("");

      setTimeout(() => {
        setSuccessMessage("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setErrors({
          currentPassword: false,
          newPassword: false,
          confirmNewPassword: false,
        });
      }, 2000);
    } else if (newPassword !== confirmNewPassword) {
      setErrorMessage("New Passwords Should be same.");
      setSuccessMessage("");
    } else {
      setErrorMessage("Current Password is incorrect");
      setSuccessMessage("");
    }
  };

  const isPasswordValid = (password) => {
    const passwordPattern =
      /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/;
    return passwordPattern.test(password);
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/light-texture2234-1.png")}
    >
      {/* <Text style={styles.title}>Change Password</Text> */}
      {renderPasswordInput(
        "currentPassword",
        "Current Password",
        currentPassword,
        showCurrentPassword
      )}
      {renderPasswordInput(
        "newPassword",
        "New Password",
        newPassword,
        showNewPassword
      )}
      {renderPasswordInput(
        "confirmNewPassword",
        "Confirm New Password",
        confirmNewPassword,
        showConfirmNewPassword
      )}
      <Text style={[styles.message, { color: "green" }]}>{successMessage}</Text>
      <Text style={[styles.message, { color: "red" }]}>{errorMessage}</Text>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "rgba(3, 29, 68, 1)",
  },
  inputContainer: {
    marginBottom: 20,
    width: "80%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "rgba(203, 203, 203, 1)",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  inputShowPassword: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  showHideButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  showHideText: {
    color: "rgba(3, 29, 68, 1)",
  },
  button: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 10,
    marginTop: -10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  message: {
    textAlign: "center",
    marginBottom: 10,
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default ChangePassword;

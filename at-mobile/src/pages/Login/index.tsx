import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import { auth } from "../../infra/firebase";
import styles from './styles'; 
import { useNavigation } from '@react-navigation/native'; 
import { DrawerNavigationProp } from '@react-navigation/drawer'; 
import { RootDrawerParamList } from "../../routes/navigation";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>("");

  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList, 'Register'>>();

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      Alert.alert("Success", "User logged in successfully");
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        Alert.alert("Error", error.message);
      } else {
        console.log("An unknown error occurred");
        Alert.alert("Error", "An unknown error occurred");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Alert.alert("Error", "Please enter your email address to reset your password");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert("Success", "Password reset email sent!");
      setModalVisible(false); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        Alert.alert("Error", error.message);
      } else {
        console.log("An unknown error occurred");
        Alert.alert("Error", "An unknown error occurred");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPasswordText}>
        New user? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Register Here</Text>
      </Text>

      <Text style={styles.forgotPasswordText}>
        Forgot your password?{" "}
        <Text style={styles.link} onPress={() => setModalVisible(true)}>Reset Here</Text>
      </Text>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Enter your email"
              value={resetEmail}
              onChangeText={(text) => setResetEmail(text)}
            />

            <TouchableOpacity onPress={handleForgotPassword} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Send Reset Email</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import { auth } from "../../infra/firebase";
import styles from './styles'; 
import { useNavigation } from '@react-navigation/native'; 
import { DrawerNavigationProp } from '@react-navigation/drawer'; 
import { RootDrawerParamList } from "../../routes/navigation";
import { useTheme } from 'react-native-paper';

const Login: React.FC = () => {
  const theme = useTheme();

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
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Endereço de e-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="digite seu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPasswordText}>
        Novo por aqui? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Cadastre-se aqui</Text>
      </Text>

      <Text style={styles.forgotPasswordText}>
        Esqueceu a senha?{" "}
        <Text style={styles.link} onPress={() => setModalVisible(true)}>Reset aqui</Text>
      </Text>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Esqueci minha senha</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Enter your email"
              value={resetEmail}
              onChangeText={(text) => setResetEmail(text)}
            />

            <TouchableOpacity onPress={handleForgotPassword} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Enviar E-mail</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;
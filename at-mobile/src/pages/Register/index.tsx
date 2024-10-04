import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { auth, db } from "../../infra/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native'; 
import styles from './styles'; 
import { DrawerNavigationProp } from '@react-navigation/drawer'; 
import { RootDrawerParamList } from "../../routes/navigation";
import { useTheme } from 'react-native-paper';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");

  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList, 'Login'>>();

  const theme = useTheme();


  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: ""
        });
      }
      console.log("usuário registrado!");
      Alert.alert("Usuário registrado!!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        Alert.alert("Erro", error.message);
      } else {
        console.log("um erro inesperado aconteceu");
        Alert.alert("um erro inesperado aconteceu");
      }
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={styles.title}>Cadastre-se</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={setFname}
          value={fname}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          onChangeText={setLname}
          value={lname}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Endereço de e-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="senha"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPasswordText}>
      Já tem conta? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login</Text>
      </Text>
    </View>
  );
};

export default Register;
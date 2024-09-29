import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { auth, db } from "../../infra/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native'; 
import styles from './styles'; 
import { DrawerNavigationProp } from '@react-navigation/drawer'; 
import { RootDrawerParamList } from "../../routes/navigation";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");

  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList, 'Login'>>();


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
      console.log("User Registered Successfully!!");
      Alert.alert("Success", "User Registered Successfully!!");
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
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder="First name"
          onChangeText={setFname}
          value={fname}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last name"
          onChangeText={setLname}
          value={lname}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPasswordText}>
      Já tem conta? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login</Text>
      </Text>
    </View>
  );
};

export default Register;
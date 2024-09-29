import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { auth } from "../../infra/firebase";
import styles from './styles'; 
import { useNavigation } from '@react-navigation/native'; 
import { DrawerNavigationProp } from '@react-navigation/drawer'; 
import { RootDrawerParamList } from "../../routes/navigation";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

     
    </View>
  );
};

export default Login;
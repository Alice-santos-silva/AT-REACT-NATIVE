import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { auth, db } from '../../infra/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenNavigationProp } from '../../routes/navigation'; 
import { useTheme } from 'react-native-paper';

interface UserDetails {
  email: string;
  firstName: string;
  lastName?: string;
  photo?: string;
}

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<ProfileScreenNavigationProp['navigation']>(); 

  const theme = useTheme();


  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data() as UserDetails);
        } else {
          console.log("Usuário não está logado");
        }
        setLoading(false);
      } else {
        navigation.navigate('Login'); 
      }
    } catch (error) {
      console.error("Erro:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ec407a" style={styles.loading} />;
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {userDetails ? (
        <>
          <Text style={styles.welcomeText}>Bem-vindo, {userDetails.firstName} !!</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Email: {userDetails.email}</Text>
            <Text style={styles.infoText}>Nome: {userDetails.firstName}</Text>
          </View>
          <Button title="Logout" onPress={handleLogout} color="#ec407a" />
        </>
      ) : (
        <Text>Não há informações sobre o usuário</Text>
      )}
    </View>
  );
};

export default Profile;
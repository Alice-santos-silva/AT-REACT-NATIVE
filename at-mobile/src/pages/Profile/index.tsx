import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator } from 'react-native';
import { auth, db } from '../../infra/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenNavigationProp } from '../../routes/navigation'; 

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

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data() as UserDetails);
        } else {
          console.log("User is not logged in");
        }
        setLoading(false);
      } else {
        navigation.navigate('Login'); 
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ec407a" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      {userDetails ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: userDetails.photo || 'https://via.placeholder.com/150' }}
              style={styles.image}
            />
          </View>
          <Text style={styles.welcomeText}>Welcome {userDetails.firstName} 🙏🙏</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Email: {userDetails.email}</Text>
            <Text style={styles.infoText}>First Name: {userDetails.firstName}</Text>
          </View>
          <Button title="Logout" onPress={handleLogout} color="#ec407a" />
        </>
      ) : (
        <Text>No user details available.</Text>
      )}
    </View>
  );
};

export default Profile;
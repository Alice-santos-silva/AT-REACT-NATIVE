import React from 'react';
import { View, FlatList, Image, Alert, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useTheme } from 'react-native-paper';
import { db } from '../../infra/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface MyGalleryProps {
  photos: string[]; 
}

const MyGallery: React.FC<MyGalleryProps> = ({ photos }) => {
  const theme = useTheme();

  const saveToFirestore = async (photoUrl: string) => {
    try {
      await addDoc(collection(db, 'photos'), { url: photoUrl });
      Alert.alert('Foto salva no firestore!');
    } catch (error) {
      console.error('Erro: ', error);
      Alert.alert('Error', 'Falha ao salvar.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image source={{ uri: item }} style={styles.photo} />
            <TouchableOpacity onPress={() => saveToFirestore(item)}>
              <MaterialCommunityIcons name="cloud-upload" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
      />
    </View>
  );
};

export default MyGallery;

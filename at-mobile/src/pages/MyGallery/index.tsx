import React from 'react';
import { View, FlatList, Image } from 'react-native';
import styles from './styles';


interface MyGalleryProps {
  photos: string[]; 
}

const MyGallery: React.FC<MyGalleryProps> = ({ photos }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.photo} />
        )}
        numColumns={3}
      />
    </View>
  );
};

export default MyGallery;

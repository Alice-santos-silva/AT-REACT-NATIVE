import React from 'react';
import { View, FlatList, Image } from 'react-native';
import styles from './styles';
import { useTheme } from 'react-native-paper';


interface MyGalleryProps {
  photos: string[]; 
}

const MyGallery: React.FC<MyGalleryProps> = ({ photos }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
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

import React, { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

interface MyCameraProps {
  addPhoto: (uri: string) => void; 
}

const MyCamera: React.FC<MyCameraProps> = ({ addPhoto }) => {
  const camRef = useRef<any>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos de permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (camRef.current) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);

      addPhoto(data.uri);
      alert("foto salva na galeria!")
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camRef}>
        <View style={styles.contentButton}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <FontAwesome name="exchange" size={23} color="#f06292" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
            <FontAwesome name="camera" size={23} color="#f06292" />
          </TouchableOpacity>
        </View>
      </CameraView>
     
    </View>
  );
};

export default MyCamera;

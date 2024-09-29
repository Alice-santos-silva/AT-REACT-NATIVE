import React, { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

const MyCamera: React.FC = () => {
  const camRef = useRef<any>(null); 
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null); 
  const [open, setOpen] = useState<boolean>(false)

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
      setOpen(true)
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
      {capturedPhoto &&
        <Modal
        animationType='slide'
        transparent={true}
        visible={open}>
          <View style={styles.contentModal}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {setOpen(false)}}>
              <FontAwesome name='close' size={50} color="#f06292"></FontAwesome>
            </TouchableOpacity>
          
            <Image style={styles.imgPhoto} source={{uri: capturedPhoto}}/>
          </View>
        </Modal>
      }
      
    </View>
  );
};

export default MyCamera;

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      marginBottom: 20,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#c2185b', 
    },
    infoContainer: {
      marginVertical: 20,
    },
    infoText: {
      fontSize: 16,
      color: '#ad1457', 
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  photo: {
    width: 100,  
    height: 100, 
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', 
    paddingHorizontal: 10, 
  },
});

export default styles;

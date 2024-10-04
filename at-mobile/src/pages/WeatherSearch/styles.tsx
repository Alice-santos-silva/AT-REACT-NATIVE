import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#d81b60',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ad1457',
  },
  input: {
    borderWidth: 1,
    borderColor: '#f8bbd0',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f06292',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
  weatherItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    backgroundColor: '#f0f0f0', 
    marginTop:10,
    borderRadius: 10, 
    padding: 10,
  },
});

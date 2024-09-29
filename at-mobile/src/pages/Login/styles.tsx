import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffe4e1', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#d81b60', 
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#d81b60', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#f8bbd0', 
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#f06292', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#ad1457', 
  },
  link: {
    color: '#e91e63', 
    fontWeight: 'bold',
  },
});
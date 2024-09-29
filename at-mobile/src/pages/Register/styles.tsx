import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffebee', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#c2185b', 
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#c2185b', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#f48fb1', 
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#ffffff', 
  },
  button: {
    backgroundColor: '#ec407a', 
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
  alreadyRegisteredText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#ad1457', 
  },
  link: {
    color: '#e91e63', 
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#d81b60',
    fontSize: 14,
    fontWeight: '500',
  },
  
});
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffebee',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#ec407a', 
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        color:'white',
        fontWeight:'bold'
      },
    remainingText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    expenseText: {
        fontSize: 16,
        marginTop: 10,
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
    },
});

export default styles;

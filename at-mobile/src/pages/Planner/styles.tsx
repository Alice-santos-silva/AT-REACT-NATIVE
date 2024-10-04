import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#d81b60'
    },
    textBoxes: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    progressText: {
        fontSize: 16,
        marginVertical: 10,
        color:'#d81b60'
    },
    progressBar: {
        marginVertical: 10,
    },
    taskContainer: {
        marginTop: 20,
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#ec407a', 
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    toggleButton: {
        backgroundColor: '#ec407a', 
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
});

export default styles;

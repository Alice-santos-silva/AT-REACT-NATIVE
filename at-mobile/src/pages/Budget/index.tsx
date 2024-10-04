import { useState } from 'react';
import { View, Text, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useTheme } from 'react-native-paper';

interface Expense {
    name: string;
    value: number;
}

const Budget = () => {
    const [budget, setBudget] = useState<string>(""); 
    const [remaining, setRemaining] = useState<number>(0);
    const [expenseName, setExpenseName] = useState<string>("");
    const [expenseValue, setExpenseValue] = useState<string>("");
    const [expenses, setExpenses] = useState<Expense[]>([]);  

    const theme = useTheme();

    function setBudgetAmount() {
        const budgetValue = parseFloat(budget);
        if (budgetValue > 0) {
            setRemaining(budgetValue);
            setBudget("");  
            Alert.alert("Orçamento definido!");
        } else {
            Alert.alert("Por favor, insira um valor válido para o orçamento.");
        }
    }

    function addExpense() {
        const expense = parseFloat(expenseValue);
        if (expense > 0 && expense <= remaining) {
            setRemaining(prev => prev - expense);

            setExpenses(prev => [...prev, { name: expenseName, value: expense }]);

            Alert.alert(`Adicionado: ${expenseName} por R$${expense}`);
            setExpenseName("");
            setExpenseValue("");
        } else if (expense > remaining) {
            Alert.alert("Orçamento insuficiente para essa despesa.");
        } else {
            Alert.alert("Insira um valor válido.");
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text style={styles.headerText}>Meu Orçamento</Text>

            <TextInput
                value={budget}
                onChangeText={setBudget}  
                placeholder="Definir orçamento (R$)"
                placeholderTextColor="#D3D3D3"
                keyboardType="numeric"
                style={styles.textBox}
            />
            <TouchableOpacity style={styles.button} onPress={setBudgetAmount}>
                <Text style={styles.button}>Definir Orçamento</Text>
            </TouchableOpacity>

            <Text style={styles.remainingText}>Orçamento restante: R${remaining.toFixed(2)}</Text>

            <TextInput
                value={expenseName}
                onChangeText={setExpenseName}
                placeholder="Nome da despesa"
                placeholderTextColor="#D3D3D3"
                style={styles.textBox}
            />
            <TextInput
                value={expenseValue}
                onChangeText={setExpenseValue}
                placeholder="Valor da despesa (R$)"
                placeholderTextColor="#D3D3D3"
                keyboardType="numeric"
                style={styles.textBox}
            />
            <TouchableOpacity style={styles.button} onPress={addExpense}>
                <Text style={styles.button}>Adicionar Despesa</Text>
            </TouchableOpacity>

            <FlatList
                data={expenses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.expenseText}>
                        {item.name} - R${item.value.toFixed(2)}
                    </Text>
                )}
            />
        </View>
    );
};

export default Budget;

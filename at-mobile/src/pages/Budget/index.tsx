import React, { useState } from 'react';
import { View, Text, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';

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
            Alert.alert("Desculpe, orçamento insuficiente para essa despesa.");
        } else {
            Alert.alert("Por favor, insira um valor válido.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Meu Orçamento</Text>

            <TextInput
                value={budget}
                onChangeText={setBudget}  
                placeholder="Definir orçamento (R$)"
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
                style={styles.textBox}
            />
            <TextInput
                value={expenseValue}
                onChangeText={setExpenseValue}
                placeholder="Valor da despesa (R$)"
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

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { ref, set, update, onValue, push, remove } from 'firebase/database';
import { dbReal } from '../../infra/firebase'; 
import * as Progress from 'react-native-progress';
import styles from './styles';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Task {
    id: string;
    task: string;
    status: string;
}

export default function Planner() {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState<Task[]>([]); 
    const [progress, setProgress] = useState(0);

    const theme = useTheme();

    function addTask() {
        const newTaskRef = ref(dbReal, 'tripTasks');
        const newTaskKey = push(newTaskRef).key;
        set(ref(dbReal, 'tripTasks/' + newTaskKey), {
            task: task,
            status: 'incomplete',
        }).then(() => {
            Alert.alert("Tarefa adicionada!");
            setTask(""); 
            fetchTasks(); 
        })
        .catch((error) => {
            Alert.alert("Erro", error.message);
        });
    }

    function toggleTaskStatus(id: string, status: string) {
        update(ref(dbReal, 'tripTasks/' + id), {
            status: status === 'complete' ? 'incomplete' : 'complete'
        }).then(() => {
            fetchTasks(); 
        })
        .catch((error) => {
            Alert.alert("Erro", error.message);
        });
    }

    function deleteTask(id: string) {
        remove(ref(dbReal, 'tripTasks/' + id))
            .then(() => {
                Alert.alert("Tarefa deletada!");
                fetchTasks(); 
            })
            .catch((error) => {
                Alert.alert("Erro", error.message);
            });
    }

    function fetchTasks() {
        const tasksRef = ref(dbReal, 'tripTasks');
        onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            const tasks: Task[] = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setTaskList(tasks);

            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.status === 'complete').length;
            const progressValue = totalTasks > 0 ? completedTasks / totalTasks : 0;
            setProgress(progressValue);
        });
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.headerText}>Meu CheckList</Text>
            
            <TextInput
                value={task}
                onChangeText={(text) => setTask(text)}
                placeholder='Adicionar nova tarefa'
                placeholderTextColor="#D3D3D3"
                style={styles.textBoxes}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.buttonText}>Adicionar Tarefa</Text>
            </TouchableOpacity>

            <Text style={styles.progressText}>
                Progresso: {Math.round(progress * 100)}%
            </Text>
            <Progress.Bar 
                progress={progress}
                width={null}
                style={styles.progressBar}
            />

            {taskList.length > 0 && (
                <View style={styles.taskContainer}>
                    {taskList.map((item) => (
                        <View key={item.id} style={styles.taskItem}>
                            <Text style={{ 
                                textDecorationLine: item.status === 'complete' ? 'line-through' : 'none',
                                fontSize: 18,
                                marginVertical: 5
                             }}>
                                {item.task}
                            </Text>
                            <TouchableOpacity 
                                style={styles.toggleButton}
                                onPress={() => toggleTaskStatus(item.id, item.status)}
                            >
                                <Text style={styles.buttonText}>
                                    {item.status === 'complete' ? 'Desfazer' : 'Completar'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <MaterialCommunityIcons 
                                    name="trash-can" 
                                    size={24} 
                                    color={theme.colors.error} 
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

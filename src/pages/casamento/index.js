import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView, Modal, Animated
} from 'react-native';

import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
// SVG

import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import CardsList from '../../components/CardsList';

import Card1 from '../../components/Card1';
import Card2 from '../../components/Card2';
import Card3 from '../../components/Card3';
import Card4 from '../../components/Card4';
import Card5 from '../../components/Card5';

const innerWidth = Dimensions.get('window').width;
const Casamento = () => {


    const [campoVazio, setCampoVazio] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [buttonScale] = useState(new Animated.Value(1));

    const [showWarning, setShowWarning] = useState(false);
    const warningOpacity = useRef(new Animated.Value(0)).current;

    const [componenteSelecionado, setComponenteSelecionado] = useState('Card1');

    const [novaTarefaNome, setNovaTarefaNome] = useState('');

    const [tasksCard1, setTasksCard1] = useState([]);
    const [tasksCard2, setTasksCard2] = useState([]);
    const [tasksCard3, setTasksCard3] = useState([]);
    const [tasksCard4, setTasksCard4] = useState([]);
    const [tasksCard5, setTasksCard5] = useState([]);

    const handleClearAll = async () => {
        // Limpa o estado de tarefas
        setTasksCard1([]);
        setTasksCard2([]);
        setTasksCard3([]);
        setTasksCard4([]);
        setTasksCard5([]);
        // Fecha o modal
        setModalVisible(false);

        // Limpa o AsyncStorage
        try {
            await AsyncStorage.removeItem('tasksCard1');
            await AsyncStorage.removeItem('tasksCard2');
            await AsyncStorage.removeItem('tasksCard3');
            await AsyncStorage.removeItem('tasksCard4');
            await AsyncStorage.removeItem('tasksCard5');
        } catch (error) {
            console.error('Erro ao limpar tarefas:', error);
        }
    };

    // Função para renderizar o componente correspondente ao card selecionado
    const renderizarComponente = () => {
        switch (componenteSelecionado) {
            case 'Card1':
                return <FlatList
                    data={tasksCard1}
                    renderItem={({ item }) => (<Card1 id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} removeTask={() => removeTask(item.id)} />)}
                    keyExtractor={item => item.id.toString()} />;
            case 'Card2':
                return <FlatList
                    data={tasksCard2}
                    renderItem={({ item }) => (<Card2 id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} removeTask={() => removeTask(item.id)} />)}
                    keyExtractor={item => item.id.toString()} />;
            case 'Card3':
                return <FlatList
                    data={tasksCard3}
                    renderItem={({ item }) => (<Card3 id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} removeTask={() => removeTask(item.id)} />)}
                    keyExtractor={item => item.id.toString()} />;
            case 'Card4':
                return <FlatList
                    data={tasksCard4}
                    renderItem={({ item }) => (<Card4 id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} removeTask={() => removeTask(item.id)} />)}
                    keyExtractor={item => item.id.toString()} />;
            case 'Card5':
                return <FlatList
                    data={tasksCard5}
                    renderItem={({ item }) => (<Card5 id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} removeTask={() => removeTask(item.id)} />)}
                    keyExtractor={item => item.id.toString()} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        Animated.timing(warningOpacity, {
            toValue: showWarning ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [showWarning]);

    // Função para carregar tarefas do AsyncStorage quando o componente for montado
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const savedTasksCard1 = await AsyncStorage.getItem('tasksCard1');
                if (savedTasksCard1 !== null) {
                    setTasksCard1(JSON.parse(savedTasksCard1));
                }
                const savedTasksCard2 = await AsyncStorage.getItem('tasksCard2');
                if (savedTasksCard2 !== null) {
                    setTasksCard2(JSON.parse(savedTasksCard2));
                }
                const savedTasksCard3 = await AsyncStorage.getItem('tasksCard3');
                if (savedTasksCard3 !== null) {
                    setTasksCard2(JSON.parse(savedTasksCard3));
                }
                const savedTasksCard4 = await AsyncStorage.getItem('tasksCard4');
                if (savedTasksCard4 !== null) {
                    setTasksCard2(JSON.parse(savedTasksCard4));
                }
                const savedTasksCard5 = await AsyncStorage.getItem('tasksCard5');
                if (savedTasksCard5 !== null) {
                    setTasksCard2(JSON.parse(savedTasksCard5));
                }
            } catch (error) {
                console.error('Erro ao carregar tarefas:', error);
            }
        };
        loadTasks();
    }, []);

    // Função para adicionar uma nova tarefa
    const addTask = async (newTask, card) => {
        // Animação buttonScale
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        // Verifica se o nome da tarefa está vazio
        if (newTask.trim() === '') {
            setCampoVazio(true);
            setShowWarning(true);
            return;
        } else {
            try {
                // Adiciona a nova tarefa ao card correspondente
                const task = {
                    id: Date.now(), // Usando timestamp como ID (sugiro revisar a geração de IDs)
                    name: newTask,
                    completed: 0, // Define o status inicial
                };
                let updatedTasks;
                switch (card) {
                    case 'Card1':
                        updatedTasks = [...tasksCard1, task];
                        setTasksCard1(updatedTasks);
                        await AsyncStorage.setItem('tasksCard1', JSON.stringify(updatedTasks));
                        break;
                    case 'Card2':
                        updatedTasks = [...tasksCard2, task];
                        setTasksCard2(updatedTasks);
                        await AsyncStorage.setItem('tasksCard2', JSON.stringify(updatedTasks));
                        break;
                    case 'Card3':
                        updatedTasks = [...tasksCard3, task];
                        setTasksCard3(updatedTasks);
                        await AsyncStorage.setItem('tasksCard3', JSON.stringify(updatedTasks));
                        break;
                    case 'Card4':
                        updatedTasks = [...tasksCard4, task];
                        setTasksCard4(updatedTasks);
                        await AsyncStorage.setItem('tasksCard4', JSON.stringify(updatedTasks));
                        break;
                    case 'Card5':
                        updatedTasks = [...tasksCard5, task];
                        setTasksCard5(updatedTasks);
                        await AsyncStorage.setItem('tasksCard5', JSON.stringify(updatedTasks));
                        break;
                    default:
                        break;
                }
                setNovaTarefaNome('');
                setCampoVazio(false);
                setShowWarning(false);
            } catch (error) {
                console.error('Erro ao adicionar tarefa:', error);
            }
        }
    };

    // Função para remover uma tarefa
    const removeTask = async (idToRemove) => {
        try {
            let updatedTasks;
            if (componenteSelecionado === 'Card1') {
                updatedTasks = tasksCard1.filter(task => task.id !== idToRemove);
                setTasksCard1(updatedTasks);
                await AsyncStorage.setItem('tasksCard1', JSON.stringify(updatedTasks));
            } else if (componenteSelecionado === 'Card2') {
                updatedTasks = tasksCard2.filter(task => task.id !== idToRemove);
                setTasksCard2(updatedTasks);
                await AsyncStorage.setItem('tasksCard2', JSON.stringify(updatedTasks));
            } else if (componenteSelecionado === 'Card3') {
                updatedTasks = tasksCard3.filter(task => task.id !== idToRemove);
                setTasksCard3(updatedTasks);
                await AsyncStorage.setItem('tasksCard3', JSON.stringify(updatedTasks));
            } else if (componenteSelecionado === 'Card4') {
                updatedTasks = tasksCard4.filter(task => task.id !== idToRemove);
                setTasksCard4(updatedTasks);
                await AsyncStorage.setItem('tasksCard4', JSON.stringify(updatedTasks));
            } else if (componenteSelecionado === 'Card5') {
                updatedTasks = tasksCard5.filter(task => task.id !== idToRemove);
                setTasksCard5(updatedTasks);
                await AsyncStorage.setItem('tasksCard5', JSON.stringify(updatedTasks));
            }
        } catch (error) {
            console.error('Erro ao remover tarefa:', error);
        }
    };

    // Função para marcar uma tarefa como completa
    const setCompleted = async (taskId, completed) => {
        try {

            if (componenteSelecionado === 'Card1') {
                updatedTasks = tasksCard1.map(task =>
                    task.id === taskId ? { ...task, completed: completed } : task
                );
                setTasksCard1(updatedTasks);
                await AsyncStorage.setItem('tasksCard1', JSON.stringify(updatedTasks));


            } else if (componenteSelecionado === 'Card2') {
                updatedTasks = tasksCard2.map(task =>
                    task.id === taskId ? { ...task, completed: completed } : task
                );
                setTasksCard2(updatedTasks);
                await AsyncStorage.setItem('tasksCard2', JSON.stringify(updatedTasks));

            } else if (componenteSelecionado === 'Card3') {
                updatedTasks = tasksCard3.map(task =>
                    task.id === taskId ? { ...task, completed: completed } : task
                );
                setTasksCard3(updatedTasks);
                await AsyncStorage.setItem('tasksCard3', JSON.stringify(updatedTasks));
            } else if (componenteSelecionado === 'Card4') {
                updatedTasks = tasksCard4.map(task =>
                    task.id === taskId ? { ...task, completed: completed } : task
                );
                setTasksCard4(updatedTasks);
                await AsyncStorage.setItem('tasksCard4', JSON.stringify(updatedTasks));
            } else if (componenteSelecionado === 'Card5') {
                updatedTasks = tasksCard5.map(task =>
                    task.id === taskId ? { ...task, completed: completed } : task
                );
                setTasksCard5(updatedTasks);
                await AsyncStorage.setItem('tasksCard5', JSON.stringify(updatedTasks));
            }
        } catch (error) {
            console.error('Erro ao marcar tarefa como completa:', error);
        }
    };
    const setEditar = async (taskId, valorNovo) => {
        try {

            if (componenteSelecionado === 'Card1') {
                updatedTasks = tasksCard1.map(task =>
                    task.id === taskId ? { ...task, name: valorNovo } : task
                );
                setTasksCard1(updatedTasks);
                await AsyncStorage.setItem('tasksCard1', JSON.stringify(updatedTasks));


            } else if (componenteSelecionado === 'Card2') {
                updatedTasks = tasksCard2.map(task =>
                    task.id === taskId ? { ...task, name: valorNovo } : task
                );
                setTasksCard2(updatedTasks);
                await AsyncStorage.setItem('tasksCard2', JSON.stringify(updatedTasks));

            } else if (componenteSelecionado === 'Card3') {
                updatedTasks = tasksCard3.map(task =>
                    task.id === taskId ? { ...task, name: valorNovo } : task
                );
                setTasksCard3(updatedTasks);
                await AsyncStorage.setItem('tasksCard3', JSON.stringify(updatedTasks));
            } else if (componenteSelecionado === 'Card4') {
                updatedTasks = tasksCard4.map(task =>
                    task.id === taskId ? { ...task, name: valorNovo } : task
                );
                setTasksCard4(updatedTasks);
                await AsyncStorage.setItem('tasksCard4', JSON.stringify(updatedTasks));
            } else if (componenteSelecionado === 'Card5') {
                updatedTasks = tasksCard5.map(task =>
                    task.id === taskId ? { ...task, name: valorNovo } : task
                );
                setTasksCard5(updatedTasks);
                await AsyncStorage.setItem('tasksCard5', JSON.stringify(updatedTasks));
            }
        } catch (error) {
            console.error('Erro ao marcar tarefa como completa:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={0}
            behavior='padding'
            enabled={Platform.OS === "ios"}
            style={styles.viewFull}>
            <Header />
            <View style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listHorizontal}>
                    {/* CARD1 */}
                    <CardsList
                        text={'Deus nos preparou'}
                        bgcolor={'#250A03'}
                        textColor={'#fff'}
                        colorIcon={'#fff'}
                        nameIcon={'gift'}
                        onPress={() => setComponenteSelecionado('Card1')}

                    />
                    {/* CARD2 */}
                    <CardsList
                        text={'Compras a fazer'}
                        bgcolor={'#440611'}
                        textColor={'#fff'}
                        colorIcon={'#fff'}
                        nameIcon={'shopping-bag'}
                        onPress={() => setComponenteSelecionado('Card2')}
                    />
                    {/* CARD2 */}
                    <CardsList
                        text={'Lista de tarefas'}
                        bgcolor={'#630C12'}
                        textColor={'#fff'}
                        colorIcon={'#fff'}
                        nameIcon={'bookmark'}
                        onPress={() => setComponenteSelecionado('Card3')}
                    />
                    {/* CARD2 */}
                    <CardsList
                        text={'Comprados'}
                        bgcolor={'#7F0E12'}
                        textColor={'#fff'}
                        colorIcon={'#fff'}
                        nameIcon={'tag'}
                        onPress={() => setComponenteSelecionado('Card4')}
                    />
                    {/* CARD2 */}
                    <CardsList
                        text={'Convidados'}
                        bgcolor={'#AB2830'}
                        textColor={'#fff'}
                        colorIcon={'#fff'}
                        nameIcon={'check-circle'}
                        onPress={() => setComponenteSelecionado('Card5')}
                    />


                </ScrollView>


                {renderizarComponente()}

            </View>

            {showWarning && <Text>O nome da tarefa não pode estar vazio.</Text>}

            <View style={styles.form}>
                <TextInput
                    value={novaTarefaNome}
                    onChangeText={text => setNovaTarefaNome(text)}
                    placeholder="Adicionar produto..."
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"
                    style={styles.input}
                />
                <TouchableOpacity style={styles.buttonSend} onPress={() => addTask(novaTarefaNome, componenteSelecionado)}>
                    <Ionicons name="send" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tem certeza de que deseja limpar tudo?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={handleClearAll}
                            >
                                <Text style={styles.buttonText}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    viewFull: {
        backgroundColor: '#F6F7FB',
        marginTop: Constants.statusBarHeight || 8,
        flex: 1,
    },
    container: {
        flex: 1,
    },
    listHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 800,
        height: innerWidth / 2,
        paddingHorizontal: 20,
    },

    headerTextCenter: {
        textAlign: 'center',
        fontSize: 10,
        color: 'white',
        opacity: 0.7,
    },
    iconStar: {
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        padding: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 5,
    },
    input: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
        color: '#000',
        fontSize: 16,
        padding: 10,
        borderRadius: 10,
    },
    buttonSend: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        height: 40,
        backgroundColor: '#440611',
        borderRadius: 10,
    },
    list: {
        paddingHorizontal: 20,
    },
    alerta: {
        position: "absolute",
        borderRadius: 10,
        paddingHorizontal: 35,
        color: "rgba(169,80,250,1)"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#333337",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        width: '40%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    confirmButton: {
        backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'red',
    },




});

export default Casamento;
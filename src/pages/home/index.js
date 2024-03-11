import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Animated,
    Modal
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';


import AsyncStorage from '@react-native-async-storage/async-storage';



import CardTaskNew from '../../components/CardTaskNew';
import CardsList from '../../components/CardsList';
import Header from '../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

const Home = () => {
    const [nameTask, setName] = useState(''); // INPUT

    const [currentCategory, setCurrentCategory] = useState('cat1');

    const [filteredTasks1, setFilteredTasks1] = useState([]);


    // CADA CATEGORIA
    const [cat1, setCat1] = useState([]);
    const [cat2, setCat2] = useState([]);
    const [cat3, setCat3] = useState([]);
    const [cat4, setCat4] = useState([]);
    const [cat5, setCat5] = useState([]);

    const [cat1Count, setCat1Count] = useState(0);
    const [cat2Count, setCat2Count] = useState(0);
    const [cat3Count, setCat3Count] = useState(0);
    const [cat4Count, setCat4Count] = useState(0);
    const [cat5Count, setCat5Count] = useState(0);

    const [tasks, setTasks] = useState([]);


    const [campoVazio, setCampoVazio] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [buttonScale] = useState(new Animated.Value(1));
    const [showWarning, setShowWarning] = useState(false);
    const warningOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(warningOpacity, {
            toValue: showWarning ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [showWarning]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                // Array de nomes de categoria
                const categories = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'];

                // Itera sobre cada categoria para carregar as tarefas correspondentes
                categories.forEach(async (category) => {
                    const savedTasks = await AsyncStorage.getItem(`${category}Tasks`);
                    if (savedTasks !== null) {
                        // Atualiza o estado correspondente com as tarefas carregadas
                        switch (category) {
                            case 'cat1':
                                setCat1(JSON.parse(savedTasks));
                                break;
                            case 'cat2':
                                setCat2(JSON.parse(savedTasks));
                                break;
                            case 'cat3':
                                setCat3(JSON.parse(savedTasks));
                                break;
                            case 'cat4':
                                setCat4(JSON.parse(savedTasks));
                                break;
                            case 'cat5':
                                setCat5(JSON.parse(savedTasks));
                                break;
                            // Adicione casos para outras categorias conforme necessário
                            default:
                                console.error('Categoria inválida:', category);
                                break;
                        }
                    }
                });
            } catch (error) {
                console.error('Erro ao carregar tarefas:', error);
            }
        };

        loadTasks();
    }, []);

    async function addTask(category) {

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

        if (nameTask.trim() === '') {
            setCampoVazio(true);
            setShowWarning(true);
            return;
        }

        function getNextId(category) {
            switch (category) {
                case 'cat1':
                    return cat1Count + 1;
                case 'cat2':
                    return cat2Count + 1;
                case 'cat3':
                    return cat3Count + 1;
                case 'cat4':
                    return cat4Count + 1;
                case 'cat5':
                    return cat5Count + 1;
                // Adicione casos para outras categorias conforme necessário
                default:
                    return 0; // Valor padrão caso a categoria não seja reconhecida
            }
        }

        const newTask1 = {
            id: getNextId(category), // Usando o comprimento da categoria específica para garantir IDs únicos
            name: nameTask,
            completed: 0,
        };
        const newTask2 = {
            id: getNextId(category), // Usando o comprimento da categoria específica para garantir IDs únicos
            name: nameTask,
            completed: 0,
        };
        const newTask3 = {
            id: getNextId(category), // Usando o comprimento da categoria específica para garantir IDs únicos
            name: nameTask,
            completed: 0,
        };
        const newTask4 = {
            id: getNextId(category), // Usando o comprimento da categoria específica para garantir IDs únicos
            name: nameTask,
            completed: 0,
        };
        const newTask5 = {
            id: getNextId(category), // Usando o comprimento da categoria específica para garantir IDs únicos
            name: nameTask,
            completed: 0,
        };

        // Adicionar a nova tarefa à categoria apropriada
        switch (category) {
            case 'cat1':
                setCat1([...cat1, newTask1]);
                setCat1Count(cat1Count + 1);
                break;
            case 'cat2':
                setCat2([...cat2, newTask2]);
                setCat2Count(cat2Count + 1);
                break;
            case 'cat3':
                setCat3([...cat3, newTask3]);
                setCat3Count(cat3Count + 1);
                break;
            case 'cat4':
                setCat4([...cat4, newTask4]);
                setCat4Count(cat4Count + 1);
                break;
            case 'cat5':
                setCat5([...cat5, newTask5]);
                setCat5Count(cat5Count + 1);
                break;
            default:
                break;
        }

        setName('');
        setCampoVazio(false);
        setShowWarning(false);
        Keyboard.dismiss();

        // Salvar as tarefas de cada categoria separadamente no AsyncStorage
        try {
            switch (category) {
                case 'cat1':
                    await AsyncStorage.setItem('cat1Tasks', JSON.stringify(cat1));
                    break;
                case 'cat2':
                    await AsyncStorage.setItem('cat2Tasks', JSON.stringify(cat2));
                    break;
                case 'cat3':
                    await AsyncStorage.setItem('cat3Tasks', JSON.stringify(cat3));
                    break;
                case 'cat4':
                    await AsyncStorage.setItem('cat4Tasks', JSON.stringify(cat4));
                    break;
                case 'cat5':
                    await AsyncStorage.setItem('cat5Tasks', JSON.stringify(cat5));
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
        }
    }



    const handleClearAll = async (category) => {
        // Verifica qual categoria deve ser limpa com base no parâmetro 'category'
        switch (category) {
            case 'cat1':
                setCat1([]);
                try {
                    await AsyncStorage.removeItem('cat1');
                } catch (error) {
                    console.error('Erro ao limpar tarefas:', error);
                }
                break;
            case 'cat2':
                setCat2([]);
                try {
                    await AsyncStorage.removeItem('cat2');
                } catch (error) {
                    console.error('Erro ao limpar tarefas:', error);
                }
                break;
            case 'cat3':
                setCat3([]);
                try {
                    await AsyncStorage.removeItem('cat3');
                } catch (error) {
                    console.error('Erro ao limpar tarefas:', error);
                }
                break;
            case 'cat4':
                setCat4([]);
                try {
                    await AsyncStorage.removeItem('cat4');
                } catch (error) {
                    console.error('Erro ao limpar tarefas:', error);
                }
                break;
            case 'cat5':
                setCat5([]);
                try {
                    await AsyncStorage.removeItem('cat5');
                } catch (error) {
                    console.error('Erro ao limpar tarefas:', error);
                }
                break;
            // Adicione casos para outras categorias conforme necessário
            default:
                console.error('Categoria inválida');
                break;
        }
    };

    const handleCategoryPress = (category) => {
        setCurrentCategory(category);
    };

    // Filtrar as tarefas com base na categoria selecionada
    const filteredTasks = useMemo(() => {
        switch (currentCategory) {
            case 'cat1':
                return cat1;
            case 'cat2':
                return cat2;
            case 'cat3':
                return cat3;
            case 'cat4':
                return cat4;
            case 'cat5':
                return cat5;
            default:
                return cat1;
        }
    }, [tasks, currentCategory, cat1, cat2, cat3, cat4, cat5]);

    const handleToggleTaskCompletion = async (idCompleted, category) => {
        // Obtém o nome da chave de armazenamento com base na categoria
        const storageKey = `${category}Tasks`;

        // Obtém as tarefas salvas do AsyncStorage
        const savedTasks = await AsyncStorage.getItem(storageKey);
        if (savedTasks === null) {
            console.log('Nenhuma tarefa encontrada para a categoria ' + category);
            return;
        }

        // Converte as tarefas salvas de JSON para um array
        const tasks = JSON.parse(savedTasks);

        // Atualiza o estado de conclusão da tarefa com base no ID fornecido
        const updatedTasks = tasks.map(task => {
            if (task.id === idCompleted) {
                return {
                    ...task,
                    completed: task.completed === 0 ? 1 : 0 // Alterna o estado de conclusão da tarefa
                };
            } else {
                return task;
            }
        });

        // Atualiza o estado com as tarefas atualizadas
        switch (category) {
            case 'cat1':
                setCat1(updatedTasks);
                break;
            case 'cat2':
                setCat2(updatedTasks);
                break;
            case 'cat3':
                setCat3(updatedTasks);
                break;
            case 'cat4':
                setCat4(updatedTasks);
                break;
            case 'cat5':
                setCat5(updatedTasks);
                break;
            // Adicione casos para outras categorias conforme necessário
            default:
                console.error('Categoria inválida');
                return;
        }

        // Salva as tarefas atualizadas no AsyncStorage
        try {
            await AsyncStorage.setItem(storageKey, JSON.stringify(updatedTasks));
        } catch (error) {
            console.error('Erro ao salvar tarefas após alteração de conclusão:', error);
        }
    };

    const removeTask = async (idToRemove, category) => {
        // Verifica qual categoria deve ser atualizada com base no parâmetro 'category'
        switch (category) {
            case 'cat1':
                const updatedCat1 = cat1.filter(task => task.id !== idToRemove);
                setCat1(updatedCat1);
                try {
                    await AsyncStorage.setItem('cat1', JSON.stringify(updatedCat1));
                } catch (error) {
                    console.error('Erro ao salvar tarefas após remoção:', error);
                }
                break;
            case 'cat2':
                const updatedCat2 = cat2.filter(task => task.id !== idToRemove);
                setCat2(updatedCat2);
                try {
                    await AsyncStorage.setItem('cat2', JSON.stringify(updatedCat2));
                } catch (error) {
                    console.error('Erro ao salvar tarefas após remoção:', error);
                }
                break;
            case 'cat3':
                const updatedCat3 = cat3.filter(task => task.id !== idToRemove);
                setCat3(updatedCat3);
                try {
                    await AsyncStorage.setItem('cat3', JSON.stringify(updatedCat3));
                } catch (error) {
                    console.error('Erro ao salvar tarefas após remoção:', error);
                }
                break;
            case 'cat4':
                const updatedCat4 = cat4.filter(task => task.id !== idToRemove);
                setCat4(updatedCat4);
                try {
                    await AsyncStorage.setItem('cat4', JSON.stringify(updatedCat4));
                } catch (error) {
                    console.error('Erro ao salvar tarefas após remoção:', error);
                }
                break;
            case 'cat5':
                const updatedCat5 = cat5.filter(task => task.id !== idToRemove);
                setCat5(updatedCat5);
                try {
                    await AsyncStorage.setItem('cat5', JSON.stringify(updatedCat5));
                } catch (error) {
                    console.error('Erro ao salvar tarefas após remoção:', error);
                }
                break;
            default:
                console.error('Categoria inválida');
                console.error(category);
                break;
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100} // Ajuste conforme necessário
            style={{ flex: 1 }} // Garante que a view ocupe todo o espaço disponível
        >
            <Header />
            <View style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listHorizontal}>
                    {/* CAT1 */}
                    <CardsList
                        text={'Deus preparou'}
                        bgcolor={'#f49e12'}
                        textColor={'#ffffff'}
                        nameIcon={'heart'}
                        onPress={() => handleCategoryPress('cat1')} // Adicione o onPress para selecionar a categoria

                    />
                    {/* CAT2 */}
                    <CardsList
                        text={'Comprar'}
                        bgcolor={'#8E2BF0'}
                        textColor={'#fff'}
                        nameIcon={'shopping-cart'}
                        onPress={() => handleCategoryPress('cat2')} // Adicione o onPress para selecionar a categoria
                    />
                    {/* CAT3 */}
                    <CardsList
                        text={'Comprados'}
                        bgcolor={'#2BBFF0'}
                        textColor={'#fff'}
                        nameIcon={'shopping-bag'}
                        onPress={() => handleCategoryPress('cat3')} // Adicione o onPress para selecionar a categoria
                    />
                    {/* CAT4 */}
                    <CardsList
                        text={'Lista de tarefas'}
                        bgcolor={'#9B4F63'}
                        textColor={'#ffffff'}
                        nameIcon={'bookmark'}
                        onPress={() => handleCategoryPress('cat4')} // Adicione o onPress para selecionar a categoria
                    />
                    {/* CAT5 */}
                    <CardsList
                        text={'Convidados'}
                        bgcolor={'#F02B5E'}
                        textColor={'#fff'}
                        nameIcon={'check-circle'}
                        onPress={() => handleCategoryPress('cat5')} // Adicione o onPress para selecionar a categoria
                    />
                </ScrollView>

                <FlatList
                    data={filteredTasks}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    style={styles.list}
                    renderItem={({ item }) => (
                        <CardTaskNew
                            id={item.id}
                            name={item.name}
                            completo={item.completed}
                            curr={currentCategory}
                            handleToggleTaskCompletion={() => handleToggleTaskCompletion(item.id, currentCategory)}
                            removeTask={() => removeTask(item.id, currentCategory)}

                        />
                    )}
                />


            </View>

            <View>
                <TouchableOpacity onPress={() => handleClearAll(currentCategory)}>
                    <Text>Limpar Todos</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'flex-start' }}>
                <View style={styles.form}>
                    <TextInput
                        onChangeText={text => setName(text)}
                        value={nameTask}
                        placeholder="Adicionar produto..."
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        style={styles.input}
                    />
                    <TouchableOpacity
                        style={[styles.buttonSend, { transform: [{ scale: buttonScale }] }]}
                        onPress={() => addTask(currentCategory)}
                    >
                        <Ionicons name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Animated.Text style={[styles.alerta, { opacity: warningOpacity }]}>
                    O campo não pode estar vazio!
                </Animated.Text>
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
                                onPress={() => handleClearAll(currentCategory)}>
                                <Text style={styles.buttonText}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {
                currentCategory &&
                console.log("Você clicou na: " + currentCategory)
            }
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    viewFull: {
        backgroundColor: '#F6F7FB',
        marginTop: Constants.statusBarHeight || 8,
    },
    container: {
        flex: 1,
    },
    listHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 800,
        paddingHorizontal: 20,
        marginBottom: 20,
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
        backgroundColor: '#6801FA',
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

export default Home;

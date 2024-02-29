import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    PermissionsAndroid,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    ScrollView,
    Modal,
    Animated
} from 'react-native';

import Constants from 'expo-constants';
import FeatherIcon from 'feather-icons-react';
import Ionicons from '@expo/vector-icons/Ionicons';
// SVG
import StarSVG from '../../assets/svg/star.svg';
import ButtomAdd from '../../assets/svg/add.svg';
import MenuSVG from '../../assets/svg/menu.svg';

import CardTask from '../../components/CardTask';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

    const [checkList, setCheckList] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [nameTask, setName] = useState('');

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

    const handleClearAll = () => {
        // Execute a ação de limpar tudo aqui
        setTasks([]);
        // Feche o modal
        setModalVisible(false);
    }

    async function addTask() {
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

        const newTask = {
            id: tasks.length + 1, // Gera um novo ID
            name: nameTask,
            status: 0, // Define o status inicial (por exemplo, 0 para pendente)
        };

        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        setName('');
        setCampoVazio(false);
        setShowWarning(false);
        Keyboard.dismiss();
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
        }
    }

    const removeTask = (idToRemove) => {
        const updatedTasks = tasks.filter(task => task.id !== idToRemove); // Remove a tarefa com o ID especificado
        // Atualiza os IDs das tarefas restantes para garantir que estejam em ordem
        const reorderedTasks = updatedTasks.map((task, index) => ({
            ...task,
            id: index + 1,
        }));
        setTasks(reorderedTasks); // Atualiza o estado com a nova lista de tarefas
    };

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem('tasks');
                if (savedTasks !== null) {
                    setTasks(JSON.parse(savedTasks));
                }
            } catch (error) {
                console.error('Erro ao carregar tarefas:', error);
            }
        };

        loadTasks();
    }, []);

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={0}
            behavior='padding'
            enabled={Platform.OS === "ios"}
            style={styles.viewFull}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContext}>
                        <Image style={styles.headerImage} source={require('../../assets/jpg/person.jpg')} />
                        <View>
                            <Text style={styles.headerTextTop}>07 fev 2024</Text>
                            <Text style={styles.headerTextBottom}>Olá, Matheus</Text>
                        </View>
                    </View>
                    <View style={styles.headerContextCenter}>
                        <Text style={styles.headerTextCenter}>Concluidas</Text>
                        <StarSVG width={30} height={30} style={styles.iconStar} />
                    </View>
                    <View style={styles.headerContextCenter}>
                        <View>
                            <TextInput
                                onChangeText={text => setName(text)}
                                value={nameTask}
                                placeholder="Adicionar tarefa..." placeholderTextColor="rgba(255, 168, 78, 0.5)" style={styles.inputSearch}>
                            </TextInput>
                            <TouchableOpacity style={styles.clearInput} onPress={() => {
                                setName('');
                                Keyboard.dismiss()
                            }}>
                                <Ionicons name="close-circle" size={32} color="rgba(255,255,255,0.1)" />
                            </TouchableOpacity>
                        </View>

                        <Animated.Text style={[styles.alerta, { opacity: warningOpacity }]}>
                            O campo não pode estar vazio!
                        </Animated.Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.contentButtomAdd, { transform: [{ scale: buttonScale }] }]}
                    onPress={addTask}
                >
                    <ButtomAdd width={50} height={50} style={styles.iconStar} />

                </TouchableOpacity>

                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}

                    renderItem={({ item }) => (
                        <CardTask
                            id={item.id}
                            name={item.name}
                            status={item.status}
                            removeTask={removeTask} // Passa a função removeTask como propriedade
                        />
                    )}
                />
                <Text
                    style={{ color: "white", fontSize: 15, textAlign: "right", fontWeight: "bold"}}
                    onPress={() => setModalVisible(true)}
                >
                    Limpar tudo
                </Text>

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
        flex: 1,
        backgroundColor: '#FF9400',
        marginTop: Constants.statusBarHeight || 8,
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
    },

    //  Header Section  -->
    header: {
        marginHorizontal: -20,
        height: windowHeight * 0.34,
        backgroundColor: '#232323',
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30
    },
    headerContext: {
        marginHorizontal: 20,
        justifyContent: 'space-between',
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    headerContextCenter: {
        justifyContent: 'center',
        paddingVertical: 5,
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    headerTextTop: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        opacity: 0.7,
        // backgroundColor: 'blue',
    },
    headerTextBottom: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        // backgroundColor: 'blue',
    },
    headerImage: {
        width: 70,
        height: 70,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: '#FFA84E'
    },
    headerTextCenter: {
        textAlign: 'center',
        fontSize: 10,
        color: 'white',
        opacity: 0.7,
        // backgroundColor: 'blue',
    },
    iconStar: {
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSearch: {
        width: windowWidth - 120,
        paddingHorizontal: 35,
        height: 40,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        color: '#ffffff',
        fontSize: 16,
        borderColor: '#FFA84E',
        textAlign: 'center'
    },
    clearInput: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alerta: {
        // position: "absolute",
        marginTop: 5,
        width: windowWidth - 120,
        borderRadius: 10,
        paddingHorizontal: 35,
        color: "rgba(169,80,250,1)"
        // backgroundColor: "#F9D3C3"
    },
    //  Content Section  -->
    contentButtomAdd: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: -20,
    },
    // modal

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
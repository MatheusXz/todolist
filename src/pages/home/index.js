import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

// SVG
import StarSVG from '../../assets/svg/star.svg';
import ButtomAdd from '../../assets/svg/add.svg';
import MenuSVG from '../../assets/svg/menu.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const taskJson = 'file:///E:/Github/todolist/src/tarefas/tasks.json';

const Home = () => {
    const [checkList, setCheckList] = useState(false);

    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        loadTasks();
        solicitarPermissaoArquivos();
    }, []);

    const solicitarPermissaoArquivos = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);

            if (
                granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('Permissões concedidas');
            } else {
                console.log('Permissões negadas');
                Alert.alert(
                    'Permissões necessárias',
                    'Por favor, conceda permissão para acessar o sistema de arquivos para continuar.',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.error('Erro ao solicitar permissões:', error);
        }
    };

    console.log(taskJson);

    const loadTasks = async () => {
        try {
            const fileUri = taskJson;
            const fileContent = await FileSystem.readAsStringAsync(fileUri);
            const tasks = JSON.parse(fileContent);
            setTaskList(tasks);
        } catch (error) {
            console.error('Erro ao carregar as tarefas:', error);
        }
    };

    const addTask = async (taskName) => {
        try {
            const newTask = { name: taskName, completed: false };
            const updatedTasks = [...taskList, newTask];
            const fileUri = taskJson;
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedTasks));
            setTaskList(updatedTasks);
        } catch (error) {
            console.error('Erro ao adicionar a tarefa:', error);
        }
    };

    const toggleTaskCompletion = async (index) => {
        try {
            const updatedTasks = [...taskList];
            updatedTasks[index].completed = !updatedTasks[index].completed;
            const fileUri = taskJson;
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedTasks));
            setTaskList(updatedTasks);
        } catch (error) {
            console.error('Erro ao alternar a conclusão da tarefa:', error);
        }
    };

    return (
        <View style={styles.viewFull}>
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
                        <TextInput placeholder="Adicionar tarefa..." placeholderTextColor="rgba(255, 168, 78, 0.5)" style={styles.inputSearch} />
                    </View>
                    <View style={styles.headerContextCenter}>
                        <ButtomAdd width={50} height={50} style={styles.iconStar}
                            onPress={() => {
                                const taskName = "Nome da nova tarefa"; // Aqui você pode pegar o nome da tarefa de um TextInput, por exemplo
                                addTask(taskName);
                            }}
                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.cardTask}>
                        <View style={styles.cardMenu}>
                            <MenuSVG width={9} height={19} />
                        </View>
                        <View>
                            <Text style={styles.cardText} > Comprar leite e pão no mercado </Text>

                        </View>
                        <View>
                            <TouchableOpacity onPress={
                                () => {
                                    console.log('tarefa clicada');
                                    setCheckList(!checkList)
                                }
                            }>
                                {/* <Text style={styles.cardText}>{checkList ? '✔' : '❌'}</Text> */}
                                {/* <View style={styles.buttomCheckTrue}>
                                     
                                </View> */}
                                <View style={checkList ? styles.buttomCheckTrue : styles.buttomCheck}>
                                
                                </View>
                            </TouchableOpacity>
                        </View>
                        {taskList &&
                            console.log(taskList)
                        }
                    </View>
                </View >
            </View>
        </View>
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
        margin: 10,
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
    //  Header Section  <--
    //  Content Section  -->
    content: {
        marginTop: 30,
        // backgroundColor: "#FFFFFF",
    },
    cardTask: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        marginVertical: 10,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 150,
        elevation: 10,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        borderTopStartRadius: 15,
        backgroundColor: '#333337',
        borderWidth: 1,
        borderColor: '#FFA84E'
    },
    cardText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
    },
    buttomCheck: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 5,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FFA84E'
    },
    buttomCheckTrue: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 5,
        height: 20,
        borderRadius: 5,
        backgroundColor: '#FFA84E',
        borderWidth: 1,
        borderColor: '#FFA84E'
    },

    //  Content Section  <--


});

export default Home;
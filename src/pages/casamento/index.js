import React, { useState, useEffect, useRef } from 'react';
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
    ScrollView,
    Modal,
    Animated,
    Image,
    Alert,
} from 'react-native';



import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { requestPermissionsAsync, createAssetAsync } from 'expo-media-library';



import Ionicons from '@expo/vector-icons/Ionicons';
// SVG

import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import CardsList from '../../components/CardsList';

import Card1 from '../../components/Card1';
import Card2 from '../../components/Card2';
import Card3 from '../../components/Card3';
import Card4 from '../../components/Card4';
import CardConvidados from '../../components/CardConvidados';



const innerWidth = Dimensions.get('window').width;
const Casamento = () => {

    const [modalVisibleAddFoto, setModalVisibleAddFoto] = useState(false);
    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [warningTextFoto, setShowWarningTextFoto] = useState(false);
    const [warningFoto, setShowWarningFoto] = useState(false);
    const warningOpacity = useRef(new Animated.Value(0)).current;
    const [showWarning, setShowWarning] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [buttonScale] = useState(new Animated.Value(1));

    const [componenteSelecionado, setComponenteSelecionado] = useState('Card1');
    const [novaTarefaNome, setNovaTarefaNome] = useState('');

    const [tasksCard1, setTasksCard1] = useState([]);
    const [tasksCard2, setTasksCard2] = useState([]);
    const [tasksCard3, setTasksCard3] = useState([]);
    const [tasksCard4, setTasksCard4] = useState([]);
    const [tasksCard5, setTasksCard5] = useState([]);

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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library

        if (Platform.OS !== 'android') {
            return true;
        }

        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Por favor, conceda permissão para acessar a mídia armazenada.');
            return false;
        } else {
            setShowWarningFoto(false)
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            // console.log(result);
            // console.log(result.assets[0].uri);

            if (!result.canceled) {
                setImagemSelecionada(result.assets[0].uri);
            }
            return true;
        }

    };

    const handleAddTaskToCard4 = async () => {
        if (!novaTarefaNome.trim()) {
            setShowWarningTextFoto(true);
            return;
        }

        // Verifica se a imagem foi selecionada
        if (!imagemSelecionada) {
            setShowWarningFoto(true)
            return;
        }

        try {
            // Salva a imagem e obtém o caminho da imagem salva
            const caminhoImagemSalva = await saveImage(imagemSelecionada);
            console.log('Caminhdo da Imagem 001 - > ', caminhoImagemSalva)
            // Adiciona a tarefa com o nome e o caminho da imagem
            addTaskToCard4(novaTarefaNome, caminhoImagemSalva);

            // Fecha a modal após adicionar a tarefa
            setModalVisibleAddFoto(false);
            setImagemSelecionada(null);
        } catch (error) {
            console.error('Erro ao salvar a imagem:', error);
        }
    };

    const saveImage = async (uri) => {
        try {
            const permission = await requestPermissionsAsync();

            if (permission.status === 'granted') {
                try {
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    const album = await MediaLibrary.getAlbumAsync('DCIM');

                    if (album === null) {
                        await MediaLibrary.createAlbumAsync('DCIM', asset, false);
                    } else {
                        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                    }

                    console.log('Image saved to DCIM folder! ' + asset.uri);
                    return asset.uri;
                } catch (error) {
                    console.error('Error saving image to DCIM folder:', error);
                }
            }

        } catch (error) {
            console.error('Erro ao salvar imagem:', error);
            throw error;
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setModalVisibleAddFoto(false);
        setNovaTarefaNome('');
        setImagemSelecionada(null);
        setShowWarningFoto(false);
        setShowWarningTextFoto(false)
    };

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
                    renderItem={({ item }) => (<Card1 id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} editar={setEditar} removeTask={() => removeTask(item.id)} />)}
                    keyExtractor={item => item.id.toString()} />;
            case 'Card2':
                return <FlatList
                    data={tasksCard2}
                    renderItem={({ item }) => (<Card2 id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} editar={setEditar} removeTask={() => removeTask(item.id)} />)}
                    keyExtractor={item => item.id.toString()} />;
            case 'Card3':
                return <FlatList
                    data={tasksCard3}
                    renderItem={({ item }) => (<Card3 id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} editar={setEditar} removeTask={() => removeTask(item.id)} />)}
                    keyExtractor={item => item.id.toString()} />;
            case 'Card4':
                return (
                    <ScrollView horizontal={false} showsVerticalScrollIndicator={true}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            {tasksCard4.slice().reverse().map((item, index) => ( // Usando slice() para criar uma cópia do array original antes de aplicar reverse()
                                <View key={item.id} style={{ width: '40%', margin: 10 }}>
                                    <Card4
                                        id={item.id}
                                        name={item.name}
                                        completo={item.completed}
                                        setCompleted={setCompleted}
                                        editar={setEditar}
                                        removeTask={() => removeTask(item.id)}
                                        img={item.img}
                                    />
                                    {/* <Text>{item.img}</Text> */}
                                </View>

                            ))}
                        </View>
                    </ScrollView>

                );

            // <FlatList
            //     data={tasksCard4}
            //     renderItem={({ item }) => (<Card4 id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} editar={setEditar} removeTask={() => removeTask(item.id)} />)}
            //     keyExtractor={item => item.id.toString()} />;
            case 'Card5':
                return <FlatList
                    data={tasksCard5}
                    renderItem={({ item }) => (<CardConvidados id={item.id} name={item.name} completo={item.completed} setCompleted={setCompleted} editar={setEditar} removeTask={() => removeTask(item.id)} />)}
                    keyExtractor={item => item.id.toString()} />;
            default:
                return null;
        }
    };

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
                        { setModalVisibleAddFoto(true) }
                        // updatedTasks = [...tasksCard4, task];
                        // setTasksCard4(updatedTasks);
                        // await AsyncStorage.setItem('tasksCard4', JSON.stringify(updatedTasks));
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

                setShowWarning(false);
            } catch (error) {
                console.error('Erro ao adicionar tarefa:', error);
            }
        }
    };

    // Função para adicionar uma nova tarefa ao Card4
    const addTaskToCard4 = async (newTask, imageUri) => {
        try {
            const task = {
                id: Date.now(),
                name: newTask,
                completed: 0,
                img: imageUri, // Armazena a URI da imagem junto com a tarefa
            };
            // console.log(task);


            const updatedTasks = [...tasksCard4, task];
            setTasksCard4(updatedTasks);
            await AsyncStorage.setItem('tasksCard4', JSON.stringify(updatedTasks));

            // console.log(updatedTasks);
            setNovaTarefaNome('');

            setShowWarning(false);
            setShowWarningTextFoto(false);
        } catch (error) {
            console.error('Erro ao adicionar tarefa ao Card4:', error);
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

    // Função para editar uma tarefa
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
                        text={'Deus'}
                        bgcolor={'#1E1E1E'}
                        textColor={'#7300A9'}
                        colorIcon={'#fff'}
                        nameIcon={'heart-circle'}
                        onPress={() => setComponenteSelecionado('Card1')}

                    />
                    {/* CARD2 */}
                    <CardsList
                        text={'Compras'}
                        bgcolor={'#1E1E1E'}
                        textColor={'#365AEA'}
                        colorIcon={'#fff'}
                        nameIcon={'pricetags'}
                        onPress={() => setComponenteSelecionado('Card2')}
                    />
                    {/* CARD2 */}
                    <CardsList
                        text={'Tarefas'}
                        bgcolor={'#1E1E1E'}
                        textColor={'#20E7CF'}
                        colorIcon={'#fff'}
                        nameIcon={'bookmark'}
                        onPress={() => setComponenteSelecionado('Card3')}
                    />
                    {/* CARD2 */}
                    <CardsList
                        text={'Comprados'}
                        bgcolor={'#1E1E1E'}
                        textColor={'#67DB3F'}
                        colorIcon={'#fff'}
                        nameIcon={'star'}
                        onPress={() => setComponenteSelecionado('Card4')}
                    />
                    {/* CARD2 */}
                    <CardsList
                        text={'Convidados'}
                        bgcolor={'#1E1E1E'}
                        textColor={'#E55606'}
                        colorIcon={'#fff'}
                        nameIcon={'checkmark-done-circle'}
                        onPress={() => setComponenteSelecionado('Card5')}
                    />


                </ScrollView>

                {renderizarComponente()}
            </View>

            {showWarning && <Text>O nome da tarefa não pode estar vazio.</Text>}

            <View style={styles.form}>
                {componenteSelecionado &&
                    componenteSelecionado == 'Card4' ?
                    (
                        <TouchableOpacity style={styles.buttonAddFoto} onPress={() => setModalVisibleAddFoto(true)}>
                            <Ionicons name="add-circle" size={24} color="#fff" />
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TextInput
                                value={novaTarefaNome}
                                onChangeText={text => setNovaTarefaNome(text)}
                                placeholder="Adicionar item..."
                                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                                style={styles.input}
                            />

                            <TouchableOpacity style={styles.buttonSend} onPress={() => addTask(novaTarefaNome, componenteSelecionado)}>
                                <Ionicons name="send" size={24} color="#fff" />
                            </TouchableOpacity>
                        </>
                    )
                }


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

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleAddFoto}
                onRequestClose={handleCloseModal}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalViewAddFoto}>
                        <Text style={styles.modalTextAddFoto}>Adicionando produto</Text>

                        <Text style={{ color: 'gray', marginBottom: 10 }}>
                            Sua foto do produto aqui
                        </Text>
                        {warningTextFoto &&
                            < Text style={{ color: 'red', marginBottom: 10 }}>
                                Foto não pode ficar vazia.
                            </Text>
                        }
                        <View style={styles.buttonContainerAddFoto}>
                            <View style={styles.fotoSelecionada}>
                                <Image source={{ uri: imagemSelecionada }} style={{ width: '100%', height: '95%', borderWidth: 1, borderColor: '#454545', borderRadius: 20, marginBottom: 10 }} />
                            </View>

                            <TouchableOpacity
                                style={[styles.buttonAddFotoModal, { width: '20%', justifyContent: 'center', alignItems: 'center' }]}
                                onPress={pickImage}
                            >
                                <Ionicons name='camera' size={24} color={'white'} />
                            </TouchableOpacity>



                        </View>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>
                            Nome do seu produto
                        </Text>
                        {warningTextFoto &&
                            <Text style={{ color: 'red', marginBottom: 10 }}>
                                Nome do produto não pode ficar vazio.
                            </Text>
                        }



                        <TextInput
                            style={styles.inputAddFoto}
                            placeholder="Escreva aqui"
                            onChangeText={setNovaTarefaNome}
                            value={novaTarefaNome}

                        />

                        <View style={styles.buttonContainerAddFotoBottom}>

                            <TouchableOpacity
                                style={[styles.buttonCancelAddFoto, styles.cancelButtonAddFoto]}
                                onPress={handleCloseModal}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonSalvaAddFoto, styles.confirmButtonAddFoto]}
                                onPress={handleAddTaskToCard4}
                            >
                                <Text style={styles.buttonTextAddFoto}>Salvar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({

    // LINHA ONDE TEM O ADD
    linhaAddCat: {
        flex: 1,
        flexDirection: 'column',
        top: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
    },
    buttonAddCat: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 80,
        borderRadius: 20,
    },
    textAddCat: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#AB2830',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },


    // 
    viewFull: {
        backgroundColor: '#F6F7FB',
        flex: 1,
    },
    container: {
        flex: 1,

    },
    listHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 600,
        height: innerWidth / 4,
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
        justifyContent: 'center',
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
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
    },
    buttonAddFoto: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        width: '40%',
        height: 40,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
    },
    buttonAddFotoModal: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        width: '40%',
        height: 40,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
    },
    buttonSalvaAddFoto: {
        marginTop: 20,
        borderRadius: 5,
        padding: 10,
        width: '40%',
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
    modalViewAddFoto: {
        width: '90%',
        margin: 20,
        backgroundColor: "#333337",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        elevation: 5
    },
    modalTextAddFoto: {
        marginBottom: 15,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    buttonContainerAddFotoBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonContainerAddFoto: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    fotoSelecionada: {
        flexDirection: 'row',
        width: '100%',
        height: 200,

    },
    buttonTextAddFoto: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonCancelAddFoto: {
        marginTop: 20,
        borderRadius: 5,
        padding: 10,
        width: '40%',
    },
    confirmButtonAddFoto: {
        backgroundColor: 'green',
    },
    cancelButtonAddFoto: {
        backgroundColor: 'red',
    },

    inputAddFoto: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 10,
        backgroundColor: "#fff",
        color: '#000',
        marginTop: 10,
    }




});

export default Casamento;
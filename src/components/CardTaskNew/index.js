import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "@expo/vector-icons/Ionicons";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";




import Verificado from "../../assets/svg/verificado.svg"
import Lixeira from "../../assets/svg/lixeira.svg"
import Editar from "../../assets/svg/editar.svg"
import FeatherIcon from "@expo/vector-icons/Feather";

const CardTaskNew = ({ id, name, removeTask, curr, handleToggleTaskCompletion, completo }) => {
    // const [checkList, setCheckList] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        // Animação de entrada
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        const handleTaskCompletion = async () => {
            // Verifica se o estado de tasks foi atualizado
            // e, em seguida, executa a ação de completar a tarefa
            if (tasks.length > 0) {
                const taskToComplete = tasks.find(task => task.id === id);
                if (taskToComplete) {
                    handleToggleTaskCompletion(id, curr);
                }
            }
        };
    
        handleTaskCompletion();
    }, [tasks]); // Executa sempre que o estado de tasks mudar
    

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem(curr + 'Tasks');
                if (savedTasks !== null) {
                    setTasks(JSON.parse(savedTasks));
                    console.log('Tarefas carregadas para a categoria ' + curr + ':', JSON.parse(savedTasks));
                } else {
                    console.log('Nenhuma tarefa encontrada para a categoria ' + curr);
                }
            } catch (error) {
                console.error('Erro ao carregar tarefas da categoria ' + curr + ':', error);
            }
        };
        loadTasks();
    }, [curr]); // Atualize as tarefas sempre que a categoria mudar

    const cardStyle = {
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                }),
            },
        ],
    };

    const buttonStyle = {
        transform: [
            {

                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0],
                }),

            },
        ],
    };

    function LeftActions(progress, dragX) {

        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0.5, 1],
            extrapolate: 'clamp',
        })

        return (
            <Animated.View style={[styles.leftActions, { transform: [{ scale }] }]}>

                <Editar width={27} height={25} />
                <Text style={styles.leftText}>Editar</Text>

            </Animated.View>

        )

    }

    function completed(array) {
        return array.find(task => task.id === id)?.completed == true ? true : false;
    }

    function RightActions(progress, dragX) {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, .9], // Invertendo a escala inicial e final
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[styles.rightActions, { transform: [{ scale }] }]}>
                <TouchableOpacity onPress={() => removeTask(id, curr)}>
                    <Animated.View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ scale }] }}>
                        <Lixeira width={20} height={24} />
                        <Animated.Text style={[styles.rightText, { transform: [{ scale }] }]}>Apagar</Animated.Text>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        );
    }
    return (
        <GestureHandlerRootView style={[{ flex: 1 }]}>
            <Swipeable
                renderLeftActions={LeftActions}
                renderRightActions={RightActions}
            >
                <Animated.View style={[styles.cardTask, cardStyle]}>
                    <View style={styles.cardMenu}>
                        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
                            {/* <TouchableOpacity onPress={() => handleToggleTaskCompletion(id, curr)}>
                                
                            </TouchableOpacity> */}

                            <TouchableOpacity onPress={() => {
                                handleToggleTaskCompletion(id, curr); // Chama a função para alterar o estado 'completed'
                                const updatedTasks = tasks.map(task => {
                                    if (task.id === id) {
                                        const updatedCompleted = task.completed === 0 ? 1 : 0; // Inverte o estado 'completed' da tarefa clicada
                                        return { ...task, completed: updatedCompleted };
                                    } else {
                                        return task;
                                    }
                                });
                                setTasks(updatedTasks); // Atualiza o estado 'tasks' com as tarefas atualizadas
                            }}>
                                <View style={tasks.find(task => task.id == id)?.completed == true ? styles.buttomCheckTrue : styles.buttomCheck}>
                                    {tasks.find(task => task.id == id)?.completed == true ? <Verificado width={15} height={15} style={styles.verificado} /> : null}
                                    {console.log(tasks.find(task => task.id == id)?.completed == true ? 'Completed ' + id : 'Not Completed ' + id)}
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={tasks.find(task => task.id == id)?.completed == true ? styles.cardTextOK : styles.cardText} numberOfLines={1} ellipsizeMode='tail'>{id} - {name} - {completo}

                            <FeatherIcon icon='check-circle' size={36} color={'#8fa7ba'} />
                        </Text>
                    </View>
                </Animated.View>

            </Swipeable>

        </GestureHandlerRootView>

    );

}

const styles = StyleSheet.create({
    backgroundCard: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: '#fff',
    },
    cardTask: {
        flexDirection: "row",
        width: "100%",
        height: 58,
        alignItems: "center",
        padding: 15,
        marginVertical: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff'
    },
    cardMenu: {
        justifyContent: "center",
        alignItems: "start",
        width: '10%',
    },
    cardBody: {
        justifyContent: "center",
        alignItems: "start",
        width: '83%',
    },
    cardFooter: {
        justifyContent: "center",
        alignItems: "flex-end",
        width: '7%',
    },
    cardText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333337',
    },
    cardTextOK: {
        fontSize: 10,
        fontWeight: '400',
        color: '#333337',
        fontStyle: 'italic',
        textDecorationLine: 'line-through',
    },
    buttomCheck: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#E5B006'
    },
    buttomCheckTrue: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: '#E5B006',
        borderWidth: 1,
        borderColor: '#E5B006'
    },
    verificado: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
    },
    leftActions: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        flexDirection: 'column',
        backgroundColor: "#6801FA",
        height: 58,
        alignItems: "center",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    leftText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        opacity: 0.7,
    },
    rightActions: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        flexDirection: 'column',
        backgroundColor: "#E55606",
        height: 58,
        alignItems: "center",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    rightText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        opacity: 0.7,
    }
});

export default CardTaskNew;

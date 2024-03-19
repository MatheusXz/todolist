import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Modal } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";

import Verificado from "../../assets/svg/verificado.svg"
import Lixeira from "../../assets/svg/lixeira.svg"
import Editar from "../../assets/svg/editar.svg"
import FeatherIcon from "@expo/vector-icons/Feather";

const Card3 = ({ id, name, removeTask, completo, setCompleted, editar }) => {
    // 

    const [modalVisible, setModalVisible] = useState(false);
    const [editedValue, setEditedValue] = useState(name);

    const [checkList, setCheckList] = useState(completo === 1);

    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        // Animação de entrada
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, []);

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
            <TouchableOpacity onPress={handleEdit} style={[styles.leftActions, { transform: [{ scale }] }]}>
                <Animated.View>

                    <Editar width={27} height={25} />
                    <Text style={styles.leftText}>Editar</Text>

                </Animated.View>
            </TouchableOpacity>
        )

    }
    function RightActions(progress, dragX) {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, .9], // Invertendo a escala inicial e final
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[styles.rightActions, { transform: [{ scale }] }]}>
                <TouchableOpacity onPress={() => removeTask(id)}>
                    <Animated.View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ scale }] }}>
                        <Lixeira width={20} height={24} />
                        <Animated.Text style={[styles.rightText, { transform: [{ scale }] }]}>Apagar</Animated.Text>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    const handleCheck = () => {
        setCheckList(!checkList);
        setCompleted(id, checkList ? 0 : 1);
    };

    const handleEdit = () => {
        setModalVisible(true);
    };

    const handleSubmitEdit = () => {
        // Aqui você pode lidar com a submissão da edição, por exemplo:
        editar(id, editedValue)
        setModalVisible(false); // Fechar o modal após a submissão
    };
    return (
        <GestureHandlerRootView style={[{ flex: 1 }]}>
            <Swipeable
                renderLeftActions={LeftActions}
                renderRightActions={RightActions}
            >
                <Animated.View style={[styles.cardTask, cardStyle]}>
                    <View style={styles.cardMenu}>
                        <Animated.View style={[styles.buttonContainer, buttonStyle]}>

                            <TouchableOpacity onPress={handleCheck}>

                                <View style={checkList ? styles.buttomCheckTrue : styles.buttomCheck}>

                                    {checkList ? <Verificado width={15} height={15} style={styles.verificado} /> : null}

                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                    <View style={styles.cardBody}>
                        <Text style={checkList ? styles.cardTextOK : styles.cardText} numberOfLines={1} ellipsizeMode='tail'>{name}
                            <FeatherIcon icon='check-circle' size={36} color={'#000'} />
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
                                <Text style={styles.modalText}>Editar elemento</Text>
                                <Text style={{ color: 'red' }}>Como estava: {name}</Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o novo nome"
                                    onChangeText={(text) => setEditedValue(text)}
                                    value={editedValue}
                                />

                                <View style={styles.buttonContainer}>

                                    <TouchableOpacity
                                        style={[styles.button, styles.confirmButton]}
                                        onPress={handleSubmitEdit}
                                    >
                                        <Text style={styles.buttonText}>Salvar</Text>
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


                </Animated.View>
            </Swipeable>
        </GestureHandlerRootView>

    );

}

const styles = StyleSheet.create({
    backgroundCard: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: '#1E1E1E',
    },
    cardTask: {
        alignSelf: "center",
        flexDirection: "row",
        width: "90%",
        height: 58,
        alignItems: "center",
        padding: 15,
        marginVertical: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: '#1E1E1E',
        borderWidth: 1,
        borderColor: '#1E1E1E'
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
        color: '#fff',
    },
    cardTextOK: {
        fontSize: 12,
        fontWeight: '400',
        color: '#20E7CF',
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
        borderColor: '#20E7CF'
    },
    buttomCheckTrue: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: '#20E7CF',
        borderWidth: 1,
        borderColor: '#20E7CF'
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
        backgroundColor: "#454545",
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
        backgroundColor: "#454545",
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
    },
    modalView: {
        width: '90%',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    input: {
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

export default Card3;

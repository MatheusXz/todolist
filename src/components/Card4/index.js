import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Modal, ScrollView, Image } from 'react-native';


// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Swipeable from "react-native-gesture-handler/Swipeable";

// import Verificado from "../../assets/svg/verificado.svg"
// import Lixeira from "../../assets/svg/lixeira.svg"
// import Editar from "../../assets/svg/editar.svg"
// import FeatherIcon from "@expo/vector-icons/Feather";

const Card4 = ({ id, name, removeTask, editar, img }) => {
    // 

    const [modalVisible, setModalVisible] = useState(false);
    const [editedValue, setEditedValue] = useState(name);
    const [animation] = useState(new Animated.Value(0));
    const [imageError, setImageError] = useState(null);





    useEffect(() => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleRemove = () => {
        Animated.timing(animation, {
            toValue: -1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            removeTask(id);
        });
    };

    const cardStyle = {
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                }),
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-200, 0], // Iniciar o cartão 200 unidades para a esquerda e trazer de volta para a posição original
                }),
            },
        ],
    };


    const handleEdit = () => {
        setModalVisible(true);
    };



    const handleSubmitEdit = () => {
        // Aqui você pode lidar com a submissão da edição, por exemplo:
        editar(id, editedValue)
        setModalVisible(false); // Fechar o modal após a submissão
    };

    const handleImageLoadError = (error) => {
        setImageError(error);
        console.error("Erro ao carregar a imagem:", error);
    };






    return (


        <Animated.View style={[styles.container, cardStyle]}>
            <View style={styles.header}>
                <Image
                    source={{ uri: img }}
                    style={styles.image}
                    resizeMode='cover'
                    onError={handleImageLoadError}
                />
                {/* {console.log(img)} */}

            </View>

            <View style={styles.body}>
                <Text style={styles.textName} numberOfLines={3} ellipsizeMode="tail">
                    {name}
                </Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.btnEdit} onPress={handleEdit}>
                    <Text style={styles.textBtnEdit} >
                        Edit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRemove} onPress={handleRemove}>
                    <Text style={styles.textBtnRemove}>
                        Remove
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Editar elemento</Text>
                        <Text style={{ color: '#ffffff', }}>
                            nome do item
                        </Text>
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



    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        height: 300,
        width: '100%',
        alignItems: 'center',
        elevation: 8

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 15,
        padding: 10,
    },
    body: {

        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    image: {
        justifyContent: 'center',
        width: '100%',
        height: 172,
        borderRadius: 10,
    },
    textName: {
        flexDirection: 'row',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        height: 65,
        color: '#fff',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
    btnEdit: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        height: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#454545',
    },
    btnRemove: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        height: 30,
        borderRadius: 10,
        backgroundColor: '#454545',
    },
    textBtnEdit: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
    textBtnRemove: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
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



    // const buttonStyle = {
    //     transform: [
    //         {

    //             translateX: animation.interpolate({
    //                 inputRange: [0, 1],
    //                 outputRange: [-100, 0],
    //             }),

    //         },
    //     ],
    // };

    // function LeftActions(progress, dragX) {

    //     const scale = dragX.interpolate({
    //         inputRange: [0, 100],
    //         outputRange: [0.5, 1],
    //         extrapolate: 'clamp',
    //     })

    //     return (
    //         <TouchableOpacity onPress={handleEdit} style={[styles.leftActions, { transform: [{ scale }] }]}>
    //             <Animated.View>

    //                 <Editar width={27} height={25} />
    //                 <Text style={styles.leftText}>Editar</Text>

    //             </Animated.View>
    //         </TouchableOpacity>
    //     )

    // }
    // function RightActions(progress, dragX) {
    //     const scale = dragX.interpolate({
    //         inputRange: [-100, 0],
    //         outputRange: [1, .9], // Invertendo a escala inicial e final
    //         extrapolate: 'clamp',
    //     });

    //     return (
    //         <Animated.View style={[styles.rightActions, { transform: [{ scale }] }]}>
    //             <TouchableOpacity onPress={() => removeTask(id)}>
    //                 <Animated.View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ scale }] }}>
    //                     <Lixeira width={20} height={24} />
    //                     <Animated.Text style={[styles.rightText, { transform: [{ scale }] }]}>Apagar</Animated.Text>
    //                 </Animated.View>
    //             </TouchableOpacity>
    //         </Animated.View>
    //     );
    // }

    // backgroundCard: {
    //     width: "100%",
    //     flexDirection: "row",
    //     backgroundColor: '#1E1E1E',
    // },
    // cardTask: {
    //     flexDirection: "row",
    //     width: "100%",
    //     height: 58,
    //     alignItems: "center",
    //     padding: 15,
    //     marginVertical: 5,
    //     shadowOffset: { width: 10, height: 10 },
    //     shadowOpacity: 1,
    //     shadowRadius: 15,
    //     elevation: 3,
    //     borderRadius: 10,
    //     backgroundColor: '#1E1E1E',
    //     borderWidth: 1,
    //     borderColor: '#1E1E1E'
    // },
    // cardMenu: {
    //     justifyContent: "center",
    //     alignItems: "start",
    //     width: '10%',
    // },
    // cardBody: {
    //     justifyContent: "center",
    //     alignItems: "start",
    //     width: '83%',
    // },
    // cardFooter: {
    //     justifyContent: "center",
    //     alignItems: "flex-end",
    //     width: '7%',
    // },
    // cardText: {
    //     fontSize: 12,
    //     fontWeight: 'bold',
    //     color: '#fff',
    // },
    // cardTextOK: {
    //     fontSize: 12,
    //     fontWeight: '400',
    //     color: '#67DB3F',
    //     fontStyle: 'italic',
    //     textDecorationLine: 'line-through',
    // },
    // buttomCheck: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: 25,
    //     height: 25,
    //     borderRadius: 25,
    //     backgroundColor: 'transparent',
    //     borderWidth: 1,
    //     borderColor: '#67DB3F'
    // },
    // buttomCheckTrue: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: 25,
    //     height: 25,
    //     borderRadius: 25,
    //     backgroundColor: '#67DB3F',
    //     borderWidth: 1,
    //     borderColor: '#67DB3F'
    // },
    // verificado: {
    //     position: 'absolute',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: 25,
    //     height: 25,
    // },
    // leftActions: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '20%',
    //     flexDirection: 'column',
    //     backgroundColor: "#454545",
    //     height: 58,
    //     alignItems: "center",
    //     padding: 15,
    //     marginVertical: 5,
    //     borderRadius: 10,
    // },
    // leftText: {
    //     fontSize: 8,
    //     fontWeight: 'bold',
    //     color: 'white',
    //     textAlign: 'center',
    //     opacity: 0.7,
    // },
    // rightActions: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '20%',
    //     flexDirection: 'column',
    //     backgroundColor: "#454545",
    //     height: 58,
    //     alignItems: "center",
    //     padding: 15,
    //     marginVertical: 5,
    //     borderRadius: 10,
    // },
    // rightText: {
    //     fontSize: 8,
    //     fontWeight: 'bold',
    //     color: 'white',
    //     textAlign: 'center',
    //     opacity: 0.7,
    // },
    // modalView: {
    //     width: '90%',
    //     margin: 20,
    //     backgroundColor: "#333337",
    //     borderRadius: 20,
    //     padding: 35,
    //     alignItems: "center",
    //     elevation: 5
    // },
    // modalText: {
    //     marginBottom: 15,
    //     textAlign: "center",
    //     color: "white",
    //     fontWeight: "bold",
    //     fontSize: 20
    // },
    // buttonContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     marginTop: 10,
    // },
    // button: {
    //     borderRadius: 10,
    //     paddingVertical: 10,
    //     width: '40%',
    // },
    // buttonText: {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     textAlign: 'center'
    // },
    // confirmButton: {
    //     backgroundColor: 'green',
    // },
    // cancelButton: {
    //     backgroundColor: 'red',
    // },
    // centeredView: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // },
    // input: {
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 5,
    //     padding: 10,
    //     width: '100%',
    //     marginBottom: 10,
    //     backgroundColor: "#fff",
    //     color: '#000',
    //     marginTop: 10,
    // }








    // <GestureHandlerRootView style={[{ flex: 1 }]}>
    //     <Swipeable
    //         renderLeftActions={LeftActions}
    //         renderRightActions={RightActions}
    //     >
    //         <Animated.View style={[styles.cardTask, cardStyle]}>
    //             <View style={styles.cardMenu}>
    //                 <Animated.View style={[styles.buttonContainer, buttonStyle]}>

    //                     <TouchableOpacity onPress={handleCheck}>

    //                         <View style={checkList ? styles.buttomCheckTrue : styles.buttomCheck}>

    //                             {checkList ? <Verificado width={15} height={15} style={styles.verificado} /> : null}

    //                         </View>
    //                     </TouchableOpacity>
    //                 </Animated.View>
    //             </View>

    //             <View style={styles.cardBody}>
    //                 <Text style={checkList ? styles.cardTextOK : styles.cardText} numberOfLines={1} ellipsizeMode='tail'>{name}
    //                     <FeatherIcon icon='check-circle' size={36} color={'#000'} />
    //                 </Text>
    //             </View>

    //             <Modal
    //                 animationType="slide"
    //                 transparent={true}
    //                 visible={modalVisible}
    //                 onRequestClose={() => {
    //                     setModalVisible(false);
    //                 }}
    //             >

    //                 <View style={styles.centeredView}>
    //                     <View style={styles.modalView}>
    //                         <Text style={styles.modalText}>Editar elemento</Text>
    //                         <Text style={{ color: 'red' }}>Como estava: {name}</Text>

    //                         <TextInput
    //                             style={styles.input}
    //                             placeholder="Digite o novo nome"
    //                             onChangeText={(text) => setEditedValue(text)}
    //                             value={editedValue}
    //                         />

    //                         <View style={styles.buttonContainer}>

    //                             <TouchableOpacity
    //                                 style={[styles.button, styles.confirmButton]}
    //                                 onPress={handleSubmitEdit}
    //                             >
    //                                 <Text style={styles.buttonText}>Salvar</Text>
    //                             </TouchableOpacity>
    //                             <TouchableOpacity
    //                                 style={[styles.button, styles.cancelButton]}
    //                                 onPress={() => setModalVisible(false)}
    //                             >
    //                                 <Text style={styles.buttonText}>Cancelar</Text>
    //                             </TouchableOpacity>
    //                         </View>
    //                     </View>
    //                 </View>
    //             </Modal>


    //         </Animated.View>
    //     </Swipeable>
    // </GestureHandlerRootView>
});

export default Card4;

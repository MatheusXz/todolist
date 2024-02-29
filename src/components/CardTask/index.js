import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

const CardTask = ({ id, name, status, removeTask }) => {
    const [checkList, setCheckList] = useState(false);
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

    return (
        <Animated.View style={[styles.cardTask, cardStyle]}>
            <View style={styles.cardMenu}>
                <Ionicons name="trash-outline" size={15} color={'#6C7A89'} onPress={() => removeTask(id)} />
            </View>
            <View style={styles.cardBody}>
                <Text style={checkList? styles.cardTextOK : styles.cardText}>{name}</Text>
            </View>
            <View style={styles.cardFooter}>
                <Animated.View style={[styles.buttonContainer, buttonStyle]}>
                    <TouchableOpacity onPress={() => setCheckList(!checkList)}>
                        <View style={checkList ? styles.buttomCheckTrue : styles.buttomCheck}></View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardTask: {
        flexDirection: "row",
        width: "100%",
        height: 45,
        alignItems: "center",
        padding: 10,
        marginVertical: 3,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 150,
        elevation: 3,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        borderTopStartRadius: 15,
        backgroundColor: '#333337',
        borderWidth: 1,
        borderColor: '#FFA84E'
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardTextOK: {
        fontSize: 15,
        fontWeight: '400',
        color: '#fff',
        fontStyle: 'italic',
        textDecorationLine: 'line-through',
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
});

export default CardTask;

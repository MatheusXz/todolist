import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import MenuSVG from '../../assets/svg/menu.svg';

const CardTask = ({ name }) => {
    const [checkList, setCheckList] = useState(false);
    return (

        <View style={styles.cardTask}>
            <View style={styles.cardMenu}>
                <MenuSVG width={9} height={19} />
            </View>
            <View>
                <Text style={styles.cardText}>{name}</Text>
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
            {
                checkList &&
                console.log(checkList) &&
                console.log(lista)
            }
        </View >
    )
}

const styles = StyleSheet.create({
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
});

export default CardTask;
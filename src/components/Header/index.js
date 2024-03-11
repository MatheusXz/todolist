import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Casamento from '../../assets/svg/casamento.svg';


export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.headerContext}>
                <View style={styles.headerContextLeft}>
                    <Text style={styles.headerTextTop}>Missões do</Text>
                    <Text style={styles.headerTextBottom}>Casamento J&M</Text>
                    <Text style={styles.headerTextBottom}>2024 💝💍</Text>
                </View>
                <Casamento />
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    header: {
        marginHorizontal: -20,
        height: 150,
        backgroundColor: '#6801FA',
        borderBottomEndRadius: 70,
        borderBottomStartRadius: 70,
        marginTop: 20,
    },
    headerContext: {
        marginHorizontal: 40,
        justifyContent: 'space-between',
        paddingTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContextCenter: {
        justifyContent: 'center',
        paddingVertical: 5,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerContextLeft: {
        justifyContent: 'center',
        paddingVertical: 5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    headerTextTop: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        opacity: 0.7,
    },
    headerTextBottom: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
    },
})
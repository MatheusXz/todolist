import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CardsList({ text, bgcolor, textColor, nameIcon, onPress, colorIcon }) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: bgcolor }]} onPress={onPress} >
            <Ionicons name={'ellipse'} style={{ position: "absolute", top: 5, right: 8, }} size={10} color={textColor} />
            <Ionicons name={nameIcon} size={20} color={colorIcon} />

            <Text style={[styles.textCenter, { color: "#fff" }]}>
                {text}
            </Text>

        </TouchableOpacity >
    );

}
const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
        elevation: 2,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        gap: 2,
        marginTop: 8,
        borderRadius: 10,
    },
    textCenter: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: 10,
    },

});
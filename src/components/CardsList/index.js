import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import Constants from 'expo-constants';
import Feather from "@expo/vector-icons/Feather";

export default function CardsList({ text, bgcolor, textColor, nameIcon, onPress, colorIcon }) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: bgcolor }]} onPress={onPress} >
            <Feather name={nameIcon} size={40} color={colorIcon} />

            <Text style={[styles.textCenter, { color: textColor }]}>
                {text}
            </Text>

        </TouchableOpacity >
    );

}
const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 130,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,        
        marginTop: Constants.statusBarHeight || 8,
        borderRadius: 10,
        padding: 10,
    },
    textCenter: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: 15,
        opacity: 0.7,
    },

});
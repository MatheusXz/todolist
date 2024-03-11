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
import FeatherIcon from "@expo/vector-icons/Feather";

export default function CardsList({ text, bgcolor, textColor, nameIcon, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: bgcolor }]} onPress={onPress} >

            <Text style={[styles.textCenter, { color: textColor }]}>
                {text}
            </Text>

            <FeatherIcon name={nameIcon} size={24} color="#fff" />
        </TouchableOpacity >
    );

}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'flex-end',
        justifyContent: 'space-between',
        marginTop: Constants.statusBarHeight || 8,
        borderRadius: 10,
        padding: 10,
    },
    textCenter: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 10
    },

});
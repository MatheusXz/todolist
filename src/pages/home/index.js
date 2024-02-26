import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants';

// SVG
import { SvgXml } from 'react-native-svg';
import StarSVG from '../../assets/svg/star.svg';

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContext}>
                    <Image style={styles.headerImage}
                        source={require('../../assets/jpg/person.jpg')}
                    />
                    <View>

                        <Text style={styles.headerTextTop}>07 fev 2024</Text>
                        <Text style={styles.headerTextBottom}>Olá, Matheus</Text>
                    </View>
                </View>
                <View style={styles.headerContext}>
                    <Text style={styles.headerTextCenter}>Concluidas</Text>
                    <View>
                        <SvgXml xml={StarSVG} width={40} height={40} />

                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: Constants.statusBarHeight || 8,
    },

    //  Header Section  -->
    header: {
        marginHorizontal: -20,
        height: '35%',
        backgroundColor: '#232323',
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30
    },
    headerContext: {
        marginHorizontal: 20,
        justifyContent: 'space-between',
        paddingVertical: Constants.statusBarHeight,
        flexDirection: 'row',
        alignItems: 'center'
        // backgroundColor: 'red',
    },
    headerTextTop: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        opacity: 0.7,
        // backgroundColor: 'blue',
    },
    headerTextBottom: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right'
        // backgroundColor: 'blue',
    },
    headerImage: {
        width: 70,
        height: 70,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: '#FFA84E'
    },
    headerTextCenter: {
        flex: 1,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
        opacity: 0.7,
        // backgroundColor: 'blue',
    }
});

export default Home;
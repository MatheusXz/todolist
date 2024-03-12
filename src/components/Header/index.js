import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Casamento from '../../assets/svg/casamento.svg';

export default function Header() {
    const [textArray, setTextArray] = useState(
        [
            '"Vós, mulheres, sujeitai-vos a vosso marido, como ao Senhor;"',
            '"porque o marido é a cabeça da mulher, como também Cristo é a cabeça da igreja, sendo ele próprio o salvador do corpo". Efésios 5:22-23',
            '"Vós, maridos, amai vossa mulher, como também Cristo amou a igreja e a si mesmo se entregou por ela." Efésios 5:25',
            '"Assim devem os maridos amar a sua própria mulher como a seu próprio corpo. Quem ama a sua mulher ama-se a si mesmo." Efésios 5:28',
            '"E Jesus disse-lhe: Amarás o Senhor, teu Deus, de todo o teu coração, e de toda a tua alma, e de todo o teu pensamento." Mateus 22:37',
            '"O SENHOR é o meu pastor; nada me faltará." Salmos 23:1',
            '"LEMBRA-TE do teu Criador nos dias da tua mocidade, antes que venham os maus dias, e cheguem os anos dos quais venhas a dizer: Não tenho neles contentamento;" Eclesiastes 12:1',
            '"Não ajunteis tesouros na terra, onde a traça e a ferrugem tudo consomem, e onde os ladrões minam e roubam." Mateus 6:19'

        ]
    ); // Array inicial de textos
    const [currentIndex, setCurrentIndex] = useState(0); // Índice atual do array

    useEffect(() => {
        // Função para atualizar o array de texto a cada 10 segundos
        const interval = setInterval(() => {
            setCurrentIndex(currentIndex => (currentIndex + 1) % textArray.length); // Avança para o próximo texto ou volta ao início do array
        }, 5000); // 10 segundos em milissegundos

        // Limpar o intervalo quando o componente for desmontado
        return () => clearInterval(interval);
    }, []); // Executar o efeito apenas uma vez, no momento da montagem do componente

    return (
        <View style={styles.header}>
            <View style={styles.headerContext}>
                <View style={styles.headerContextLeft}>
                    <Text style={styles.headerTextTop}>Missões do</Text>
                    <Text style={styles.headerTextBottom}>Casamento </Text>
                </View>
                <Casamento />
                {/* Exibe o texto atual */}
            </View>
            <View style={styles.headerContextCenter}>
                <Text style={styles.headerTextVersiculo}>{`${textArray[currentIndex]}`}</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginHorizontal: -20,
        height: 150,
        backgroundColor: '#250A03',
    },
    headerContext: {
        marginHorizontal: 40,
        justifyContent: 'space-between',
        padding: 20,
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
    headerText: {
        color: 'white',
        textAlign: 'right',
    },
    headerTextVersiculo: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 50,
        fontSize: 10,
    }
});
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export const Header = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo2.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Kiwanis Antibes Juan les pins concours photo</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        height: 90,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});


import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Styles } from '../assets/styles/HeaderStyle';

export const Header = () => {
    return (
        <View style={Styles.container}>
            <Image
                source={require('../assets/logo2.png')}
                style={Styles.image}
            />
            <Text style={Styles.text}>Kiwanis Antibes Juan les pins concours photo</Text>
        </View>
    );
};



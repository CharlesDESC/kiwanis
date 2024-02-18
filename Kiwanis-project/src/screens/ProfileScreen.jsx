import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ceci est le profil de l'utilisateur</Text>
            <Button title="Retour à l'accueil" onPress={handleGoBack} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
});

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../assets/styles/LoginScreenStyles";

export const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();

	const handleLogin = () => {
		// Logique de connexion ici
	};

	const goToRegister = () => {
		navigation.navigate("Register");
	};

	return (
		<View style={Styles.container}>
			<TextInput
				style={Styles.input}
				placeholder='Email'
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={Styles.input}
				placeholder='Mot de passe'
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<Button title='Se connecter' onPress={handleLogin} />
			<Button title="S'inscrire" onPress={goToRegister} />
		</View>
	);
};



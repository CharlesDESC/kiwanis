import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../../firebaseConfig"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			Alert.alert("Succès", "Connexion réussie");
			navigation.navigate("Main", { screen: "AddPicture" });		} catch (error) {
			Alert.alert("Erreur de connexion", error.message);
		}
	};

	const goToRegister = () => {
		navigation.navigate("Register"); 
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='Email'
				value={email}
				autoCompleteType="email"
				keyboardType="email-address"
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	input: {
		width: "100%",
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 8,
	},
});

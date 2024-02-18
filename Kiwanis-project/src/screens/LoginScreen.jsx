import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

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
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='Email'
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder='Mot de passe'
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<View style={styles.buttonContainer}>
				<Button mode='contained' onPress={handleLogin}>
					Se connecter
				</Button>
				<Button mode='contained' onPress={goToRegister}>
					S'inscrire
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
		alignSelf: "center",
		rowGap: 10,
	},
	input: {
		width: "100%",
	},
	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

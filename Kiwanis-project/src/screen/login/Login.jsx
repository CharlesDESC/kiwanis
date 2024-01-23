import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = ({ toggleAuthMode }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const Auth = auth;

	const handleLogin = async () => {
		setIsLoading(true);
		console.log(username, password);
		console.log(Auth);
		try {
			const response = await signInWithEmailAndPassword(
				Auth,
				username,
				password
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='Username'
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder='Password'
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<Button title='Login' onPress={handleLogin} />
			<Button title='Register' onPress={toggleAuthMode} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		width: "80%",
		height: 40,
		borderWidth: 1,
		borderColor: "gray",
		marginBottom: 10,
		paddingHorizontal: 10,
	},
});

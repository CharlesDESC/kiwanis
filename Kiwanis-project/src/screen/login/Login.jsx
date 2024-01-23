import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export const Login = ({ toggleAuthMode }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		// Logic for handling login
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

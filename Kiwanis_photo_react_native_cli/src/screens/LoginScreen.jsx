import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";

import { getDocs, where, collection } from "firebase/firestore";

import { TextInput, Button } from "react-native-paper";
import { useLogContext } from "../contexts/IsLogContext";

export const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();
	const { setIsLogged } = useLogContext();

	const handleLogin = async () => {
		try {
			const userRow = await getDocs(
				collection(db, "mailActivations"),
				where("email", "==", email)
			);
			console.log(userRow.docs[0].data().authorized);
		} catch (error) {
			console.log(error);
		}

		try {
			await signInWithEmailAndPassword(auth, email, password);
			Alert.alert("Succès", "Connexion réussie");
			setIsLogged(true);
			navigation.reset({
				index: 0,
				routes: [{ name: "Home" }],
			});
		} catch (error) {
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
				<Button mode='contained' onPress={goToRegister}>
					S'inscrire
				</Button>
				<Button mode='contained' onPress={handleLogin}>
					Se connecter
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

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useChild } from "../../contexts/ChildContext";
import { auth } from "../../../firebaseConfig";
import {
	fetchSignInMethodsForEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";

export const ValidChildScreen = () => {
	const Auth = auth;
	const { email } = useChild();

	useEffect(() => {
		const checkEmailExists = async () => {
			try {
				const result = await fetchSignInMethodsForEmail(Auth, email);
				console.log("result", result);
				// Gérer le résultat ici
			} catch (error) {
				console.error("Erreur lors de la vérification de l'email :", error);
			}
		};

		checkEmailExists();
	}, [email]);

	console.log(email);

	const testLogin = async () => {
		const username = "a@a.com";
		const password = "test123";
		try {
			const response = await signInWithEmailAndPassword(
				Auth,
				username,
				password
			);
			console.log(response);
			setIsLogged("true");
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View>
			<Text>Validation Screen</Text>
			<Button
				title='Validate'
				onPress={() => console.log("Validation button pressed")}
			/>
			<Button onPress={testLogin}>bujiezfbhi</Button>
		</View>
	);
};

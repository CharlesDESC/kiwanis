import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useChild } from "../../contexts/ChildContext";
import { auth, db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from "firebase/auth";

export const ValidChildScreen = () => {
	const Auth = auth;
	const { email } = useChild();

	const test = async () => {
		try {
			const docRef = addDoc(collection(db, "users"), {
				email: "a@a.com",
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	useEffect(() => {
		const checkEmailExists = async () => {
			try {
				console.log(email);
				const result = await fetchSignInMethodsForEmail(Auth, email);
				if (result && result.length > 0) {
					console.log("Email déjà utilisé");
				} else {
					console.log("Email non utilisé");
				}
			} catch (error) {
				console.error("Erreur lors de la vérification de l'email :", error);
			}
		};

		checkEmailExists();
	}, [email]);

	const testSignUp = async () => {
		const password = "test123";
		try {
			const response = await createUserWithEmailAndPassword(
				Auth,
				email,
				password
			);
			console.log(response);
			// Utilisez la réponse pour accéder aux détails de l'utilisateur si nécessaire
		} catch (error) {
			console.error("Erreur lors de la création du compte :", error);
		}
	};

	return (
		<View>
			<Text>Validation Screen</Text>
			<Button
				title='Validate'
				onPress={() => console.log("Validation button pressed")}
			/>
			<Button onPress={test}>Sign Up</Button>
		</View>
	);
};
import React, { useState,useEffect } from "react";
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
	const { email,password, lastName, firstName, dateOfBirth, phone, cat } = useChild();
	const [accountCreated, setAccountCreated] = useState(false);
	useEffect(() => {
		const checkEmailExists = async () => {
			try {
				const result = await fetchSignInMethodsForEmail(Auth, email, password);
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

	const handleSaveToFirestore = async () => {
		try {
			const docRef = await addDoc(collection(db, "users"), {
				email: email,
				password:password,
				lastName: lastName,
				firstName: firstName,
				dateOfBirth: dateOfBirth,
				phone: phone,
				cat: cat,
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (error) {
			console.error("Error adding document: ", error);
		}
	};
	console.log("Informations de l'enfant :", { email, password, lastName, firstName, dateOfBirth, phone, cat });

	const handleSignUp = async () => {
		if (accountCreated) {
            console.log("Le compte a déjà été créé.");
            return;
        }
        
		try {
			const response = await createUserWithEmailAndPassword(Auth, email,password);
			console.log("Compte créé avec succès :", response);
			setAccountCreated(true);
		} catch (error) {
			console.error("Erreur lors de la création du compte :", error);
		}
	};

	return (
		<View>
			<Text>Validation Screen</Text>
			<Button 
  mode="contained" 
  onPress={handleSaveToFirestore}
  style={{ backgroundColor: 'blue', marginVertical: 10, padding: 10, borderRadius: 5 }}
  labelStyle={{ color: 'white', fontSize: 16 }}
>
  Valider
</Button>

<Button 
  mode="contained" 
  onPress={handleSignUp} 
  style={{ backgroundColor: 'green', marginVertical: 10, padding: 10, borderRadius: 5 }}
  labelStyle={{ color: 'white', fontSize: 16 }}
>
  S'inscrire
</Button>
		</View>
	);
};

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useChild } from "../../contexts/ChildContext";
import { auth, db } from "../../../firebaseConfig";
import {
	collection,
	query,
	where,
	getDocs,
	addDoc,
	and,
} from "firebase/firestore";
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export const ValidChildScreen = () => {
	const Auth = auth;
	const { email, password, lastName, firstName, dateOfBirth, phone, cat } =
		useChild();
	const navigation = useNavigation();

	const [accountCreated, setAccountCreated] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [isActivated, setIsActivated] = useState(false);
	const [id, setId] = useState("");

	useEffect(() => {
		const checkEmailExists = async () => {
			try {
				const activatedQuery = query(
					collection(db, "users"),
					where("email", "==", email),
					where("activated", "==", true)
				);
				const activatedQuerySnapshot = await getDocs(activatedQuery);
				if (!activatedQuerySnapshot.empty) {
					console.log("E-mail déjà utilisé et activé :", email);
					setEmailExists(true);
					setIsActivated(true);
					return;
				}
				const unactivatedQuery = query(
					collection(db, "users"),
					where("email", "==", email)
				);
				const unactivatedQuerySnapshot = await getDocs(unactivatedQuery);
				if (!unactivatedQuerySnapshot.empty) {
					console.log("E-mail déjà utilisé mais non activé :", email);
					setEmailExists(true);
					setIsActivated(false);
					return;
				}
				console.log("E-mail non utilisé");
				handleSaveToFirestore();
			} catch (error) {
				console.error("Erreur lors de la recherche de l'e-mail :", error);
			}
		};

		checkEmailExists();
	}, [email]);

	const handleSaveToFirestore = async () => {
		try {
			const docRef = await addDoc(collection(db, "users"), {
				email: email,
				password: password,
				lastName: lastName,
				firstName: firstName,
				dateOfBirth: dateOfBirth,
				phone: phone,
				cat: cat,
			});
			console.log("Document written with ID: ", docRef.id);
			setId(docRef.id);
		} catch (error) {
			console.error("Error adding document: ", error);
		}
	};

	const handleSignUp = async () => {
		if (accountCreated) {
			console.log("Le compte a déjà été créé.");
			return;
		}

		try {
			const response = await createUserWithEmailAndPassword(
				Auth,
				email,
				password
			);
			console.log("Compte créé avec succès :", response);
			setAccountCreated(true);
		} catch (error) {
			console.error("Erreur lors de la création du compte :", error);
		}
	};

	console.log({
		email,
		password,
		lastName,
		firstName,
		dateOfBirth,
		phone,
		cat,
	});

	if (emailExists && isActivated) {
		return (
			<View>
				<Text>L'adresse e-mail existe déjà.</Text>
				<Button mode='contained' onPress={() => navigation.popToTop()}>
					Retour
				</Button>
			</View>
		);
	}

	return (
		<View>
			<Button
				mode='contained'
				onPress={() => navigation.navigate("Parent", { childID: id })}
			>
				Valider
			</Button>
		</View>
	);
};

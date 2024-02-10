import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
// import firestore from '@react-native-firebase/firestore';

export const ParentScreen = ({ route, navigation }) => {
	const { childId } = route.params; // Assurez-vous de passer l'ID de l'enfant comme paramètre lors de la navigation
	const [parentName, setParentName] = useState("");
	const [parentEmail, setParentEmail] = useState("");

	const handleSubmit = async () => {
		try {
			// Ajouter les informations parentales dans Firestore
			await firestore().collection("parentApprovals").add({
				childId,
				parentName,
				parentEmail,
				status: "pending", // Vous pouvez utiliser ce champ pour gérer l'état d'approbation
			});

			console.log("Demande d'approbation envoyée avec succès.");
			// Vous pouvez ensuite naviguer vers un écran de confirmation ou afficher un message
			navigation.goBack(); // Exemple de navigation
		} catch (error) {
			console.error(
				"Erreur lors de l'envoi de la demande d'approbation:",
				error
			);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				label='Nom du parent'
				value={parentName}
				onChangeText={setParentName}
				style={styles.input}
			/>
			<TextInput
				label='Email du parent'
				value={parentEmail}
				onChangeText={setParentEmail}
				style={styles.input}
				keyboardType='email-address'
			/>
			<Button mode='contained' onPress={handleSubmit}>
				Envoyer la demande
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
	input: {
		marginBottom: 20,
	},
});

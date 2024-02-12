import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// import firestore from '@react-native-firebase/firestore';

export const ValidParentScreen = ({ route }) => {
	const { childId } = route.params;

	const handleApproval = async (approved) => {
		// Mettre à jour le statut d'approbation dans Firestore
		try {
			await firestore()
				.collection("parentApprovals")
				.doc(childId)
				.update({
					status: approved ? "approved" : "rejected",
				});
			alert(`Vous avez ${approved ? "approuvé" : "rejeté"} l'inscription.`);
			// Naviguez ensuite vers l'écran d'accueil ou ailleurs
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'approbation:", error);
			alert("Erreur lors de la mise à jour. Veuillez réessayer.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Demande d'Inscription</Text>
			<Text style={styles.text}>
				Votre enfant souhaite participer au concours photo et a besoin de votre
				approbation.
			</Text>
			<View style={styles.buttons}>
				<Button title='Approuver' onPress={() => handleApproval(true)} />
				<Button title='Rejeter' onPress={() => handleApproval(false)} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
});

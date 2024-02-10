import React from "react";
import { View, Text, Button } from "react-native";
import { Styles } from "../../assets/styles/ValidParentScreenStyle";
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
		<View style={Styles.container}>
			<Text style={Styles.title}>Demande d'Inscription</Text>
			<Text style={Styles.text}>
				Votre enfant souhaite participer au concours photo et a besoin de votre
				approbation.
			</Text>
			<View style={Styles.buttons}>
				<Button title='Approuver' onPress={() => handleApproval(true)} />
				<Button title='Rejeter' onPress={() => handleApproval(false)} />
			</View>
		</View>
	);
};



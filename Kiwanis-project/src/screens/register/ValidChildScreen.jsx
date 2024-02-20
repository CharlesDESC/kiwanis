import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const ValidChildScreen = ({ route, navigation }) => {
	const { userUid } = route.params;

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Compte créé avec succès ! UID: {userUid}</Text>
			{/* Ajoutez ici d'autres logiques ou boutons selon vos besoins */}
			<Button
				title="Retour à l'accueil"
				onPress={() => {
					navigation.reset({
						index: 0,
						routes: [{ name: "Welcome" }],
					});
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 16,
		marginBottom: 20,
	},
});

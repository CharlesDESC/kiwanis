import React, { useState } from "react";
import { View, StyleSheet, Alert, Image, Text } from "react-native";
import { TextInput, Button, Dialog, Portal, List } from "react-native-paper";
// import firestore from "@react-native-firebase/firestore";

export const RegisterChildScreen = ({ navigation }) => {
	const [childFirstName, setChildFirstName] = useState("");
	const [childLastName, setChildLastName] = useState("");
	const [childDateOfBirth, setChildDateOfBirth] = useState("");
	const [childEmail, setChildEmail] = useState("");
	const [childPhone, setChildPhone] = useState("");
	const [schoolName, setSchoolName] = useState("");
	const [category, setCategory] = useState("");
	const [visible, setVisible] = useState(false);
	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);

	const handleRegisterChild = async () => {
		const today = new Date();
		const birthDate = new Date(childDateOfBirth);
		let age = today.getFullYear() - birthDate.getFullYear();
		const month = today.getMonth() - birthDate.getMonth();
		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		try {
			const docRef = await firestore().collection("children").add({
				firstName: childFirstName,
				lastName: childLastName,
				dateOfBirth: childDateOfBirth,
				email: childEmail,
				phone: childPhone,
				schoolName: schoolName,
				category: category,
				// Vous pouvez ajouter d'autres champs nécessaires ici
			});

			if (age < 15) {
				console.log("Validation parentale nécessaire");
				// Passer l'ID du document (enfant) à ParentScreen pour la validation parentale
				navigation.navigate("ParentScreen", { childId: docRef.id });
			} else {
				console.log(
					"Pas besoin de validation parentale. Aller à l'écran d'upload de photo"
				);
				// Naviguer vers un écran approprié pour les enfants de 15 ans et plus
				navigation.navigate("AddPictureScreen");
			}
		} catch (error) {
			console.error("Erreur lors de l'enregistrement de l'enfant:", error);
			Alert.alert(
				"Erreur",
				"Une erreur est survenue lors de l'enregistrement. Veuillez réessayer."
			);
		}
	};
	const formatDateInputFR = (value) => {
		// Supprime tout ce qui n'est pas un chiffre
		const numbers = value.replace(/[^0-9]/g, "");

		// Construit le format JJ-MM-AAAA avec des tirets
		let day = numbers.slice(0, 2);
		let month = numbers.slice(2, 4);
		let year = numbers.slice(4, 8);

		// Ajoute des tirets entre JJ, MM et AAAA
		const formatted = `${day}${month ? "-" : ""}${month}${
			year ? "-" : ""
		}${year}`;

		return formatted;
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				label="Nom de l'enfant"
				value={childLastName}
				onChangeText={setChildLastName}
			/>
			<TextInput
				style={styles.input}
				label="Prénom de l'enfant"
				value={childFirstName}
				onChangeText={setChildFirstName}
			/>
			<TextInput
				style={styles.input}
				label='Date de naissance (JJ-MM-AAAA)'
				value={childDateOfBirth}
				onChangeText={(text) => setChildDateOfBirth(formatDateInputFR(text))}
				keyboardType='numeric'
			/>

			<TextInput
				style={styles.input}
				label='Email'
				value={childEmail}
				onChangeText={setChildEmail}
				keyboardType='email-address'
			/>
			<TextInput
				style={styles.input}
				label='Téléphone'
				value={childPhone}
				onChangeText={setChildPhone}
				keyboardType='phone-pad'
			/>
			<TextInput
				style={styles.input}
				label="Nom de l'école"
				value={schoolName}
				onChangeText={setSchoolName}
			/>
			<Button
				mode='outlined'
				onPress={showDialog}
				contentStyle={styles.fakeInputContent}
				labelStyle={styles.fakeInputLabel}
				style={styles.fakeInput}
				icon='menu-down'
			>
				{category || "Choisir une catégorie"}
			</Button>

			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>Choisir une catégorie</Dialog.Title>
					<Dialog.Content>
						{["École", "Collège", "Lycée"].map((cat) => (
							<List.Item
								key={cat}
								title={cat}
								onPress={() => {
									setCategory(cat);
									hideDialog();
								}}
							/>
						))}
					</Dialog.Content>
				</Dialog>
			</Portal>
			<Button mode='contained' onPress={handleRegisterChild}>
				Valider
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	input: {
		width: "100%",
		marginBottom: 10,
	},
	logo: {
		width: 150,
		height: 150,
	},
	fakeInput: {
		width: "100%",
		marginBottom: 10,
		borderColor: "grey", // Pour simuler le bord d'un TextInput
	},
	fakeInputContent: {
		height: 58, // Hauteur standard d'un TextInput
	},
	fakeInputLabel: {
		lineHeight: 58, // Aligner le texte verticalement
	},
	paragraph: {
		textAlign: "center", // Centre le texte
		marginBottom: 20, // Espacement avant le reste du formulaire
		fontSize: 16, // Taille de la police
	},
});

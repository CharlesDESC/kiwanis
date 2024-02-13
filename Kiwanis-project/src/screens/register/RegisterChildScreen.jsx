import React, { useState, useRef } from "react";
import {
	View,
	StyleSheet,
	Alert,
	Image,
	Text,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button, Dialog, Portal, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useChild } from "../../contexts/ChildContext";

export const RegisterChildScreen = ({ navigation }) => {
	const [childFirstName, setChildFirstName] = useState("");
	const [childLastName, setChildLastName] = useState("");
	const [childDateOfBirth, setChildDateOfBirth] = useState("");
	const [childEmail, setChildEmail] = useState("");
    const [childPassword, setChildPassword]=useState("");
	const [childPhone, setChildPhone] = useState("");
	const [category, setCategory] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);

	const [visible, setVisible] = useState(false);
	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);

	const scrollViewRef = useRef();

	const {
		setLastName,
		setFirstName,
		setDateOfBirth,
		setEmail,
        setPassword,
		setPhone,
		setCat,
	} = useChild();

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		const formattedDate = `${currentDate
			.getDate()
			.toString()
			.padStart(2, "0")}/${(currentDate.getMonth() + 1)
			.toString()
			.padStart(2, "0")}/${currentDate.getFullYear()}`;
		console.log(
			currentDate.getDate(),
			currentDate.getMonth(),
			currentDate.getFullYear()
		);
		console.log("selectedDate" + formattedDate);
		setDate(currentDate);
		setChildDateOfBirth(formattedDate);
	};
	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const handleRegisterChild = () => {
		console.log("pouet");
		setLastName(childLastName);
		setFirstName(childFirstName);
		setDateOfBirth(childDateOfBirth);
		setEmail(childEmail);
        setChildPassword(childPassword)
		setPhone(childPhone);
		setCat(category);
		if (2024 - date.getFullYear() > 15) {
			navigation.navigate("ValidChild");
		}

		// navigation.navigate("ValidChild");
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : null}
			keyboardVerticalOffset={Platform.OS === "ios" ? 250 : 0}
		>
			<ScrollView
				ref={scrollViewRef}
				style={styles.scrollView}
				contentContainerStyle={styles.scrollViewContainer}
			>
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
				<Button title='Open' onPress={showDatepicker}>
					{childDateOfBirth === "" ? "selectionner une date" : childDateOfBirth}
				</Button>
				{show && (
					<DateTimePicker
						testID='dateTimePicker'
						value={date}
						mode={mode}
						is24Hour={true}
						onChange={onChange}
					/>
				)}

				<TextInput
					style={styles.input}
					label='Email'
					value={childEmail}
					onChangeText={setChildEmail}
					keyboardType='email-address'
				/>
                <TextInput
                    style={styles.input}
                    label='Mot de passe'
                    value={childPassword}
                    onChangeText={setChildPassword}
                    secureTextEntry={true} // Pour masquer le texte du mot de passe
                />
				<TextInput
					style={styles.input}
					label='Téléphone'
					value={childPhone}
					onChangeText={setChildPhone}
					keyboardType='phone-pad'
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
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	scrollView: {
		width: "100%",
	},
	scrollViewContainer: {
		flexGrow: 1,
		justifyContent: "center",
		padding: 20,
	},
	inner: {
		justifyContent: "center",
		alignItems: "center",
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
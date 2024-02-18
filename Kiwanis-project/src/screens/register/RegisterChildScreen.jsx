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
	const [pass, setPass] = useState("");
	const [childPhone, setChildPhone] = useState("");
	const [category, setCategory] = useState("");

	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [dateOfBirthError, setDateOfBirthError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [categoryError, setCategoryError] = useState(false);

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
		setPhone,
		setCat,
		setPassword,
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
		if (childLastName === "") {
			console.log("last name error");
			setLastNameError(true);
			return;
		}
		if (childFirstName === "") {
			console.log("first name error");
			setFirstNameError(true);
			return;
		}
		if (childDateOfBirth === "") {
			console.log("date of birth error");
			setDateOfBirthError(true);
			return;
		}
		if (childEmail === "") {
			console.log("email error");
			setEmailError(true);
			return;
		}
		if (pass === "") {
			console.log("password error");
			setPasswordError(true);
			return;
		}
		if (childPhone === "") {
			console.log("phone error");
			setPhoneError(true);
			return;
		}
		if (category === "") {
			console.log("category error");
			setCategoryError(true);
			return;
		}
		console.log("valid check");
		setLastName(childLastName);
		setFirstName(childFirstName);
		setDateOfBirth(childDateOfBirth);
		setEmail(childEmail);
		setPassword(pass);
		setPhone(childPhone);
		setCat(category);

		if (2024 - date.getFullYear() > 15) {
			console.log("L'enfant a plus de 15 ans");
			navigation.navigate("ValidChild");
		} else {
			console.log("L'enfant a moins de 15 ans");
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
					onChangeText={(text) => {
						setChildLastName(text);
						if (text === "") {
							setLastNameError(true);
						} else {
							setLastNameError(false);
						}
					}}
					error={lastNameError}
				/>
				<TextInput
					style={styles.input}
					label="Prénom de l'enfant"
					value={childFirstName}
					onChangeText={(text) => {
						setChildFirstName(text);
						if (text === "") {
							setFirstNameError(true);
						} else {
							setFirstNameError(false);
						}
					}}
					error={firstNameError}
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
					keyboardType='email-address'
					onChangeText={(text) => {
						setChildEmail(text);
						if (text === "") {
							setEmailError(true);
						} else {
							setEmailError(false);
						}
					}}
					error={emailError}
				/>
				<TextInput
					style={styles.input}
					label='Mot de passe'
					value={pass}
					secureTextEntry={true} // Pour masquer le texte du mot de passe
					onChangeText={(text) => {
						setPass(text);
						if (text === "") {
							setPasswordError(true);
						} else {
							setPasswordError(false);
						}
					}}
					error={passwordError}
				/>
				<TextInput
					style={styles.input}
					label='Téléphone'
					value={childPhone}
					keyboardType='phone-pad'
					onChangeText={(text) => {
						setChildPhone(text);
						if (text === "") {
							setPhoneError(true);
						} else {
							setPhoneError(false);
						}
					}}
					error={phoneError}
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

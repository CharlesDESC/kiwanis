import React, { useState } from "react";
import { View, Alert} from "react-native";
import { TextInput, Button, Dialog, Portal, List  } from "react-native-paper";
import { Styles } from "../../assets/styles/RegisterChildScreenStyle";
import { Header } from "../../components/Header";
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
        const numbers = value.replace(/[^0-9]/g, '');
      
        // Construit le format JJ-MM-AAAA avec des tirets
        let day = numbers.slice(0, 2);
        let month = numbers.slice(2, 4);
        let year = numbers.slice(4, 8);
      
        // Ajoute des tirets entre JJ, MM et AAAA
        const formatted = `${day}${month ? '-' : ''}${month}${year ? '-' : ''}${year}`;
      
        return formatted;
      };
      
      
	return (
		<View style={Styles.container}>
          <Header/>
			<TextInput
				style={Styles.input}
				label="Nom de l'enfant"
				value={childLastName}
				onChangeText={setChildLastName}
			/>
			<TextInput
				style={Styles.input}
				label="Prénom de l'enfant"
				value={childFirstName}
				onChangeText={setChildFirstName}
			/>
			<TextInput
            style={Styles.input}
            label="Date de naissance (JJ-MM-AAAA)"
            value={childDateOfBirth}
            onChangeText={(text) => setChildDateOfBirth(formatDateInputFR(text))}
            keyboardType="numeric"
            />


			<TextInput
				style={Styles.input}
				label='Email'
				value={childEmail}
				onChangeText={setChildEmail}
				keyboardType='email-address'
			/>
			<TextInput
				style={Styles.input}
				label='Téléphone'
				value={childPhone}
				onChangeText={setChildPhone}
				keyboardType='phone-pad'
			/>
			<TextInput
				style={Styles.input}
				label="Nom de l'école"
				value={schoolName}
				onChangeText={setSchoolName}
			/>
	  <Button 
        mode="outlined" 
        onPress={showDialog} 
        contentStyle={Styles.fakeInputContent} 
        labelStyle={Styles.fakeInputLabel} 
        style={Styles.fakeInput}
        icon="menu-down"
      >
        {category || 'Choisir une catégorie'}
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Choisir une catégorie</Dialog.Title>
          <Dialog.Content>
            {['École', 'Collège', 'Lycée'].map((cat) => (
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


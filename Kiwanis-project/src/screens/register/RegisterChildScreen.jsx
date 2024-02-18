import React, { useState } from "react";
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Platform, Alert, Button as RNButton } from "react-native";
import { Button, TextInput, Dialog, Portal, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const categories = ["École", "Collège", "Lycée"];

export const RegisterChildScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        category: "",
        parentEmail: "",
    });
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleRegister = async () => {
        const age = calculateAge(dateOfBirth);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            // Excluez le mot de passe des données à enregistrer dans Firestore
            const { password, ...userDataWithoutPassword } = formData;
    
            if (age < 15) {
                const activationCode = uuidv4();
                // Ajoutez ici les informations de l'utilisateur, sans le mot de passe, à 'mailActivations'
                await addDoc(collection(db, "mailActivations"), {
                    to: formData.parentEmail,
                    message: {
                        subject: "Activation du compte nécessaire",
                        html: `Bonjour, <br> Pour activer le compte de ${formData.firstName}, veuillez cliquer sur le lien suivant: <a href="https://your-activation-link.com?uid=${userCredential.user.uid}&code=${activationCode}">Activer le compte</a>.`,
                    },
                    activationCode,
                    uid: userCredential.user.uid,
                    authorized: false,
                    ...userDataWithoutPassword, // Utilisez les données sans le mot de passe
                });
                Alert.alert("Inscription en attente", "Un email de consentement a été envoyé au parent.");
            } else {
                // Ajoutez ici les informations de l'utilisateur, sans le mot de passe, à 'users'
                await addDoc(collection(db, "users"), {
                    ...userDataWithoutPassword, // Utilisez les données sans le mot de passe
                    dateOfBirth: dateOfBirth.toISOString(),
                    activated: true,
                });
                navigation.navigate("ValidChild", { userUid: userCredential.user.uid });
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            Alert.alert("Erreur d'inscription", error.message);
        }
    };
    

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const onConfirmDateOfBirth = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDateOfBirth(selectedDate);
            setFormData({ ...formData, dateOfBirth: selectedDate.toISOString().split('T')[0] });
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <TextInput
                    label="Prénom"
                    value={formData.firstName}
                    onChangeText={text => setFormData({ ...formData, firstName: text })}
                    style={styles.input}
                />
                <TextInput
                    label="Nom"
                    value={formData.lastName}
                    onChangeText={text => setFormData({ ...formData, lastName: text })}
                    style={styles.input}
                />
                <TextInput
                    label="Email"
                    value={formData.email}
                    onChangeText={text => setFormData({ ...formData, email: text })}
                    style={styles.input}
                    keyboardType="email-address"
                />
                <TextInput
                    label="Mot de passe"
                    value={formData.password}
                    onChangeText={text => setFormData({ ...formData, password: text })}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    label="Téléphone"
                    value={formData.phone}
                    onChangeText={text => setFormData({ ...formData, phone: text })}
                    style={styles.input}
                    keyboardType="phone-pad"
                />
                <TextInput
                    label="Email du parent (pour les utilisateurs de moins de 15 ans)"
                    value={formData.parentEmail}
                    onChangeText={text => setFormData({ ...formData, parentEmail: text })}
                    style={styles.input}
                    keyboardType="email-address"
                />
                <Button mode="outlined" onPress={() => setDialogVisible(true)} style={styles.input}>
                    {formData.category || "Choisir une catégorie"}
                </Button>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                        <Dialog.Title>Choisir une catégorie</Dialog.Title>
                        <Dialog.Content>
                            {categories.map((category) => (
                                <List.Item
                                    key={category}
                                    title={category}
                                    onPress={() => {
                                        setFormData({ ...formData, category });
                                        setDialogVisible(false);
                                    }}
                                />
                            ))}
                        </Dialog.Content>
                    </Dialog>
                </Portal>
                <Button onPress={() => setShowDatePicker(true)} style={styles.input}>
                    Sélectionner la date de naissance
                </Button>
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateOfBirth}
                        mode="date"
                        display="default"
                        onChange={onConfirmDateOfBirth}
                    />
                )}
                <Button mode="contained" onPress={handleRegister} style={styles.button}>
                    S'inscrire
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 12,
    },
});

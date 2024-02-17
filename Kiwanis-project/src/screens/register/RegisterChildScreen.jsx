import React, { useState } from "react";
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Button, TextInput, Dialog, Portal, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig"; // Vérifiez que ces chemins sont corrects

const categories = ["École", "Collège", "Lycée"];

export const RegisterChildScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        category: "",
    });
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    const onConfirmDateOfBirth = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDateOfBirth(selectedDate);
        }
    };

    const handleRegister = async () => {
        const age = calculateAge(dateOfBirth);
        if (age < 15) {
            Alert.alert("Inscription refusée", "Vous devez avoir au moins 15 ans pour vous inscrire.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("Utilisateur créé avec Firebase Auth :", userCredential.user.uid);

            const { password, ...userDataWithoutPassword } = formData; // Exclure le mot de passe
            await addDoc(collection(db, "users"), {
                uid: userCredential.user.uid,
                ...userDataWithoutPassword,
                dateOfBirth: dateOfBirth.toISOString(),
            });
            console.log("Données utilisateur (sans mot de passe) enregistrées dans Firestore");

            navigation.navigate("ValidChild", { userUid: userCredential.user.uid });
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

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <TextInput
                    label="Prénom"
                    value={formData.firstName}
                    onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                    style={styles.input}
                />
                <TextInput
                    label="Nom"
                    value={formData.lastName}
                    onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                    style={styles.input}
                />
                <TextInput
                    label="Email"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    style={styles.input}
                    keyboardType="email-address"
                />
                <TextInput
                    label="Mot de passe"
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    label="Téléphone"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    style={styles.input}
                    keyboardType="phone-pad"
                />
                <Button onPress={() => setDialogVisible(true)} style={styles.input}>
                    {formData.category || "Choisir une catégorie"}
                </Button>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                        <Dialog.Title>Catégories</Dialog.Title>
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
                <Button onPress={() => setShowDatePicker(true)} style={styles.button}>
                    Date de Naissance: {dateOfBirth.toLocaleDateString()}
                </Button>
                {showDatePicker && (
                    <DateTimePicker
                        value={dateOfBirth}
                        mode="date"
                        display="default"
                        onChange={onConfirmDateOfBirth}
                        maximumDate={new Date()}
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
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});

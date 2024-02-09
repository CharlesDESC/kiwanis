import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const RegisterChildScreen = ({ navigation }) => {
  const [childFirstName, setChildFirstName] = useState('');
  const [childLastName, setChildLastName] = useState('');
  const [childDateOfBirth, setChildDateOfBirth] = useState('');
  const [childEmail, setChildEmail] = useState('');
  const [childPhone, setChildPhone] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [category, setCategory] = useState('');

  const handleRegisterChild = async () => {
    const today = new Date();
    const birthDate = new Date(childDateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    try {
      const docRef = await firestore().collection('children').add({
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
        navigation.navigate('ParentScreen', { childId: docRef.id });
      } else {
        console.log("Pas besoin de validation parentale. Aller à l'écran d'upload de photo");
        // Naviguer vers un écran approprié pour les enfants de 15 ans et plus
      navigation.navigate('AddPictureScreen');
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'enfant:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Nom de l'enfant"
        value={childName}
        onChangeText={setChildName}
      />
      <TextInput
        style={styles.input}
        label="Date de naissance (YYYY-MM-DD)"
        value={childDateOfBirth}
        onChangeText={setChildDateOfBirth}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        label="Email"
        value={childEmail}
        onChangeText={setChildEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        label="Téléphone"
        value={childPhone}
        onChangeText={setChildPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        label="Nom de l'école"
        value={schoolName}
        onChangeText={setSchoolName}
      />
      <TextInput
        style={styles.input}
        label="Catégorie"
        value={category}
        onChangeText={setCategory}
      />
      <Button mode="contained" onPress={handleRegisterChild}>
        Valider
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
});

export default RegisterChildScreen;

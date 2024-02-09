import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const RegisterChildScreen = () => {
  const [childName, setChildName] = useState('');
  const [childDateOfBirth, setChildDateOfBirth] = useState('');
  const [childEmail, setChildEmail] = useState('');
  const [childPhone, setChildPhone] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [category, setCategory] = useState('');

  const handleRegisterChild = () => {
    const today = new Date();
    const birthDate = new Date(childDateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 15) {
      // Logique de validation parentale
      console.log("Validation parentale nécessaire");
      // Naviguer vers l'écran de validation parentale
    } else {
      // Naviguer vers l'écran d'upload de photo
      console.log("Pas besoin de validation parentale. Aller à l'écran d'upload de photo");
    }

    // Enregistrer les informations de l'enfant
    console.log('Informations de l\'enfant :', childName, childDateOfBirth, childEmail, childPhone, schoolName, category);
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
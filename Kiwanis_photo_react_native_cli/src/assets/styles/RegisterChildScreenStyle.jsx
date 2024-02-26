import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
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
        width: '100%',
        marginBottom: 10,
        borderColor: 'grey', // Pour simuler le bord d'un TextInput
      },
      fakeInputContent: {
        height: 58, // Hauteur standard d'un TextInput
      },
      fakeInputLabel: {
        lineHeight: 58, // Aligner le texte verticalement
      },
      paragraph: {
        textAlign: 'center', // Centre le texte
        marginBottom: 20, // Espacement avant le reste du formulaire
        fontSize: 16, // Taille de la police
      },
});



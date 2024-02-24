import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
});
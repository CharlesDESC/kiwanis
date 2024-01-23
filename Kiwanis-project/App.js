import { StyleSheet, Text, View } from "react-native";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

import { Login } from "./src/screen/login/Login";

export default function App() {
	return (
		<View style={styles.container}>
			<Login />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

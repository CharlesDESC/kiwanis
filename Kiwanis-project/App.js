import { StyleSheet, View } from "react-native";
import { AuthStack } from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
	return (
		<NavigationContainer>
			<View style={styles.container}>
				<AuthStack />
			</View>
		</NavigationContainer>
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

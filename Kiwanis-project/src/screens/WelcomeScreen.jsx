import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Header";

export const WelcomeScreen = () => {
	const navigation = useNavigation();

	const moveToRegister = () => {
		navigation.navigate("AuthStack", { screen: "Register" });
		console.log("Button pressed");
	};

	const moveToLogin = () => {
		navigation.navigate("AuthStack", { screen: "Login" });
	};

	const invite = () => {
		// navigation.navigate("Invite");
		console.log("Button pressed");
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				rowGap: 10,
			}}
		>
			<Text>Welcome to the Home Screen!</Text>
			<Button mode='contained' onPress={moveToRegister}>
				<Text>s'incrire</Text>
			</Button>

			<Button mode='contained' onPress={moveToLogin}>
				<Text>se connecter</Text>
			</Button>
			<Button mode='contained' onPress={invite}>
				<Text>invité mode</Text>
			</Button>
		</View>
	);
};

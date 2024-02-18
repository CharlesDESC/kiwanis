import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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
		navigation.navigate("Home");
	};

	return (
		<View
			style={{
				flex: 1,
				width: "70%",
				justifyContent: "center",
				alignSelf: "center",
				rowGap: 20,
			}}
		>
			<Button mode='contained' onPress={moveToRegister}>
				<Text>s'incrire</Text>
			</Button>

			<Button mode='contained' onPress={moveToLogin}>
				<Text>se connecter</Text>
			</Button>
			<Button mode='outlined' onPress={invite}>
				invité mode
			</Button>
		</View>
	);
};

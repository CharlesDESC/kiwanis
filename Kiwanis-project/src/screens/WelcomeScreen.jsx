import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Header";

export const WelcomeScreen = () => {
	const navigation = useNavigation();

	const moveToAuth = () => {
		navigation.navigate("AuthStack");
		console.log("Button pressed");
	};

	const invite = () => {
		// navigation.navigate("Invite");
		console.log("Button pressed");
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", rowGap: 10 }}>
			<Header/>
			<Text>Welcome to the Home Screen!</Text>
			<Button mode='contained' onPress={moveToAuth}>
				<Text>moveToAuth</Text>
			</Button>
			<Button mode='contained' onPress={invite}>
				<Text>invité mode</Text>
			</Button>
		</View>
	);
};

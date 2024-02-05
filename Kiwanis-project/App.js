import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStack } from "./src/navigation/AuthStack";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Welcome' component={WelcomeScreen} />
				<Stack.Screen name='AuthStack' component={AuthStack} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

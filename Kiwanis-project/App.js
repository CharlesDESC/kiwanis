import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStack } from "./src/navigation/AuthStack";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='Welcome'
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name='Welcome' component={WelcomeScreen} />
					<Stack.Screen name='AuthStack' component={AuthStack} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}

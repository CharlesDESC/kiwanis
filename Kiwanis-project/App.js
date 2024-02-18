import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	NavigationContainer,
	DefaultTheme as NavDefTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStack } from "./src/navigation/AuthStack";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Header } from "./src/components/Header";
import { BottomTabNavigator } from "./src/navigation/BottomTabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
	const NavTheme = {
		...NavDefTheme,
		colors: {
			...NavDefTheme.colors,
			background: "#0B3364",
		},
	};

	const Theme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: "#E2A128",
			secondary: "#fff",
			accent: "#0B3364",
			onSurface: "black", // text color
		},
	};

	return (
		<PaperProvider theme={Theme}>
			<NavigationContainer theme={NavTheme}>
				<Stack.Navigator
					initialRouteName='Welcome'
					screenOptions={{
						headerStyle: {
							backgroundColor: NavTheme.colors.background,
						},
						header: () => <Header />,
					}}
				>
					<Stack.Screen
						name='Welcome'
						component={WelcomeScreen}
						options={{ headerShown: true }}
					/>
					<Stack.Screen
						name='AuthStack'
						component={AuthStack}
						options={{ headerShown: true }}
					/>
					<Stack.Screen
						name='Home'
						component={BottomTabNavigator}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}

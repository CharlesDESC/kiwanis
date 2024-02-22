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
import { Header, HomeHeader } from "./src/components/Header";
import { HomeScreen } from "./src/screens/HomeScreen";
import { IsLogProvider } from "./src/contexts/IsLogContext";
import { useIsLog } from "./src/hooks/useIsLog";

const Stack = createNativeStackNavigator();

export default function App() {
	const { isLogged, setIsLogged } = useIsLog();

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
			<IsLogProvider values={{ isLogged, setIsLogged }}>
				<NavigationContainer theme={NavTheme}>
					<Stack.Navigator
						initialRouteName='Welcome'
						screenOptions={{
							headerStyle: {
								backgroundColor: NavTheme.colors.background,
								headerShown: true,
							},
						}}
					>
						<Stack.Screen
							name='Welcome'
							component={WelcomeScreen}
							options={{ header: () => <Header /> }}
						/>
						<Stack.Screen
							name='AuthStack'
							component={AuthStack}
							options={{ header: () => <Header /> }}
						/>
						<Stack.Screen
							name='Home'
							component={HomeScreen}
							options={{ header: () => <HomeHeader /> }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</IsLogProvider>
		</PaperProvider>
	);
}

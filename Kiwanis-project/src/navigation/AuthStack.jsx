import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterStack } from "./RegisterStack";
import { MainStack } from "./MainStack";
import { Header } from "../components/Header";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				header: () => <Header />,
			}}
		>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Register' component={RegisterStack} />
			<Stack.Screen name='Main' component={MainStack} />
		</Stack.Navigator>
	);
};

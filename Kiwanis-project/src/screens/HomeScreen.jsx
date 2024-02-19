import React from "react";
import { View, Text } from "react-native";
import { Navbar } from "../components/Navbar";

export const HomeScreen = () => {
	return (
		<>
			<View>
				<Text>Welcome to the Home Screen!</Text>
			</View>
			<Navbar />
		</>
	);
};

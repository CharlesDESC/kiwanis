import React from "react";
import { View, Text, Button } from "react-native";

export const ValidChildScreen = () => {
	return (
		<View>
			<Text>Validation Screen</Text>
			<Button
				title='Validate'
				onPress={() => console.log("Validation button pressed")}
			/>
		</View>
	);
};

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { AddPictureScreen } from "../screens/AddPictureScreen";

const Stack = createNativeStackNavigator();

export const MainStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='Profile' component={ProfileScreen} />
			<Stack.Screen name='AddPicture' component={AddPictureScreen} />
		</Stack.Navigator>
	);
};

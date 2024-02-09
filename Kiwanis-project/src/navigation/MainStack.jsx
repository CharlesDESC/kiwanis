import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { AddPictureScreen } from "../screens/AddPictureScreen";

const Stack = createStackNavigator();

export const MainStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='Profile' component={ProfileScreen} />
			<Stack.Screen name='AddPicture' component={AddPictureScreen} />
		</Stack.Navigator>
	);
};

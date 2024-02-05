import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginStack from "./LoginStack";
import RegisterStack from "./RegisterStack";
import MainStack from "./MainStack";

const Stack = createStackNavigator();

export const AuthStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Login' component={LoginStack} />
			<Stack.Screen name='Register' component={RegisterStack} />
			<Stack.Screen name='Main' component={MainStack} />
		</Stack.Navigator>
	);
};

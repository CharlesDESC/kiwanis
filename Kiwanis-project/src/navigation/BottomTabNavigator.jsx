import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { AddPictureScreen } from "../screens/AddPictureScreen";
import { HomeHeader } from "../components/Header";
import { Navbar } from "../components/Navbar";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				header: () => <HomeHeader />,
			}}
			tabBar={() => <Navbar />}
		>
			<Tab.Screen name='Home' component={HomeScreen} />
			<Tab.Screen name='Profile' component={ProfileScreen} />
			<Tab.Screen name='AddPicture' component={AddPictureScreen} />
		</Tab.Navigator>
	);
};

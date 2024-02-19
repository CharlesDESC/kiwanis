import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { AddPictureScreen } from "../screens/AddPictureScreen";
import { HomeHeader } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { UpPicture } from "../components/UpPicture";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				header: () => <HomeHeader />,
			}}
			tabBar={() => <Navbar />}
		>
			<Tab.Screen name='HomeScreen' component={HomeScreen} />
			<Tab.Screen name='ProfileScreen' component={ProfileScreen} />
			<Tab.Screen name='AddPictureScreen' component={UpPicture} />
		</Tab.Navigator>
	);
};

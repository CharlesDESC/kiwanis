
import { StyleSheet, Text, View } from "react-native";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from "./src/screen/login/Login";
import { Register } from "./src/screen/register/Register";
const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
		  <Stack.Navigator>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
		  </Stack.Navigator>
		</NavigationContainer>
	  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

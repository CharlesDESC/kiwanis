import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterChildScreen } from "../screens/register/RegisterChildScreen";
import { ValidChildScreen } from "../screens/register/ValidChildScreen";
import { ParentScreen } from "../screens/register/ParentScreen";
import { ValidParentScreen } from "../screens/register/ValidParentScreen";

const Stack = createNativeStackNavigator();

export const RegisterStack = () => {
	return (
		<Stack.Navigator screenOptions={{
			headerShown: false}}>
			<Stack.Screen name='RegisterChild' component={RegisterChildScreen} />
			{/* <Stack.Screen name='ValidChild' component={ValidChildScreen} /> */}
			<Stack.Screen name='Parent' component={ParentScreen} />
			<Stack.Screen name='ValidParent' component={ValidParentScreen} />
		</Stack.Navigator>
	);
};

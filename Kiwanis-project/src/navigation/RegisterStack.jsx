import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterChildScreen } from "./RegisterChildScreen";
import { ValidChildScreen } from "./ValidChildScreen";
import { ParentScreen } from "./ParentScreen";
import { ValidParentScreen } from "./ValidParentScreen";

const Stack = createNativeStackNavigator();

export const RegisterStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='RegisterChild' component={RegisterChildScreen} />
				<Stack.Screen name='ValidChild' component={ValidChildScreen} />
				<Stack.Screen name='Parent' component={ParentScreen} />
				<Stack.Screen name='ValidParent' component={ValidParentScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

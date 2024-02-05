import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const Register = ({ toggleAuthMode }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = () => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log("singed up");
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log("errorCode", errorCode, "errorMessage", errorMessage);
			});
	};

	return (
		<View>
			<TextInput placeholder='Email' value={email} onChangeText={setEmail} />
			<TextInput
				placeholder='Password'
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<Button title='Register' onPress={handleRegister} />
			<Button title='Login' onPress={toggleAuthMode} />
		</View>
	);
};

// import React, { useState } from "react";
// import { View, TextInput, Button } from "react-native";

// export const Register = ({ toggleAuthMode }) => {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");

// 	const handleRegister = () => {
// 		// Logique d'enregistrement de l'utilisateur
// 	};

// 	return (
// 		<View>
// 			<TextInput placeholder='Email' value={email} onChangeText={setEmail} />
// 			<TextInput
// 				placeholder='Password'
// 				secureTextEntry
// 				value={password}
// 				onChangeText={setPassword}
// 			/>
// 			<Button title='Register' onPress={handleRegister} />
// 			<Button title='Login' onPress={toggleAuthMode} />
// 		</View>
// 	);
// };

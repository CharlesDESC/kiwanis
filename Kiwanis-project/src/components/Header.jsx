import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export const Header = () => {
	return (
		<View style={styles.container}>
			<Image source={require("../assets/logo2.png")} style={styles.image} />
			<Text style={styles.text}>
				Kiwanis Antibes Juan les pins concours photo
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		paddingTop: 10,
	},
	image: {
		width: 200,
		height: 200,
		marginRight: 10,
		marginTop: 10,
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

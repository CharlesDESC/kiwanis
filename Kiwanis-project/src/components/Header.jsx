import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export const Header = () => {
	return (
		<View style={styles.container}>
			<Image source={require("../assets/logo2.png")} style={styles.image} />
			<Text variant='titleLarge' style={styles.text}>
				Kiwanis Antibes Juan les pins concours photo
			</Text>
		</View>
	);
};

export const HomeHeader = () => {
	return (
		<View style={homeStyles.container}>
			<View style={homeStyles.topContainer}>
				<Image
					source={require("../assets/logo2.png")}
					style={homeStyles.image}
				/>
				<View style={homeStyles.textContainer}>
					<Text style={homeStyles.text}>CONCOURS PHOTO</Text>
					<Text style={homeStyles.subtext}>KIWANIS</Text>
					<Text style={homeStyles.subtext}>ANTIBES JUAN LES PINS</Text>
				</View>
			</View>
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
		backgroundColor: "#0B3364",
	},
	image: {
		width: 200,
		height: 200,
		marginRight: 10,
		marginTop: 10,
	},
	text: {
		width: "80%",
		textAlign: "center",
		color: "#fff",
	},
});

const homeStyles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
		backgroundColor: "#0B3364",
		paddingTop: 45,
	},
	topContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	textContainer: {
		flexDirection: "column",
		marginLeft: 8,
	},
	image: {
		width: 80,
		height: 80,
	},
	text: {
		fontSize: 20,
		color: "#fff",
	},
	subtext: {
		fontSize: 16,
		color: "#fff",
	},
});

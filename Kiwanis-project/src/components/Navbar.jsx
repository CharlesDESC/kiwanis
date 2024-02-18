import React from "react";
import { View, Text, Image } from "react-native";

export const Navbar = () => {
	return (
		<View style={styles.navbar}>
			<Image
				source={require("../assets/accLogo.png")}
				style={styles.navbarImage}
			/>
			<Image
				source={require("../assets/photoLogo.png")}
				style={styles.navbarImage}
			/>
			<Image
				source={require("../assets/burgerMenu.png")}
				style={styles.navbarImage}
			/>
		</View>
	);
};

const styles = {
	navbar: {
		backgroundColor: "#E2A128",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 70,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
		elevation: 8,
	},
	navbarImage: {
		width: 30,
		height: 30,
		margin: 5,
	},
	navbarText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
};

import React, { useState, useEffect } from "react";
import {
	View,
	Image,
	TouchableOpacity,
	Animated,
	ScrollView,
} from "react-native";
import { Text } from "react-native-paper";

export const Navbar = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [navbarHeight] = useState(new Animated.Value(70));
	const [showReglementDetails, setShowReglementDetails] = useState(false);
	const [showAddPicture, setShowAddPicture] = useState(false);
	const [showMentionsLegalesDetails, setShowMentionsLegalesDetails] =
		useState(false);

	useEffect(() => {
		if (!showAddPicture) {
			Animated.timing(navbarHeight, {
				toValue: isMenuOpen ? 700 : 70,
				duration: 300,
				useNativeDriver: false,
			}).start();
		}
	}, [isMenuOpen]);

	useEffect(() => {
		if (!isMenuOpen) {
			Animated.timing(navbarHeight, {
				toValue: showAddPicture ? 700 : 70,
				duration: 300,
				useNativeDriver: false,
			}).start();
		}
	}, [showAddPicture]);

	const toggleMenu = () => {
		setShowAddPicture(false);
		if (isMenuOpen) {
			setMenuOpen(false);
			setShowReglementDetails(false);
			setShowMentionsLegalesDetails(false);
		} else {
			setMenuOpen(true);
		}
	};

	const showReglement = () => {
		setShowReglementDetails(true);
		setShowMentionsLegalesDetails(false);
	};
	const showMentionsLegales = () => {
		setShowMentionsLegalesDetails(true);
		setShowReglementDetails(false);
	};

	const displayAddPicture = () => {
		setMenuOpen(false);
		setShowAddPicture(!showAddPicture);
	};

	return (
		<Animated.View
			style={{
				height: navbarHeight,
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: "#E2A128",
				borderRadius: 12,
			}}
		>
			{isMenuOpen && (
				<View style={styles.menuContent}>
					<TouchableOpacity
						style={styles.menuText}
						onPress={() => showReglement()}
					>
						<Text>Règlement</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuText}
						onPress={() => showMentionsLegales()}
					>
						<Text>Mentions légales</Text>
					</TouchableOpacity>
					{showReglementDetails && (
						<ScrollView style={styles.detailsContainer}>
							<Text>{"Détails du règlement"}</Text>
						</ScrollView>
					)}
					{showMentionsLegalesDetails && (
						<ScrollView style={styles.detailsContainer}>
							<Text>{"Détails des mentions légales"}</Text>
						</ScrollView>
					)}
				</View>
			)}
			{showAddPicture && (
				<View style={styles.menuContent}>
					<Text>{"Ajouter une photo"}</Text>
				</View>
			)}
			<View
				style={{
					width: "100%",
					height: 70,
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					justifyContent: "center",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						justifyContent: "space-around",
					}}
				>
					<TouchableOpacity>
						<Image
							source={require("../assets/accLogo.png")}
							style={styles.navbarImage}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={displayAddPicture}>
						<Image
							source={require("../assets/photoLogo.png")}
							style={styles.navbarImage}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => toggleMenu("")}>
						<Image
							source={
								isMenuOpen
									? require("../assets/croix.png")
									: require("../assets/burgerMenu.png")
							}
							style={styles.navbarImage}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</Animated.View>
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
	closeIconContainer: {
		position: "absolute",
		bottom: 30,
		left: "50%",
		marginLeft: -15,
	},
	menuContent: {
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	menuText: {
		fontSize: 25,
		marginBottom: 30,
		paddingBottom: 10,
	},
	detailsContainer: {
		flex: 1,
		margin: 20,
	},
};

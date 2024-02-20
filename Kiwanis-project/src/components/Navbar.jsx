import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Animated,
	ScrollView,
} from "react-native";

export const Navbar = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [navbarHeight] = useState(new Animated.Value(70));
	const [showReglementDetails, setShowReglementDetails] = useState(false);
	const [showMentionsLegalesDetails, setShowMentionsLegalesDetails] =
		useState(false);

	useEffect(() => {
		Animated.timing(navbarHeight, {
			toValue: isMenuOpen ? 700 : 70,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [isMenuOpen]);

	const toggleMenu = (menuType) => {
		if (menuType === "reglement") {
			setShowReglementDetails(!showReglementDetails);
			setShowMentionsLegalesDetails(false);
			// disable details et pas mentions légales
		} else if (menuType === "mentionsLegales") {
			setShowMentionsLegalesDetails(!showMentionsLegalesDetails);
			setShowReglementDetails(false);
		} else {
			setMenuOpen(!isMenuOpen);
			setShowReglementDetails(false);
			setShowMentionsLegalesDetails(false);
		}
	};

	return (
		<Animated.View
			style={[
				styles.navbar,
				{
					height: navbarHeight,
					borderTopLeftRadius: isMenuOpen ? 0 : 12,
					borderTopRightRadius: isMenuOpen ? 0 : 12,
				},
			]}
		>
			{!isMenuOpen && (
				<React.Fragment>
					<Image
						source={require("../assets/accLogo.png")}
						style={styles.navbarImage}
					/>
					<Image
						source={require("../assets/photoLogo.png")}
						style={styles.navbarImage}
					/>
				</React.Fragment>
			)}
			{isMenuOpen && (
				<View style={styles.menuContent}>
					<TouchableOpacity
						style={styles.menuText}
						onPress={() => toggleMenu("reglement")}
					>
						<Text>Règlement</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuText}
						onPress={() => toggleMenu("mentionsLegales")}
					>
						<Text>Mentions légales</Text>
					</TouchableOpacity>
					{showReglementDetails && (
						<ScrollView style={styles.detailsContainer}>
							<Text style={styles.detailsText}>{"Détails du règlement"}</Text>
						</ScrollView>
					)}
					{showMentionsLegalesDetails && (
						<ScrollView style={styles.detailsContainer}>
							<Text style={styles.detailsText}>
								{"Détails des mentions légales"}
							</Text>
						</ScrollView>
					)}
				</View>
			)}

			<TouchableOpacity
				onPress={() => toggleMenu("")}
				style={isMenuOpen ? styles.closeIconContainer : {}}
			>
				<Image
					source={
						isMenuOpen
							? require("../assets/croix.png")
							: require("../assets/burgerMenu.png")
					}
					style={styles.navbarImage}
				/>
			</TouchableOpacity>
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
	detailsText: {
		fontSize: 16,
		color: "#000",
	},
};

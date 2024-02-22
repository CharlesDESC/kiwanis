import React, { useState, useEffect } from "react";
import {
	View,
	Image,
	TouchableOpacity,
	Animated,
	ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { UpPicture } from "./UpPicture";
import { useLogContext } from "../contexts/IsLogContext";
import { useNavigation } from "@react-navigation/native";

export const Navbar = () => {
	const { isLogged, setIsLogged } = useLogContext();
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [navbarHeight] = useState(new Animated.Value(70));
	const [showReglementDetails, setShowReglementDetails] = useState(false);
	const [showAddPicture, setShowAddPicture] = useState(false);
	const [isFinish, setIsFinish] = useState(false);
	const [showMentionsLegalesDetails, setShowMentionsLegalesDetails] =
		useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		setIsFinish(false);
		if (!showAddPicture) {
			Animated.timing(navbarHeight, {
				toValue: isMenuOpen ? 700 : 70,
				duration: 300,
				useNativeDriver: false,
			}).start(() => {
				setIsFinish(true);
			});
		}
	}, [isMenuOpen]);

	useEffect(() => {
		setIsFinish(false);

		if (!isMenuOpen) {
			Animated.timing(navbarHeight, {
				toValue: showAddPicture ? 700 : 70,
				duration: 300,
				useNativeDriver: false,
			}).start(() => {
				setIsFinish(true);
			});
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
		console.log("showReglement", showReglementDetails);
		setShowReglementDetails(true);
		setShowMentionsLegalesDetails(false);
	};
	const showMentionsLegales = () => {
		console.log("showMentionsLegales", showMentionsLegalesDetails);

		setShowMentionsLegalesDetails(true);
		setShowReglementDetails(false);
	};

	const displayAddPicture = () => {
		setMenuOpen(false);
		setShowAddPicture(!showAddPicture);
	};

	const logout = () => {
		setIsLogged(false);
		navigation.reset({
			index: 0,
			routes: [{ name: "Welcome" }],
		});
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
					<TouchableOpacity style={styles.menuText} onPress={() => logout()}>
						{isLogged ? <Text>déconnexion</Text> : <Text>connexion</Text>}
					</TouchableOpacity>
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
							<Text>
								` 1/ OBJET DU CONCOURS Permettre aux élèves du bassin antibois -
								écolier(e)s, collégien(ne)s, lycéen(ne)s - photographes
								amateurs, de s'exprimer au travers d'une photographie sur le
								thème défini à l'article 2. 2/ THÈME DES PHOTOS Les photos
								auront pour thème « Antibes en mouvement » et de préférence
								devront être composées d'éléments, identifiables ou non,
								présents sur le bassin antibois. 3/ CATÉGORIES Le concours
								comprend trois catégories de participants : - Catégorie « Ecole
								» pour les élèves du CE1 au CM2 - Catégorie « Collège » pour les
								élèves de la 6ème à la 3ème - Catégorie « Lycée » pour les
								élèves de la Seconde à la Terminale. 4/ DURÉE DU CONCOURS Le
								concours est ouvert à compter du 15 février 2024 avec une date
								limite de dépôt des photographies fixée au 15 mars 2024 à 18H00.
								La remise des prix se fera lors du congrès national du Kiwanis
								qui aura lieu le Samedi 11 mai 2024 au Palais des Congrès
								d'Antibes. 5/ CONDITIONS DE PARTICIPATION La participation au
								concours est gratuite et ouverte à tous à partir de 7 ans et
								jusqu'à 19 ans révolus. Sont toutefois exclus les photographes
								professionnels et les membres du jury du concours. 6/ MODALITES
								DE PARTICIPATION Chaque participant doit obligatoirement
								télécharger sa photo au format numérique et aux dimensions
								requises sur l'application dédiée au concours. Les participants
								âgés de moins de 15 ans devront faire valider une autorisation
								parentale de participation via l'application. Conformément à la
								loi n°78-17 du 6 janvier 1978, les participants bénéficient d'un
								droit d'accès et de rectification des données personnelles les
								concernant. (Cf article 11) 7/ JURY DU CONCOURS ET CRITERES DE
								SELECTION Un jury du concours sera constitué pour
								pré-sélectionner 30 à 60 photographies. Il sera composé de
								représentants du club Kiwanis, de personnels qualifiés de la
								Ville d'Antibes, de représentants des commerçants d'Antibes et
								de professionnels de la photographie. La composition du jury
								sera communiquée le jour de la remise des prix. Le jury aura
								pour mission de sélectionner les photographies des candidats
								présentées de façon anonyme. A ce titre, aucun signe distinctif
								ou filigrane ne doit être apposé sur les photos. Les critères de
								sélection seront le respect du thème, la qualité artistique,
								l'originalité. Le jury se réserve le droit d'exclure toute photo
								qui ne respecterait pas le thème du concours, le règlement du
								concours, ou encore qu'il juge inappropriée. 8/ EXPOSITION ET
								VOTE DU PUBLIC Les photos présélectionnées par le jury défini à
								l'article 7 seront exposées dans les commerces d'Antibes du 1er
								au 08 mai 2024. Ces photos seront soumises au vote du public via
								l'application du concours du 1er au 8 mai 2024 à 18h. Le détail
								des résultats sera publié sur le site le lendemain de la remise
								des prix. 9/ PRIX ET RÉCOMPENSES Les trois (3) meilleures photos
								(désignées par le vote du public) de chaque catégorie seront
								exposées pendant le Congrès national du Kiwanis. Le jury
								récompensera les trois (3) vainqueurs de chaque catégorie :
								École, Collège, Lycée. 10/ RESPONSABILITÉS ET DROITS
								PHOTOGRAPHIQUES La participation au concours entraîne
								expressément pour les lauréats la cession définitive des droits
								d'auteur de leur cliché au bénéfice du Kiwanis Club Antibes Juan
								Les Pins à compter de la proclamation des résultats. La cession
								des droits d'auteur par le photographe induit notamment le droit
								de reproduction et d'utilisation. Le Kiwanis Club d'Antibes Juan
								les Pins se réserve la possibilité de divulguer l'identité du
								photographe (prénom et nom), qui pourra être mentionnée sur le
								site internet, dans une exposition, dans la presse locale ou
								tout autre support de communication. Les participants au
								concours doivent être dépositaires des droits liés à l'image et
								avoir obtenu l'autorisation des personnes identifiées ou des
								propriétaires des lieux privés reconnaissables sur la photo
								présentée. Ils sont les seuls responsables de tous les droits
								relatifs aux images qu'ils présentent. Les participants
								garantissent, en outre, que les clichés ne portent pas atteinte
								à la vie privée et au droit à l'image des personnes et des lieux
								privés photographiés. Le Kiwanis Club d'Antibes décline toute
								responsabilité concernant les réclamations et/ou des plaintes de
								personnes qui figurent sur les photos ou images envoyées. Le
								Kiwanis Club d'Antibes se réserve le droit, à tout moment,
								d'interrompre, de supprimer, de différer ou de reporter le
								concours et/ou d'en modifier ses modalités après information des
								participants si les circonstances l'exigent. Le règlement sera
								actualisé et mis à jour au besoin. 11/ ACCEPTATION DU REGLEMENT
								Le présent règlement est accessible dans sa totalité sur le site
								Web www. La participation au concours vaut acceptation du
								présent règlement par les concurrents. Tout manquement au
								présent règlement entraîne la disqualification du candidat. 12/
								INFORMATIQUE ET LIBERTÉS Les informations nominatives
								recueillies dans le cadre du présent concours sont traitées
								conformément à la loi du 6 janvier 1978 dite « Informatique et
								Libertés ». Les participants sont informés que les données
								nominatives les concernant, enregistrées dans le cadre de ce
								concours sont nécessaires à la prise en compte de leur
								participation. Tous les participants au concours disposent en
								application de l'article 27 de cette loi d'un droit d'accès et
								de rectification aux données les concernant. Tout joueur ayant
								déposé ses coordonnées peut à tout moment extraire son nom du
								fichier sur demande écrite. Toute demande d'accès, de
								rectification ou d'opposition doit être adressée à
								mediatheque@carcassonne-agglo.fr 13/ INFORMATIONS
								COMPLEMENTAIRES Pour tout complément d'information, merci de
								contacter les organisateurs du concours par voie de mail
								kiwanis.photo@gmail.com. `
							</Text>
						</ScrollView>
					)}
					{showMentionsLegalesDetails && (
						<ScrollView style={styles.detailsContainer}>
							<Text>
								'L'éditeur du site internet www.kiwanis-photos.fr est : Kiwanis
								Club Antibes Juan-les-Pins ayant pour siège social : Maison des
								Associations d'Antibes - 288 Chemin de Saint Claude - 06600
								ANTIBES. Pour nous contacter : kiwanis.photo@gmail.com Le
								responsable de la publication du site www.kiwanis-photos.fr est
								Christophe SARLOT, Président 2023/2024 du Kiwanis Club Antibes
								Juan-les-Pins. Le site www.kiwanis-photos.fr est une réalisation
								de SOPHIA YNOV CAMPUS hébergé par Firebase, 188 King ST, San
								Francisco, CA 94107, United States. Aucune exploitation
								commerciale, même partielle, des données présentes sur le site
								internet www.kiwanis-photos.fr ne pourra être effectuée sans
								l'accord préalable et écrit du Kiwanis Club Antibes
								Juan-les-Pins.'
							</Text>
						</ScrollView>
					)}
				</View>
			)}
			{showAddPicture && isFinish && (
				<View style={styles.menuContent}>
					<UpPicture />
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
					{isLogged && (
						<TouchableOpacity onPress={displayAddPicture}>
							<Image
								source={require("../assets/photoLogo.png")}
								style={styles.navbarImage}
							/>
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={() => toggleMenu()}>
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
		margin: 20,
		with: "100%",
		height: "70%",
	},
};

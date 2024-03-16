import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { Navbar } from "../components/Navbar";

export const HomeScreen = () => {
    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                style={styles.scrollView}
            >
                <View style={styles.viewContainer}>
                    <Card style={styles.cardStyle}>
                        <Text style={styles.title}>Bienvenue au Concours de Photographie d'Antibes pour les Jeunes !</Text>
                        <View style={styles.infoContainer}>
                            <View>
                                <Text style={styles.subtitle}>1. Objectif du Concours:</Text>
                                <Text>Exprime-toi à travers la photographie en capturant le mouvement d'Antibes.</Text>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>2. Thème des Photos:</Text>
                                <Text>Prenez des photos qui représentent "Antibes en mouvement", en mettant en avant des éléments caractéristiques de la région.</Text>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>3. Catégories:</Text>
                                <Text>Le concours est ouvert aux élèves du CE1 à la Terminale, répartis en trois catégories : École, Collège, et Lycée.</Text>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>4. Dates Importantes:</Text>
                                <Text>Vous pouvez soumettre vos photos du 06 Mars au 04 Avril 2024. Les gagnants seront annoncés lors du congrès national du Kiwanis le 11 mai 2024.</Text>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>5. Prix et Récompenses:</Text>
                                <Text>Les gagnants recevront des prix et leurs photos seront exposées lors du congrès national du Kiwanis.</Text>
                            </View>
                        </View>
                    </Card>
                </View>
            </ScrollView>
            <Navbar />
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#0B3364", 
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 100, 
    },
    viewContainer: {
        flex: 1,
        width: "90%", 
        alignItems: "center",
        marginTop: "10%",
    },
    cardStyle: {
        padding: "5%",
        width: "100%", 
    },
    title: {
        fontSize: 18, 
        marginBottom: 20, 
    },
    subtitle: {
        fontWeight: "bold", 
        marginTop: 15, 
    },
    infoContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
    },
});


import React from 'react';
import {ScrollView, View} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {Navbar} from '../components/Navbar';

export const HomeScreen = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          margin: '5%',
          marginTop: '10%',
          alignItems: 'center',
        }}>
        <Card style={{padding: '5%'}}>
          <ScrollView>
            <Text variant="titleMedium">
              Bienvenue au Concours de Photographie d'Antibes pour les Jeunes !
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'space-around',
                rowGap: 20,
              }}>
              <View>
                <Text variant="titleSmall">1. Objectif du Concours:</Text>
                <Text variant="bodyMedium">
                  Exprime-toi à travers la photographie en capturant le
                  mouvement d'Antibes.
                </Text>
              </View>
              <View>
                <Text variant="titleSmall">2. Thème des Photos:</Text>
                <Text variant="bodyMedium">
                  Prenez des photos qui représentent "Antibes en mouvement", en
                  mettant en avant des éléments caractéristiques de la région.
                </Text>
              </View>
              <View>
                <Text variant="titleSmall">3. Catégories: </Text>
                <Text variant="bodyMedium">
                  Le concours est ouvert aux élèves du CE1 à la Terminale,
                  répartis en trois catégories : École, Collège, et Lycée.
                </Text>
              </View>
              <View>
                <Text variant="titleSmall">4. Dates Importantes: </Text>
                <Text variant="bodyMedium">
                  Vous pouvez soumettre vos photos du 15 février au 15 mars
                  2024. Les gagnants seront annoncés lors du congrès national du
                  Kiwanis le 11 mai 2024.
                </Text>
              </View>
              <View>
                <Text variant="titleSmall">5. Prix et Récompenses: </Text>
                <Text variant="bodyMedium">
                  Les gagnants recevront des prix et leurs photos seront
                  exposées lors du congrès national du Kiwanis.
                </Text>
              </View>
            </View>
          </ScrollView>
        </Card>
      </View>
      <Navbar />
    </>
  );
};

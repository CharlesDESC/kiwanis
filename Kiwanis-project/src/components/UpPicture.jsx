import * as ImagePicker from "expo-image-picker";
import { View, PermissionsAndroid, Platform, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import React, { useState } from "react";

export const UpPicture = () => {
	const [imageUri, setImageUri] = useState(null);

	const requestCameraPermission = async () => {
		if (Platform.OS === "android") {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.CAMERA,
					{
						title: "Camera Permission",
						message: "App needs camera permission",
					}
				);
				// Si la permission est refusée
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					console.log("Camera permission given");
					takePhoto();
				} else {
					console.log("Camera permission denied");
				}
			} catch (err) {
				conole.warn(err);
			}
		} else {
			console.log("Camera permission denied");
		}
		if (Platform.OS === "ios") {
			// Demande de permission pour iOS
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			if (status === "granted") {
				console.log("Camera permission given");
				takePhoto();
			} else {
				console.warn("Camera permission denied");
			}
		}
	};

	const takePhoto = async () => {
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			console.log(result);
			console.log(result.uri);
			setImageUri(result.assets[0].uri);
		}
	};

	const choosePhotoFromLibrary = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			console.log(result);
			console.log(result.assets[0].uri);
			console.log(result.uri);
			setImageUri(result.assets[0].uri);
		}
	};

	const postPhoto = async () => {
		console.log("Not yet !");
	};

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				justifyContent: "center",
				rowGap: 10,
				backgroundColor: "white",
			}}
		>
			<Text
				style={{
					textAlign: "center",
				}}
			>
				Welcome to the Picutre Screen!
			</Text>
			<Button mode='contained' onPress={choosePhotoFromLibrary}>
				<Text>Choose from Library</Text>
			</Button>

			<Button mode='contained' onPress={requestCameraPermission}>
				<Text>Take a Photo</Text>
			</Button>
			<Text
				style={{
					textAlign: "center",
				}}
			>
				Your photo :
			</Text>

			{imageUri && (
				<Image
					source={{ uri: imageUri }}
					style={{
						width: 200,
						height: 200,
						alignSelf: "center",
						borderRadius: 150 / 10,
						borderColor: "rgba(1, 57, 117, .1)",
						borderWidth: 3,
						opacity: 5,
					}}
				/>
			)}

			<Button mode='contained' onPress={postPhoto}>
				<Text>Validate</Text>
			</Button>
		</View>
	);
};

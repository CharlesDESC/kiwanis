import * as ImagePicker from "expo-image-picker";
import { View, PermissionsAndroid, Platform, Image, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					console.log("Camera permission given");
					takePhoto();
				} else {
					console.log("Camera permission denied");
				}
			} catch (err) {
				console.warn(err);
			}
		} else {
			console.log("Camera permission denied");
		}
		if (Platform.OS === "ios") {
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
			setImageUri(result.uri);
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
			console.log(result.uri);
			setImageUri(result.uri);
		}
	};

	const postPhoto = async () => {
		if (!imageUri) {
			console.log("No image to upload.");
			return;
		}
		const uid = auth.currentUser.uid;
		const uploadUri =
			Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;
		let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
		const extension = filename.split(".").pop();
		const name = filename.split(".").slice(0, -1).join(".");
		filename = `${uid}_${name}${Date.now()}.${extension}`;

		try {
			const response = await fetch(uploadUri);
			const blob = await response.blob();

			const storage = getStorage();
			const storageRef = ref(storage, `user_uploads/${uid}/${filename}`);
			await uploadBytes(storageRef, blob);

			const downloadURL = await getDownloadURL(storageRef);
			console.log("File available at", downloadURL);

			Alert.alert(
				"Success",
				"Your photo has been uploaded successfully!",
				[{ text: "OK", onPress: () => console.log("OK Pressed") }],
				{ cancelable: false }
			);
		} catch (e) {
			console.log(e);
			Alert.alert(
				"Error",
				"An error occurred while uploading the photo. Please try again later.",
				[{ text: "OK", onPress: () => console.log("OK Pressed") }],
				{ cancelable: false }
			);
		}
	};

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				justifyContent: "center",
				rowGap: 10,
			}}
		>
			<Button
				mode='contained'
				contentStyle={{ backgroundColor: "#0B3364" }}
				onPress={choosePhotoFromLibrary}
			>
				Selectionner depuis la galerie
			</Button>

			<Button
				mode='contained'
				onPress={requestCameraPermission}
				contentStyle={{ backgroundColor: "#0B3364" }}
			>
				Prendre une photo
			</Button>
			<Text style={{ textAlign: "center" }}>Votre photo</Text>

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

			<Button mode='outlined' onPress={postPhoto}>
				<Text> Valider</Text>
			</Button>

			<Text style={{ textAlign: "center", marginTop: 20 }}>
				taille: 2584x1946 pixels, format paysage uniquement!
			</Text>
		</View>
	);
};

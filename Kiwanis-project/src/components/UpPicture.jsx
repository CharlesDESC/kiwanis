import React, { useState } from "react";
import { View, Modal, Button, Text } from "react-native";

export const UpPicture = () => {
	const [modalVisible, setModalVisible] = useState(false);
	console.log("UpPicture");

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<View>
			<Button title='Open Modal' onPress={openModal} />
			<Modal visible={modalVisible} animationType='slide'>
				<View>
					<Text>This is a modal</Text>
					<Button title='Close Modal' onPress={closeModal} />
				</View>
			</Modal>
		</View>
	);
};

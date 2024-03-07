import React, { useState } from 'react';
import { View, Image, Alert, Platform } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../../firebaseConfig';

export const UpPicture = () => {
  const [imageUri, setImageUri] = useState(null);

  const takePhotoFromCamera = async () => {
    launchCamera({
      mediaType: 'photo',
      quality: 1,
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImageUri(source.uri);
      }
    });
  };

  const choosePhotoFromLibrary = async () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImageUri(source.uri);
      }
    });
  };

  const postPhoto = async () => {
    if (!imageUri) {
      Alert.alert('Upload Error', 'Please select an image first.');
      return;
    }

    const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const uid = auth.currentUser.uid;

    try {
      const blob = await (await fetch(uploadUri)).blob();
      const storageRef = ref(getStorage(), `user_uploads/${uid}/${filename}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log('File available at', downloadURL);
      Alert.alert('Upload successful', 'Your photo has been uploaded successfully!');
    } catch (e) {
      console.error(e);
      Alert.alert('Upload Error', 'An error occurred while uploading the photo.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={takePhotoFromCamera}>Take Photo</Button>
      <Button onPress={choosePhotoFromLibrary}>Choose From Library</Button>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button onPress={postPhoto}>Upload Photo</Button>
    </View>
  );
};

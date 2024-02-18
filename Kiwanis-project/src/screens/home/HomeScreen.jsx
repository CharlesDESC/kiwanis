import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
//import { launchImageLibrary } from 'react-native-image-picker';
//import storage from '@react-native-firebase/storage';

export const HomeScreen = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        uploadImage(source.uri);
      }
    });
  };

  const uploadImage = async (uri) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(filename).putFile(uploadUri);

    task.on('state_changed', (snapshot) => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    });

    try {
      setUploading(true);
      await task;
      console.log('Image uploaded to the bucket!');
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choisir une image" onPress={selectImage} />
      {uploading && (
        <View style={styles.uploadStatus}>
          <Text>{`Progression : ${progress.toFixed(2)}%`}</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadStatus: {
    marginTop: 20,
  },
});

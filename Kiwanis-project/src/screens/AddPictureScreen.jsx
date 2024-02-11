import React, { useState } from 'react';
//import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
//import { addDoc, collection, getFirestore } from "firebase/firestore";

const AddPictureScreen = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage(''); // Reset l'erreur message
  };

  const validateImage = (image) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = window.URL.createObjectURL(image);
      img.onload = () => {
        if (img.width >= 2584 && img.height >= 1946) {
          resolve(true);
        } else {
          reject('La photo doit être au minimum de 2584x1946 pixels pour un tirage en 30x40 cm.');
        }
      };
    });
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Veuillez sélectionner une image.');
      return;
    }

    try {
      await validateImage(file);
      const storage = getStorage();
      const fileRef = storageRef(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);

      const db = getFirestore();
      await addDoc(collection(db, "images"), { url });
      console.log('Image téléchargée et URL enregistrée avec succès');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.toString());
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddPictureScreen;

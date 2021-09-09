import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Platform
} from "react-native";
import image from "./assets/diamond-red.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
const App = () => {
  const [selectedImage, setselectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permision to acces galery is required");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    setselectedImage({ localUri: pickerResult.uri });
  };

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("la opcion compartir no esta disponible en su plataforma");
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un Avatar</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://image.flaticon.com/icons/png/512/5019/5019638.png",
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* <Button
      color="#000"
      title="Press me"
      onPress={()=> Alert.alert("hello")}
/> */}
      {selectedImage ? (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Compartir</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#221f1f",
  },
  title: {
    fontSize: 30,
    color: "#f5f5f1",
  },
  image: {
    height: 180,
    width: 180,
    resizeMode: "contain",
    borderRadius: 90,
  },
  button: {
    backgroundColor: "#e50914",
    padding: 7,
    marginTop: 10,
  },
  buttonText: {
    color: "#f5f5f1",
    fontSize: 20,
  },
});

export default App;

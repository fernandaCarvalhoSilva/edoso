import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageSourcePropType,
} from "react-native";
import { Styles } from "./TutorialPage.style";
import Images from "../../../components/TutorialImages/TutorialImages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../utils/stack/stack";
import { Dimensions } from 'react-native';

const Settings = () => {
  const [imageCount, setImageCount] = useState(1);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const screenWidth = Dimensions.get('window').width;
  const scaleHeight = (source: ImageSourcePropType, desiredWidth: number) => {
    const { width, height } = Image.resolveAssetSource(source);

    return (desiredWidth / width) * height;
  };
  const scaleButton = (source: ImageSourcePropType, desiredWidth: number) => {
    const { width, height } = Image.resolveAssetSource(source);

    return ((desiredWidth / width) * height) - 60;
  };

  useEffect(() => {
    const setTutorial = async () => {
      try {
        await AsyncStorage.setItem("tutorial", JSON.stringify(true));
      } catch (error) {
        console.log(error);
      }
    };
    setTutorial();
  }, []);

  const handleNextImage = () => {
    setImageCount(imageCount + 1);
  };

  const handlePreviousImage = () => {
    setImageCount(imageCount - 1);
  };

  const backToHome = () => {
    navigation.navigate("Home", { app: null });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={Images[`image${imageCount}`]}
          style={{ width: screenWidth, height: scaleHeight(Images[`image${imageCount}`], screenWidth) }}
        />
        <View
          style={{
            position: "absolute",
            top: scaleButton(Images[`image${imageCount}`], screenWidth),
            justifyContent: 'center',
            flexDirection: "row",
          }}
        >
          {imageCount > 1 && (
            <TouchableOpacity
              style={Styles.button}
              onPress={handlePreviousImage}
            >
              <Text style={Styles.buttonText}>Anterior</Text>
            </TouchableOpacity>
          )}
          {imageCount < 18 ? (
            <TouchableOpacity style={Styles.button} onPress={handleNextImage}>
              <Text style={Styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={Styles.button} onPress={backToHome}>
              <Text style={Styles.buttonText}>Encerrar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;

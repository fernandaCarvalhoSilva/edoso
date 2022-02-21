import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomModal from '../CustomModal/CustomModal';
interface CustomImagePickerProps {
  toogleImagePicker: (event: GestureResponderEvent) => void;
  toogleSetImage: (uri: string | undefined) => void;
}

const CustomImagePicker = (Props: CustomImagePickerProps) => {
  const chooseFromGallery = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 140,
      maxWidth: 150,
      quality: 1,
      selectionLimit: 1,
    });

    if (result.assets) {
      Props.toogleSetImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    let result = await launchCamera({
      mediaType: 'photo',
      maxHeight: 140,
      maxWidth: 150,
      quality: 1,
    });

    if (result.assets) {
      Props.toogleSetImage(result.assets[0].uri);
    }
  };

  return (
    <CustomModal
      modalTitle="Adicionar foto"
      handleFirstOption={chooseFromGallery}
      handleSecondOption={openCamera}
      handleCancelOption={Props.toogleImagePicker}
      firstOptionTitle={'Escolher da galeria'}
      secondOptionTitle={'Tirar nova foto'}
      showIcon={true}
    />
  );
};

export default CustomImagePicker;

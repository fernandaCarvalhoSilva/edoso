import React, {useState} from 'react';
import {BlurView} from '@react-native-community/blur';
import DatePicker from 'react-native-date-picker';
import {Styles} from './CustomDateTimePicker.style';

interface CustomImagePickerProps {
  toogleDateTimePicker: () => void;
  toogleSetDateTime: (date: Date) => void;
  title: string;
  mode: 'date' | 'time' | 'datetime';
  open: boolean;
}

const CustomImagePicker = (Props: CustomImagePickerProps) => {
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const handleConfirmation = (date: Date) => {
    Props.toogleDateTimePicker();
    Props.toogleSetDateTime(date);
    setDateTime(date);
  };
  return (
    <>
      <BlurView
        style={Styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <DatePicker
        modal
        mode={Props.mode}
        open={Props.open}
        date={dateTime}
        onConfirm={date => handleConfirmation(date)}
        onCancel={Props.toogleDateTimePicker}
        confirmText="Finalizar"
        cancelText="Cancelar"
        title={Props.title}
      />
    </>
  );
};

export default CustomImagePicker;

import React, {useState} from 'react';
import {CheckBox, Icon} from 'react-native-elements';
import ImagePicker from '../../../components/CustomImagePicker/CustomImagePicker';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {Styles} from '../NewMedicine/NewMedicine.style';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomDateTimePicker from '../../../components/CustomDateTimePicker/CustomDateTimePicker';
import notifee, {
  TriggerType,
  Notification,
  RepeatFrequency,
  AndroidImportance,
  AndroidCategory,
} from '@notifee/react-native';
import NotificationSounds from 'react-native-notification-sounds';

export type RootStackParamList = {
  ListMedicine: {};
};

interface MedicineProps {
  name: string;
  dateTimeNotification: Date;
  imageUri: string;
  initDate: Date;
  endDate: Date | number;
  constantUse: boolean;
  repeatAlarm: number;
}

const NewMedicine = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setMedicineName] = useState<string>('');

  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>();
  const [repeatAlarm, setRepeatAlarm] = useState<number>();
  const [initDate, setInitDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showInitDatePicker, setShowInitDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [statusImagePicker, setStatusImagePicker] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState<string | undefined>('');

  const toogleImagePicker = () => {
    setStatusImagePicker(!statusImagePicker);
  };

  const toogleSetImage = (uri: string | undefined) => {
    setImage(uri);
    toogleImagePicker();
    setHasImage(true);
  };

  const goBack = () => {
    navigation.navigate('ListMedicine', {});
  };

  function handleInputChange(value: string) {
    setMedicineName(value);
  }

  async function saveMedicine(medicine: MedicineProps): Promise<void> {
    try {
      const data = await AsyncStorage.getItem('Medicine');
      const oldMedicine = data
        ? (JSON.parse(data) as Array<MedicineProps>)
        : [];

      const newMedicine = [medicine];

      await AsyncStorage.setItem(
        'Medicine',
        JSON.stringify([...oldMedicine, ...newMedicine]),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave() {
    try {
      createNotification();
      // const newEndDate = isSelected ? 0 : endDate;
      // if (
      //   selectedDateTime !== undefined &&
      //   name !== '' &&
      //   image !== undefined &&
      //   initDate !== undefined &&
      //   newEndDate !== undefined &&
      //   repeatAlarm !== undefined
      // ) {
      //   await saveMedicine({
      //     dateTimeNotification: selectedDateTime,
      //     name: name,
      //     imageUri: image!,
      //     initDate: initDate,
      //     endDate: newEndDate,
      //     constantUse: isSelected,
      //     repeatAlarm: repeatAlarm,
      //   });
      // } else {
      //   Alert.alert('Não foi possível salvar');
      // }
    } catch {
      Alert.alert('Não foi possível salvar');
    }
  }

  const createNotification = async () => {
    try {
      const channelId = 'custom-sound';
      const soundsList = await NotificationSounds.getNotifications(
        'notification',
      );
      const reminderNotification: Notification = {
        id: 'medicine-time',
        title: 'Hora de tomar o remédio',
        body: `Está na hora de tomar o remédio ${name}`,
        data: {
          medId: `${name}`,
        },
        android: {
          channelId,
          category: AndroidCategory.CALL,
          vibrationPattern: [300, 500],
          importance: AndroidImportance.HIGH,
          fullScreenAction: {
            id: 'default',
          },
        },
      };
      const date = new Date();
      date.setSeconds(date.getSeconds() + 3);
      await notifee
        .createTriggerNotification(reminderNotification, {
          type: TriggerType.TIMESTAMP,
          timestamp: date.getTime(),
          repeatFrequency: RepeatFrequency.DAILY,
        })
        .then(result => {
          console.log(result);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultipleSelection = (inputType: string) => {
    switch (inputType) {
      case 'timePicker':
        setShowTimePicker(true);
        setShowInitDatePicker(false);
        setShowEndDatePicker(false);
        break;
      case 'initDatePicker':
        setShowInitDatePicker(true);
        setShowTimePicker(false);
        setShowEndDatePicker(false);
        break;
      case 'endDatePicker':
        setShowEndDatePicker(true);
        setShowInitDatePicker(false);
        setShowTimePicker(false);
        break;
      default:
        break;
    }
  };

  const handleSelectedTime = (date: Date) => {
    setSelectedDateTime(date);
  };

  const handleSelectedInitDate = (date: Date) => {
    setInitDate(date);
  };

  const handleSelectedEndDate = (date: Date) => {
    setEndDate(date);
  };

  return (
    <KeyboardAvoidingView>
      <View>
        <ScrollView>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          <View>
            <View style={Styles.imagePickerView}>
              {statusImagePicker && (
                <ImagePicker
                  toogleImagePicker={toogleImagePicker}
                  toogleSetImage={toogleSetImage}
                />
              )}
              {hasImage ? (
                <Image source={{uri: image}} style={Styles.imageContainer} />
              ) : (
                <View style={Styles.iconContainer}>
                  <Icon
                    name={'capsules'}
                    type={'font-awesome-5'}
                    color="white"
                    iconStyle={Styles.icon}
                    tvParallaxProperties={undefined}
                  />
                </View>
              )}

              <TouchableOpacity
                style={Styles.button}
                onPress={toogleImagePicker}>
                <Text style={Styles.buttonText}>Adicionar foto</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={Styles.input}
              placeholder="Nome do remédio"
              onChangeText={handleInputChange}
            />

            <TextInput
              style={Styles.input}
              placeholder="Horário de tomar o remédio"
              value={`${
                !selectedDateTime ? '' : format(selectedDateTime, 'HH:mm')
              }`}
              onFocus={() => handleMultipleSelection('timePicker')}
            />

            <TextInput
              keyboardType="numeric"
              style={Styles.input}
              placeholder="Repetir a cada x horas"
              onChangeText={text => setRepeatAlarm(parseInt(text, 10))}
            />

            <TextInput
              style={Styles.input}
              placeholder="data de início"
              value={`${!initDate ? '' : format(initDate, 'dd/mm/yyyy')}`}
              onFocus={() => handleMultipleSelection('initDatePicker')}
            />

            <TextInput
              style={isSelected ? Styles.disabledInput : Styles.input}
              placeholder="data de fim"
              value={`${!endDate ? '' : format(endDate, 'dd/mm/yyyy')}`}
              onFocus={() => handleMultipleSelection('endDatePicker')}
              editable={!isSelected}
            />

            <View style={Styles.checkboxContainer}>
              <CheckBox
                center
                checked={isSelected}
                onPress={() => setIsSelected(!isSelected)}
              />
              <Text style={Styles.label}>Uso constante</Text>
            </View>

            <View style={Styles.viewButtons}>
              <TouchableOpacity style={Styles.buttonSave} onPress={handleSave}>
                <Text style={Styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.buttonCancel} onPress={goBack}>
                <Text style={Styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
          {showTimePicker && (
            <CustomDateTimePicker
              title={'Selecionar horário'}
              toogleDateTimePicker={() => {
                setShowTimePicker(false);
              }}
              toogleSetDateTime={handleSelectedTime}
              mode={'time'}
              open={showTimePicker}
            />
          )}
          {showInitDatePicker && (
            <CustomDateTimePicker
              title={'Selecionar data de inicio'}
              toogleDateTimePicker={() => {
                setShowInitDatePicker(false);
              }}
              toogleSetDateTime={handleSelectedInitDate}
              mode={'date'}
              open={showInitDatePicker}
            />
          )}
          {showEndDatePicker && (
            <CustomDateTimePicker
              title={'Selecionar data de fim'}
              toogleDateTimePicker={() => {
                setShowEndDatePicker(false);
              }}
              toogleSetDateTime={handleSelectedEndDate}
              mode={'date'}
              open={showEndDatePicker}
            />
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewMedicine;

import React, { useState } from "react";
import { Icon } from "react-native-elements";
import ImagePicker from "../../../components/CustomImagePicker/CustomImagePicker";
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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Styles } from "../NewMedicine/NewMedicine.style";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomDateTimePicker from "../../../components/CustomDateTimePicker/CustomDateTimePicker";
import {
  createTriggerNotification,
  createChannel,
  getTriggerNotifications,
} from "../../../utils/notifications/notifications";
import { AndroidImportance, AndroidCategory } from "@notifee/react-native";
import { MedicineProps, RootStackParamList } from "../../../utils/stack/stack";

const NewMedicine = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setMedicineName] = useState<string>("");

  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>();
  const [repeatAlarm, setRepeatAlarm] = useState<number>(0);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const [statusImagePicker, setStatusImagePicker] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState<string | undefined>("");

  const toogleImagePicker = () => {
    setStatusImagePicker(!statusImagePicker);
  };

  const toogleSetImage = (uri: string | undefined) => {
    setImage(uri);
    toogleImagePicker();
    setHasImage(true);
  };

  const goBack = () => {
    navigation.navigate("ListMedicine", {});
  };

  function handleInputChange(value: string) {
    setMedicineName(value);
  }

  async function saveMedicine(medicine: MedicineProps): Promise<void> {
    try {
      const data = await AsyncStorage.getItem("Medicine");
      const oldMedicine = data
        ? (JSON.parse(data) as Array<MedicineProps>)
        : [];
      const newMedicine = [medicine];

      await AsyncStorage.setItem(
        "Medicine",
        JSON.stringify([...oldMedicine, ...newMedicine])
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave() {
    try {
      if (selectedDateTime !== undefined && name !== "") {
        await createChannel();
        const reminder = createReminder();
        await createTriggerNotification(
          reminder,
          selectedDateTime,
          repeatAlarm
        );
        const medicineIds = await getTriggersIds();

        await saveMedicine({
          triggerIds: medicineIds,
          dateTimeNotification: selectedDateTime,
          name: name,
          imageUri: image!,
          repeatAlarm: repeatAlarm,
        });
        goBack();
      } else {
        Alert.alert("Não foi possível salvar");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getTriggersIds() {
    const savedNotifications = await getTriggerNotifications();
    const filteredNotifications = (await savedNotifications).filter(
      (not) => not.notification.data?.id === name
    );
    const medicineIds = filteredNotifications.reduce((results: string[], item) => {
      if (item.notification.id) results.push(item.notification.id)
      return results
  }, [])
    return medicineIds;
  }

  const createReminder = () => {
    const channelId = "custom-sound";
    const reminderNotification = {
      title: "Hora de tomar o remédio",
      body: `Está na hora de tomar o remédio ${name}`,
      data: {
        id: name,
      },
      android: {
        channelId,
        largeIcon: require("../../../assets/medicine-icon.png"),
        category: AndroidCategory.CALL,
        importance: AndroidImportance.HIGH,
        actions: [
          {
            pressAction: { id: "default" },
            title: "Encerrar",
          },
        ],
      },
    };
    return reminderNotification;
  };

  const handleSelectedTime = (date: Date) => {
    setSelectedDateTime(date);
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
                <Image source={{ uri: image }} style={Styles.imageContainer} />
              ) : (
                <View style={Styles.iconContainer}>
                  <Icon
                    name={"capsules"}
                    type={"font-awesome-5"}
                    color="white"
                    iconStyle={Styles.icon}
                    tvParallaxProperties={undefined}
                  />
                </View>
              )}

              <TouchableOpacity
                style={Styles.button}
                onPress={toogleImagePicker}
              >
                <Text style={Styles.buttonText}>Adicionar foto</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={Styles.input}
              placeholder="Nome do remédio"
              onChangeText={handleInputChange}
            />

            <TouchableOpacity
              style={Styles.datePickerInput}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={Styles.datePickerText}>
                {`${
                  !selectedDateTime
                    ? "Horário de tomar o remédio"
                    : format(selectedDateTime, "HH:mm")
                }`}
              </Text>
            </TouchableOpacity>

            <TextInput
              keyboardType="numeric"
              style={Styles.input}
              placeholder="Repetir a cada x horas"
              onChangeText={(text) => setRepeatAlarm(parseInt(text, 10))}
            />

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
              title={"Selecionar horário"}
              toogleDateTimePicker={() => {
                setShowTimePicker(false);
              }}
              toogleSetDateTime={handleSelectedTime}
              mode={"time"}
              open={showTimePicker}
            />
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewMedicine;

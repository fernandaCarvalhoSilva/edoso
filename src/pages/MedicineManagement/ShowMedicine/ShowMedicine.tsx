import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Styles } from './ShowMedicine.style';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';
import { MedicineProps, RootStackParamList } from '../../../utils/stack/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { deleteTriggerNotifications } from '../../../utils/notifications/notifications';
import { removeMeds } from '../../../interface/ApiInterface';

const ShowMedicine = () => {
  type ParamList = {
    medicine: MedicineProps;
  };
  const params = useRoute<RouteProp<ParamList, 'medicine'>>();
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineProps>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenModal, setisOpenModal] = useState(false);

  useEffect(() => {
    async function loadStorageMedicineName() {
      const medicine = params.params;
      setSelectedMedicine(medicine);
    }
    loadStorageMedicineName();
  }, [params.params]);

  const deleteMedicine = async () => {
    try {
      if (selectedMedicine) {
        const triggerStatus = await deleteTriggerNotifications(selectedMedicine.triggerIds);
        console.log(triggerStatus);
        await removeMeds(params.params.id);
        goBack();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const goBack = () => {
    navigation.navigate('ListMedicine', {reload:true});
  }

  const handleModal = () => {
    setisOpenModal(!isOpenModal);
  }

  const toogleDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
    handleModal();
  };

  return (
    <View style={Styles.mainView}>
      <View style={Styles.customModalView}>
        {isOpenDeleteModal && (
          <CustomModal
            modalTitle="Tem certeza que deseja excluir esse lembrete ?"
            handleFirstOption={() => deleteMedicine()}
            handleCancelOption={toogleDeleteModal}
            firstOptionTitle={'Excluir'}
            showIcon={true}
          />
        )}
      </View>
      {!selectedMedicine ? (
        <Text style={Styles.label}>{'Carregando...'} </Text>
      ) : (
        <>
          {selectedMedicine.imageUri !== '' ? (
            <Image
              source={{ uri: selectedMedicine.imageUri }}
              style={Styles.imageContainer}
            />
          ) : (
            <View style={Styles.iconContainer}>
              <Icon
                name={'capsules'}
                type={'font-awesome-5'}
                color="white"
                iconStyle={Styles.iconMeds}
                tvParallaxProperties={undefined}
              />
            </View>
          )}
          <View style={Styles.textView}>
            <View style={Styles.childTextView}>
              <Text style={Styles.label}>{'Rem??dio: '} </Text>
              <Text style={Styles.text}>{selectedMedicine.name} </Text>
            </View>
            <View style={Styles.childTextView}>
              <Text style={Styles.label}>{'Hor??rio: '}</Text>
              <Text style={Styles.text}>
                {format(selectedMedicine.dateTimeNotification,
                  'HH:mm',
                )}
              </Text>
            </View>
            <View style={Styles.childTextView}>
              <Text style={Styles.label}>{'Repetir: '}</Text>
              <Text
                style={
                  Styles.text
                }>{`a cada ${selectedMedicine.repeatAlarm} horas`}</Text>
            </View>
          </View>
          <TouchableHighlight style={Styles.deleteButton} onPress={toogleDeleteModal}>
            <View style={Styles.deleteButtonView}>
              <Text style={Styles.deleteButtonText}>Deletar</Text>
              <Icon
                name={'trash'}
                type={'font-awesome'}
                color="white"
                tvParallaxProperties={undefined}
              />
            </View>
          </TouchableHighlight>
        </>
      )}
    </View>
  );
};

export default ShowMedicine;

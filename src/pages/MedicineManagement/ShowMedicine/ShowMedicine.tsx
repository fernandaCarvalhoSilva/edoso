import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Styles} from './ShowMedicine.style';
import {Icon} from 'react-native-elements';
import {format, parseISO} from 'date-fns';

interface MedicineProps {
  name: string;
  dateTimeNotification: Date;
  imageUri: string;
  initDate: Date;
  endDate: Date | number;
  constantUse: boolean;
  repeatAlarm: number;
}

const ShowMedicine = () => {
  type ParamList = {
    medicine: MedicineProps;
  };
  const params = useRoute<RouteProp<ParamList, 'medicine'>>();
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineProps>();

  useEffect(() => {
    async function loadStorageMedicineName() {
      const medicine = params.params;
      setSelectedMedicine(medicine);
    }
    loadStorageMedicineName();
  }, [params.params]);

  return (
    <View style={Styles.mainView}>
      {!selectedMedicine ? (
        <Text style={Styles.label}>{'Carregando...'} </Text>
      ) : (
        <>
          {selectedMedicine.imageUri !== '' ? (
            <Image
              source={{uri: selectedMedicine.imageUri}}
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
              <Text style={Styles.label}>{'Remédio: '} </Text>
              <Text style={Styles.text}>{selectedMedicine.name} </Text>
            </View>
            <View style={Styles.childTextView}>
              <Text style={Styles.label}>{'Horário: '}</Text>
              <Text style={Styles.text}>
                {format(
                  parseISO(selectedMedicine.dateTimeNotification.toString()),
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
            <View style={Styles.childTextView}>
              <Text style={Styles.label}>{'Início: '}</Text>
              <Text style={Styles.text}>
                {format(
                  parseISO(selectedMedicine.initDate.toString()),
                  'dd/mm/yyyy',
                )}
              </Text>
            </View>
            <View style={Styles.childTextView}>
              <Text style={Styles.label}>{'Fim: '}</Text>
              <Text style={Styles.text}>
                {selectedMedicine.constantUse
                  ? 'uso constante'
                  : format(
                      parseISO(selectedMedicine.endDate.toString()),
                      'dd/mm/yyyy',
                    )}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ShowMedicine;

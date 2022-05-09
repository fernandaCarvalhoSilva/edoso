import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { getMeds } from '../../../interface/ApiInterface';
import { styles } from '../ListMedicine/ListMedicine.style';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';
import { MedicineProps, RootStackParamList } from '../../../utils/stack/stack';

const ListMedicine = (params:any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  console.log(6,params.route.params)
  async function loadMedicine(): Promise<Array<MedicineProps>> {
    try {
      const meds: any = await getMeds()
      console.log(3, meds.data)

      const medicines = meds.data.map((med: any) => {
        var time = new Date();
        time.setHours(med.time.split(":")[0]);
        time.setMinutes(med.time.split(":")[1]);
        return {
          triggerIds: [],
          name: med.name,
          dateTimeNotification: time,
          imageUri: "http://localhost:3000/public/" + med.imageName,
          repeatAlarm: med.repeat,
          id: med._id
        }
      }
      )
      console.log(1, medicines)
      return medicines;
    } catch (error) {
      console.log(2, error)
      throw new Error();
    }
  }

  const [medicines, setMedicines] = useState<Array<MedicineProps>>();
  useEffect(() => {
    async function fetchMedicines() {
      let data: Array<MedicineProps> = await loadMedicine();
      if (data != null) {
        setMedicines(data);
      }
    }

    fetchMedicines();
  }, [params.route.params]);

  const redirectToShowMedicine = (medicine: MedicineProps) => {
    navigation.navigate('ShowMedicine', medicine);
  };

  return (
    <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('NewMedicine', {})}
          accessibilityLabel="Adicione um lembrete de remédio">
          <Text style={styles.btnText}>Adicionar Lembrete</Text>
          <Icon
            name={'plus-circle'}
            type={'font-awesome-5'}
            color="white"
            iconStyle={styles.icon}
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
      </View>
      <View>
        {medicines && medicines != null && medicines !== undefined ? (
          medicines.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.listMedicinesView}
                onPress={() => redirectToShowMedicine(item)}>
                {item.imageUri !== undefined && item.imageUri !== '' ? (
                  <View
                    style={styles.imageContainer}>
                    <Image
                      resizeMode="contain"
                      style={{height:100}}
                      source={{ uri: item.imageUri }}
                    />
                  </View>
                ) : (
                  <View style={styles.iconContainer}>
                    <Icon
                      name={'capsules'}
                      type={'font-awesome-5'}
                      color="white"
                      iconStyle={styles.iconMeds}
                      tvParallaxProperties={undefined}
                    />
                  </View>
                )}
                <Text style={styles.fontSize}>{item.name} {format(
                    item.dateTimeNotification,
                    'HH:mm',
                  )}</Text>      
              </TouchableOpacity>
            );
          })
        ) : (
          <Text>Carregando...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ListMedicine;

import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';

import {styles} from '../ListMedicine/ListMedicine.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';
import {format, parseISO} from 'date-fns';
import {StackNavigationProp} from '@react-navigation/stack';
import {MedicineProps, RootStackParamList} from '../../../utils/stack/stack';

const ListMedicine = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  async function loadMedicine(): Promise<Array<MedicineProps>> {
    try {
      const data = await AsyncStorage.getItem('Medicine');
      const medicines = data ? (JSON.parse(data) as Array<MedicineProps>) : [];

      return medicines;
    } catch (error) {
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
  }, [medicines]);

  const redirectToShowMedicine = (medicine: MedicineProps) => {
    navigation.navigate('ShowMedicine', medicine);
  };

  return (
    <ScrollView>
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
                  <Image
                    source={{uri: item.imageUri}}
                    style={styles.imageContainer}
                  />
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
                <Text style={styles.fontSize}>{item.name}</Text>
                <Text style={styles.fontSize}>
                  {format(
                    parseISO(item.dateTimeNotification.toString()),
                    'HH:mm',
                  )}
                </Text>
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

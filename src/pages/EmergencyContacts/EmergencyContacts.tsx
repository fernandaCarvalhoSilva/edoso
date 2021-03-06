import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {Styles} from './EmergencyContacts.style';
import {Icon} from 'react-native-elements';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {Contact, RootStackParamList} from '../../utils/stack/stack';

const ListEmergencyContacts = () => {
  type ParamList = {
    ListEmergencyContacts?: {
      contact?: any;
    };
  };
  const emergencyContact =
    useRoute<RouteProp<ParamList, 'ListEmergencyContacts'>>();
  const contact = emergencyContact?.params?.contact;

  const [searchedContacts, setSearchedContacts] = useState<Contact[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    let loadedContacts: Contact[] = [];
    const loadEmergencyContacts = async () => {
      try {
        const data = await AsyncStorage.getItem('EmergencyContacts');
        if (data !== null) {
          loadedContacts = JSON.parse(data);
          console.log(loadedContacts);
          setSearchedContacts([...loadedContacts]);
        }
        if (contact) {
          loadedContacts.push(contact);
          await AsyncStorage.setItem(
            'EmergencyContacts',
            JSON.stringify(loadedContacts),
          );
          setSearchedContacts([...loadedContacts]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadEmergencyContacts();
  }, [contact]);

  const redirectToListContacts = () => {
    navigation.navigate('Contacts', {isEmergency: true});
  };

  const redirectToShowContact = (selectedContact: Contact) => {
    navigation.navigate('ShowContact', {selectedContact});
  };

  return (
    <ScrollView style={Styles.mainView}>
      <View style={Styles.listContainer}>
        <TouchableOpacity
          style={Styles.searchSection}
          onPress={redirectToListContacts}>
          <Text style={Styles.addContact}>Adicionar contato</Text>
          <Icon
            name={'plus'}
            type={'font-awesome'}
            color="#aa5c9f"
            iconStyle={Styles.searchIcon}
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
        <View>
          {Object.values(searchedContacts).map((item: any, key: number) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => redirectToShowContact(item)}>
                <Text
                  key={key}
                  style={key === 0 ? Styles.firstContact : Styles.contacts}>
                  {item?.displayName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ListEmergencyContacts;

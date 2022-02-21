import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {Styles} from './ListContacts.style';
import {Icon} from 'react-native-elements';
import * as Contacts from 'react-native-contacts';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface EmailAddress {
  label: string;
  email: string;
}

interface PhoneNumber {
  label: string;
  number: string;
}

interface PostalAddress {
  label: string;
  formattedAddress: string;
  street: string;
  pobox: string;
  neighborhood: string;
  city: string;
  region: string;
  state: string;
  postCode: string;
  country: string;
}

interface InstantMessageAddress {
  username: string;
  service: string;
}

interface Birthday {
  day: number;
  month: number;
  year: number;
}

interface Contact {
  recordID: string;
  rawContactId: string;
  backTitle: string;
  company: string | null;
  emailAddresses: EmailAddress[];
  displayName: string;
  familyName: string;
  givenName: string;
  middleName: string;
  jobTitle: string;
  phoneNumbers: PhoneNumber[];
  hasThumbnail: boolean;
  thumbnailPath: string;
  postalAddresses: PostalAddress[];
  prefix: string;
  suffix: string;
  department: string;
  birthday: Birthday;
  imAddresses: InstantMessageAddress[];
  note: string;
}

export type RootStackParamList = {
  EmergencyContacts: {contact: Contact};
  NewContact: {};
  ShowContact: {};
};

const ListContacts = () => {
  type ParamList = {
    ListContacts: {
      isEmergency: boolean;
    };
  };
  const contact = useRoute<RouteProp<ParamList, 'ListContacts'>>();
  const isEmergency = contact.params.isEmergency;

  const [listContacts, setListContacts] = useState<Contact[]>([]);
  const [searchedContacts, setSearchedContacts] = useState<Contact[]>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      try {
        const andoidContactPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app would like to view your contacts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
          const data = await Contacts.getAll();
          const contacts: Contact[] = [];
          data.forEach((item: any) => {
            if (item.displayName) {
              contacts.push({
                recordID: item.rawContactId,
                rawContactId: item.rawContactId,
                backTitle: item.backTitle,
                company: item.company,
                emailAddresses: item.emailAddresses,
                displayName: item.displayName,
                familyName: item.familyName,
                givenName: item.givenName,
                middleName: item.middleName,
                jobTitle: item.jobTitle,
                phoneNumbers: item.phoneNumbers,
                hasThumbnail: item.hasThumbnail,
                thumbnailPath: item.thumbnailPath,
                postalAddresses: item.postalAddresses,
                prefix: item.prefix,
                suffix: item.suffix,
                department: item.department,
                birthday: item.birthday,
                imAddresses: item.imAddresses,
                note: item.note,
              });
            }
          });
          setSearchedContacts(contacts);
          setListContacts(contacts);
          setLoading(false);
        } else {
          console.log('Contacts permission denied');
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadContacts();
  }, [navigation, isFocused]);

  const toogleSearchedContacts = (searchedValue: string) => {
    const results = listContacts.filter((searchedContact: Contact) =>
      searchedContact.displayName
        .toLowerCase()
        .includes(searchedValue.toLowerCase()),
    );
    setSearchedContacts(results);
  };

  const redirectToShowContact = (selectedContact: Contact) => {
    navigation.navigate('ShowContact', {selectedContact});
  };

  const addToEmergencyContact = (emergencyContact: Contact) => {
    navigation.navigate('EmergencyContacts', {contact: emergencyContact});
  };

  return (
    <ScrollView style={Styles.scrollView}>
      <View style={Styles.listContainer}>
        <View style={Styles.searchSection}>
          <TextInput
            style={Styles.input}
            placeholder="Pesquisar contato"
            placeholderTextColor="gray"
            onChangeText={text => toogleSearchedContacts(text)}
          />
          <Icon
            name={'search'}
            type={'font-awesome'}
            color="#aa5c9f"
            iconStyle={Styles.searchIcon}
            tvParallaxProperties={undefined}
          />
        </View>
        <View>
          {loading || searchedContacts === undefined ? (
            <Text>Carregando...</Text>
          ) : (
            searchedContacts.map((item: Contact, key: number) => {
              return (
                <View key={key}>
                  {item.phoneNumbers[0] && (
                    <TouchableOpacity
                      onPress={
                        isEmergency
                          ? () => addToEmergencyContact(item)
                          : () => redirectToShowContact(item)
                      }>
                      <Text
                        style={
                          key === 0 ? Styles.firstContact : Styles.contacts
                        }>
                        {item.displayName}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ListContacts;

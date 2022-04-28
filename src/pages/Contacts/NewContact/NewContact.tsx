import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {Styles} from './NewContact.style';
import {Icon} from 'react-native-elements';
import ImagePicker from '../../../components/CustomImagePicker/CustomImagePicker';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import * as Contacts from 'react-native-contacts';
import {StackNavigationProp} from '@react-navigation/stack';
import {Contact, RootStackParamList} from '../../../utils/stack/stack';

const NewContact = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<string>('');
  const [statusImagePicker, setStatusImagePicker] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState<string | undefined>('');
  const [contact, setContact] = useState<Contact>();
  type ParamList = {
    NewContact: {
      param: string;
      contact: Contact;
    };
  };
  const newContact = useRoute<RouteProp<ParamList, 'NewContact'>>();

  useEffect(() => {
    const loadContact = async () => {
      if (newContact.params.contact) {
        setContact(newContact.params.contact);
        setName(newContact.params.contact.displayName);
        setPhone(newContact.params.contact.phoneNumbers[0].number);
        setHasImage(newContact.params.contact.hasThumbnail);
      }
    };

    if (newContact.params.param === 'edit') {
      loadContact();
    }
  }, [newContact.params.contact, newContact.params.param]);

  const toogleImagePicker = () => {
    setStatusImagePicker(!statusImagePicker);
  };

  const toogleSetImage = (uri: string | undefined) => {
    setImage(uri);
    toogleImagePicker();
    setHasImage(true);
  };

  const handleNewContact = async () => {
    var newPerson = {
      phoneNumbers: [
        {
          label: 'mobile',
          number: phone,
        },
      ],
      displayName: name,
      hasThumbnail: hasImage,
      thumbnailPath: image,
    };

    Contacts.openContactForm(newPerson).then(async result => {
      console.log(result);
    });
  };

  const updateContact = async () => {
    try {
      const andoidContactPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to write your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
        if (contact) {
          let updatedContact = JSON.parse(JSON.stringify(contact));
          updatedContact.givenName = name;
          updatedContact.displayName = name;
          updatedContact.phoneNumbers[0].number = phone;
          if (hasImage) {
            updatedContact.hasThumbnail = true;
            updatedContact.thumbnailPath = image;
          }
          Contacts.updateContact(updatedContact).then(() => {
            navigation.navigate('ShowContact', {
              selectedContact: updatedContact,
            });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    if (newContact.params.param === 'edit') {
      navigation.navigate('ShowContact', {selectedContact: contact});
    } else {
      navigation.navigate('Home', {app: null});
    }
  };

  return (
    <ScrollView>
      <View>
        <View style={Styles.formView}>
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
                name={'user'}
                type={'font-awesome'}
                color="white"
                iconStyle={Styles.icon}
                tvParallaxProperties={undefined}
              />
            </View>
          )}

          <TouchableOpacity style={Styles.button} onPress={toogleImagePicker}>
            <Text style={Styles.buttonText}>Adicionar foto</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={Styles.input}
          placeholder="Nome"
          placeholderTextColor="gray"
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          style={Styles.input}
          keyboardType="numeric"
          placeholder="Telefone ( )"
          placeholderTextColor="gray"
          onChangeText={text => setPhone(text)}
          value={phone}
        />
        <View style={Styles.buttonsView}>
          <TouchableOpacity
            style={Styles.buttonSave}
            onPress={
              newContact.params.param === 'edit'
                ? updateContact
                : handleNewContact
            }>
            <Text style={Styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.buttonCancel} onPress={goBack}>
            <Text style={Styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewContact;

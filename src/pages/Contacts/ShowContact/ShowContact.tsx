import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  Linking,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Styles} from './ShowContact.style';
import {Icon} from 'react-native-elements';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import CustomModal from '../../../components/CustomModal/CustomModal';
import * as Contacts from 'react-native-contacts';
import {StackNavigationProp} from '@react-navigation/stack';
import {Contact, RootStackParamList} from '../../../utils/stack/stack';
const ShowContact = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  type ParamList = {
    contact: {
      selectedContact: Contact;
    };
  };
  const params = useRoute<RouteProp<ParamList, 'contact'>>();
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [statusImagePicker, setStatusImagePicker] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState('');
  const [contact, setContact] = useState<Contact>();

  useEffect(() => {
    const loadContact = async () => {
      let phoneNumber = params.params.selectedContact.phoneNumbers[0].number;
      const photo = await Contacts.getPhotoForId(
        params.params.selectedContact.recordID,
      );
      if (phoneNumber.includes('+55 ')) {
        phoneNumber = phoneNumber.replace('+55 ', '');
        params.params.selectedContact.phoneNumbers[0].number = phoneNumber;
      }
      if (photo) {
        setImage(photo);
        setHasImage(true);
      }
      setContact(params.params.selectedContact);
    };
    loadContact();
  }, [params]);

  const toogleImagePicker = () => {
    setStatusImagePicker(!statusImagePicker);
  };

  const callContact = () => {
    let call = `tel:${contact?.phoneNumbers[0].number}`;
    Linking.canOpenURL(call)
      .then(supported => {
        if (!supported) {
          Alert.alert('Número não está disponível');
        } else {
          return Linking.openURL(call);
        }
      })
      .catch(err => console.log(err));
  };

  const openWhatsapp = () => {
    Linking.openURL(
      `whatsapp://send?text=${''}&phone=55${contact?.phoneNumbers[0].number}`,
    );
  };

  const openSms = () => {
    Linking.openURL(`sms:${contact?.phoneNumbers[0].number}?body=${''}`);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleModal = () => {
    setisOpenModal(!isOpenModal);
  };

  const redirectToEdit = () => {
    if (contact?.recordID) {
      navigation.navigate('NewContact', {param: 'edit', contact: contact});
    }
  };

  const toogleDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
    handleModal();
  };

  async function deleteContact() {
    if (contact) {
      Contacts.deleteContact(contact).then(() => {
        navigation.navigate('Contacts', {isEmergency: false});
      });
    }
  }

  return (
    <ScrollView>
      <View>
        <View style={Styles.customModalView}>
          {isOpenDeleteModal && (
            <CustomModal
              modalTitle="Tem certeza que deseja excluir esse contato ?"
              handleFirstOption={() => deleteContact()}
              handleCancelOption={toogleDeleteModal}
              firstOptionTitle={'Excluir'}
              showIcon={true}
            />
          )}
        </View>
        <View>
          <View style={Styles.mainView}>
            {/* {hasImage ? (
              <TouchableOpacity onPress={toogleImagePicker}>
                <Image source={{uri: image}} style={Styles.imageContainer} />
              </TouchableOpacity>
            ) : ( */}
              <TouchableOpacity onPress={toogleImagePicker}>
                <View style={Styles.iconContainer}>
                  <Icon
                    name={'user'}
                    type={'font-awesome'}
                    color="white"
                    iconStyle={Styles.icon}
                    tvParallaxProperties={undefined}
                  />
                </View>
              </TouchableOpacity>
            {/* )} */}

            <View style={Styles.topbarView}>
              <View style={Styles.topbar}>
                <Text style={Styles.cardText}>{contact?.displayName}</Text>
                <View style={Styles.topbarButtonView}>
                  <TouchableOpacity onPress={handleModal}>
                    <Icon
                      name={'ellipsis-v'}
                      type={'font-awesome'}
                      color="black"
                      iconStyle={Styles.dotIcon}
                      tvParallaxProperties={undefined}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {isOpenModal && (
              <View style={Styles.optionsModalView}>
                <View style={Styles.optionsView}>
                  <TouchableOpacity
                    style={Styles.editButton}
                    onPress={redirectToEdit}>
                    <Icon
                      name={'pencil'}
                      type={'font-awesome'}
                      color="gray"
                      tvParallaxProperties={undefined}
                    />
                    <Text style={Styles.listOptions}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Styles.deleteButton}
                    onPress={toogleDeleteModal}>
                    <Icon
                      name={'trash'}
                      type={'font-awesome'}
                      color="gray"
                      tvParallaxProperties={undefined}
                    />
                    <Text style={Styles.listOptions}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableHighlight style={Styles.buttonCall} onPress={callContact}>
              <View style={Styles.callButton}>
                <Text style={Styles.buttonText}>Ligar</Text>
                <Icon
                  name={'phone'}
                  type={'font-awesome'}
                  color="white"
                  tvParallaxProperties={undefined}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={Styles.buttonWhatsapp}
              onPress={openWhatsapp}>
              <View style={Styles.whatsappButton}>
                <Text style={Styles.buttonText}>WhatsApp</Text>
                <Icon
                  name={'whatsapp'}
                  type={'font-awesome'}
                  color="white"
                  tvParallaxProperties={undefined}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={Styles.buttonMessage} onPress={openSms}>
              <View style={Styles.messageButton}>
                <Text style={Styles.buttonText}>SMS</Text>
                <Icon
                  name={'comments'}
                  type={'font-awesome'}
                  color="white"
                  tvParallaxProperties={undefined}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={Styles.buttonBack} onPress={goBack}>
              <View style={Styles.goBackButton}>
                <Text style={Styles.buttonText}>Voltar</Text>
                <Icon
                  name={'arrow-left'}
                  type={'font-awesome'}
                  color="white"
                  tvParallaxProperties={undefined}
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ShowContact;

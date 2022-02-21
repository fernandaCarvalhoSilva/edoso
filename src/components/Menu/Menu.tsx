import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Image,
  ImageURISource,
  Linking,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import SendIntentAndroid from 'react-native-send-intent';
import CustomModal from '../CustomModal/CustomModal';

import {Styles} from './Menu.style';
interface Menu {
  iconName: string;
  iconType: string;
  text: string;
  image: ImageURISource | string;
  url: string;
  urlType: string;
  params?: Object;
}

export type RootStackParamList = {
  Camera: {zoomMode: boolean};
  NewContact: {};
  Contacts: {};
  MoreApps: {};
  ListMedicine: {};
  EmergencyContacts: {};
  Settings: {};
};
const Menu = (Props: Menu) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [installAppModal, setInstallAppModal] = useState(false);
  const [packageName, setPackageName] = useState('');

  const handleToogleApps = (
    url: any,
    urlType: string,
    componentParams: Object | undefined,
  ) => {
    switch (urlType) {
      case 'intent':
        SendIntentAndroid.openApp(url, {}).then(result => {
          if (!result) {
            setInstallAppModal(true);
            setPackageName(url);
          }
        });
        break;
      case 'component':
        navigation.navigate(url, componentParams);
        break;
      case 'url':
        Linking.openURL(url);
        break;
      default:
        break;
    }
  };

  const redirectToPlayStore = () => {
    const storeUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
    Linking.canOpenURL(storeUrl)
      .then(supported => {
        if (!supported) {
          setInstallAppModal(true);
        } else {
          return Linking.openURL(storeUrl);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View>
      {installAppModal && (
        <CustomModal
          modalTitle="Parece que esse aplicativo não está instalado no seu dispositivo. Deseja instalar?"
          handleFirstOption={redirectToPlayStore}
          handleCancelOption={() => setInstallAppModal(false)}
          firstOptionTitle={'Sim'}
          showIcon={false}
        />
      )}
      <Card containerStyle={Styles.card}>
        <TouchableOpacity
          onPress={() =>
            handleToogleApps(Props.url, Props.urlType, Props.params)
          }>
          {Props.iconName ? (
            <Icon
              name={Props.iconName}
              type={Props.iconType}
              color="white"
              iconStyle={Styles.icon}
              tvParallaxProperties={undefined}
            />
          ) : (
            <Image
              source={{uri: `data:image/png;base64,${Props.image}`}}
              style={Styles.imageContainer}
            />
          )}
        </TouchableOpacity>
      </Card>
      <Text style={Styles.cardText}>{Props.text}</Text>
    </View>
  );
};

export default Menu;

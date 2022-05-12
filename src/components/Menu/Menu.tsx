import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Image,
  ImageURISource,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import CustomModal from '../CustomModal/CustomModal';
import {handleApps, redirectToPlayStore} from '../../utils/apps/MenuApps'
import {Styles} from './Menu.style';
import { useNavigation } from '@react-navigation/native';
import {RootStackParamList} from '../../utils/stack/stack';

interface Menu {
  iconName: string;
  iconType: string;
  text: string;
  image: ImageURISource | string;
  url: string;
  urlType: string;
  params?: Object;
  toogleVoiceRecord: Function;
}

const Menu = (Props: Menu) => {
  const [openModalApp, setOpenAppModal] = useState(false);
  const [packageName, setPackageName] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const toogleApps = async (
    url: any,
    urlType: string,
    componentParams: Object | undefined,
  ) => {
    setPackageName(url);
    if (urlType === 'voiceRecord') {
      Props.toogleVoiceRecord();
      return;
    }
    if (urlType === 'component') {
      navigation.navigate(url, componentParams);
    }
    const open = await handleApps(url, urlType);
    setOpenAppModal(open);
  };

  return (
    <View>
      {openModalApp && (
        <CustomModal
          modalTitle="Parece que esse aplicativo não está instalado no seu dispositivo. Deseja instalar?"
          handleFirstOption={() => redirectToPlayStore(packageName)}
          handleCancelOption={() => setOpenAppModal(false)}
          firstOptionTitle={'Sim'}
          showIcon={false}
        />
      )}
      <Card containerStyle={Styles.card}>
        <TouchableOpacity
          onPress={() =>
            toogleApps(Props.url, Props.urlType, Props.params)
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

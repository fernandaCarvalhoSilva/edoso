import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Styles} from './Settings.style';
import {Icon} from 'react-native-elements';
import SendIntentAndroid from 'react-native-send-intent';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/stack/stack';

const Settings = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const openWifiSettings = () => {
    SendIntentAndroid.openSettings('android.settings.WIFI_SETTINGS');
  };

  const openDisplaySettings = () => {
    SendIntentAndroid.openSettings('android.settings.DISPLAY_SETTINGS');
  };

  const showTutorialPage = () => {
    navigation.navigate('Tutorial', {});
  };

  return (
    <ScrollView>
      <View style={Styles.list}>
        <Icon
          name={'font'}
          type={'font-awesome'}
          color="#aa5c9f"
          iconStyle={Styles.searchIcon}
          tvParallaxProperties={undefined}
        />
        <Text style={Styles.options} onPress={() => openDisplaySettings()}>
          Tamanho da fonte
        </Text>
      </View>
      <View style={Styles.list}>
        <Icon
          name={'wifi'}
          type={'font-awesome'}
          color="#aa5c9f"
          iconStyle={Styles.searchIcon}
          tvParallaxProperties={undefined}
        />
        <Text style={Styles.options} onPress={() => openWifiSettings()}>
          Rede e Internet
        </Text>
      </View>
      <View style={Styles.list}>
        <Icon
          name={'question-circle'}
          type={'font-awesome'}
          color="#aa5c9f"
          iconStyle={Styles.searchIcon}
          tvParallaxProperties={undefined}
        />
        <Text style={Styles.options} onPress={() => showTutorialPage()}>
          Ajuda
        </Text>
      </View>
    </ScrollView>
  );
};

export default Settings;

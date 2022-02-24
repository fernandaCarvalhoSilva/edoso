import {ImageURISource, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Styles} from './Home.style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import VoiceRecord from '../../components/VoiceRecorder/VoiceRecorder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../../components/Menu/Menu';

export type RootStackParamList = {
  Camera: {zoomMode: boolean};
  NewContact: {};
  Contacts: {};
  MoreApps: {};
  ListMedicine: {};
  EmergencyContacts: {};
  Settings: {};
};

interface MenuItems {
  iconName?: string;
  iconType?: string;
  image?: ImageURISource;
  text: string;
  url: string;
  urlType: 'intent' | 'url' | 'component' | 'state';
  params?: Object;
}

interface NewApp {
  packageName: string;
  appName: string;
  icon: ImageURISource;
  apkDir: string;
}
export default function App() {
  type ParamList = {
    Home: {
      app: NewApp;
    };
  };
  const params = useRoute<RouteProp<ParamList, 'Home'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [menu, setMenu] = useState<MenuItems[]>([]);

  useEffect(() => {
    const loadMenuApps = async () => {
      let menuItems: MenuItems[] = [
        {
          iconName: 'whatsapp',
          iconType: 'font-awesome',
          text: 'Whatsapp',
          url: 'com.whatsapp',
          urlType: 'intent',
        },
        {
          iconName: 'facebook',
          iconType: 'font-awesome',
          text: 'Facebook',
          url: 'com.facebook.katana',
          urlType: 'intent',
        },
        {
          iconName: 'phone',
          iconType: 'font-awesome',
          text: 'Chamadas',
          url: 'tel:',
          urlType: 'url',
        },
        {
          iconName: 'image',
          iconType: 'font-awesome',
          text: 'Fotos',
          url: 'content://media/internal/images/media',
          urlType: 'url',
        },
        {
          iconName: 'camera',
          iconType: 'font-awesome',
          text: 'Camera',
          url: 'Camera',
          urlType: 'component',
          params: {zoomMode: false},
        },
        {
          iconName: 'microphone',
          iconType: 'font-awesome',
          text: 'Microfone',
          url: '',
          urlType: 'state',
        },
        {
          iconName: 'search',
          iconType: 'font-awesome',
          text: 'Lupa',
          url: 'Camera',
          urlType: 'component',
          params: {zoomMode: true},
        },
        {
          iconName: 'user-plus',
          iconType: 'font-awesome',
          text: 'Criar Contato',
          url: 'NewContact',
          urlType: 'component',
          params: {},
        },
        {
          iconName: 'first-aid',
          iconType: 'font-awesome-5',
          text: 'Emergência',
          url: 'EmergencyContacts',
          urlType: 'component',
          params: {},
        },
        {
          iconName: 'capsules',
          iconType: 'font-awesome-5',
          text: 'Remédios',
          url: 'ListMedicine',
          urlType: 'component',
          params: {},
        },
        {
          iconName: 'users',
          iconType: 'font-awesome',
          text: 'Contatos',
          url: 'Contacts',
          urlType: 'component',
          params: {},
        },
        {
          iconName: 'plus',
          iconType: 'font-awesome',
          text: 'Mais',
          url: 'MoreApps',
          urlType: 'component',
          params: {},
        },
        {
          iconName: 'cog',
          iconType: 'font-awesome',
          text: 'Ajustes',
          url: 'Settings',
          urlType: 'component',
          params: {},
        },
      ];
      let data: any = await AsyncStorage.getItem('selectedApps');
      if (data !== null) {
        const loadedItems = JSON.parse(data) as Array<MenuItems>;
        menuItems = menuItems.concat(loadedItems);
      }
      if (params.params) {
        saveNewApp(data, menuItems);
      }
      setMenu(menuItems);
    };

    const saveNewApp = async (apps: string, menuItems: MenuItems[]) => {
      try {
        const app = params.params.app;
        let selectedApps: MenuItems[] = [];
        if (apps) {
          const loadedApps = JSON.parse(apps) as Array<MenuItems>;
          selectedApps = loadedApps;
        }
        const newApp: MenuItems = {
          image: app.icon,
          text: app.appName,
          url: app.packageName,
          urlType: 'intent',
        };
        selectedApps.push(newApp);
        menuItems.push(newApp);
        await AsyncStorage.setItem(
          'selectedApps',
          JSON.stringify(selectedApps),
        );
        setMenu([...menuItems]);
      } catch (error) {
        console.log(error);
      }
    };

    loadMenuApps();
  }, [isRecordingVoice, navigation, params.params]);

  const handleVoiceRecordResults = (results: string[]) => {
    const convertedResults = results.map(item => item.toUpperCase());
    menu.map(item => {
      if (convertedResults.includes(item.text.toUpperCase())) {
        setIsRecordingVoice(!isRecordingVoice);
      }
    });
  };

  return (
    <ScrollView>
      <View style={Styles.mainView}>
        {isRecordingVoice && (
          <VoiceRecord handleVoiceRecordResults={handleVoiceRecordResults} />
        )}
        {menu.map((item, key) => {
          return (
            <View key={key} style={Styles.menuCardView}>
              <Menu
                iconName={item.iconName ? item.iconName : ''}
                iconType={item.iconType ? item.iconType : ''}
                image={item.image ? item.image : ''}
                text={item.text}
                url={item.url}
                urlType={item.urlType}
                params={item.params}
              />
            </View>
          );
        })}
      </View>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        translucent={true}
      />
    </ScrollView>
  );
}

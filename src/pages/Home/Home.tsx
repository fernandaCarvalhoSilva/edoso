import { ImageURISource, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Styles } from "./Home.style";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import VoiceRecord from "../../components/VoiceRecorder/VoiceRecorder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "../../components/Menu/Menu";
import { handleApps, redirectToPlayStore, MenuItems, menuApps } from "../../utils/apps/MenuApps";
import CustomModal from "../../components/CustomModal/CustomModal";
import {RootStackParamList} from '../../utils/stack/stack';

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
  const params = useRoute<RouteProp<ParamList, "Home">>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [menu, setMenu] = useState<MenuItems[]>([]);
  const [appModal, setOpenAppModal] = useState(false);
  const [packageName, setPackageName] = useState("");

  useEffect(() => {
    const getTutorial = async () => {
      try {
        let data: any = await AsyncStorage.getItem('tutorial');
        if (data == null) {
          navigation.navigate('Tutorial', {});
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    getTutorial();
  }, [])

  useEffect(() => {
    const loadMenuApps = async () => {
      let apps = menuApps;
      let data: any = await AsyncStorage.getItem("selectedApps");
      if (data !== null) {
        const loadedItems = JSON.parse(data) as Array<MenuItems>;
        apps = apps.concat(loadedItems);
      }
      if (params.params && Object.keys(params.params).length !== 0) {
        saveNewApp(data, apps);
      }
      setMenu(apps);
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
          urlType: "intent",
        };
        selectedApps.push(newApp);
        menuItems.push(newApp);
        await AsyncStorage.setItem(
          "selectedApps",
          JSON.stringify(selectedApps)
        );
        setMenu([...menuItems]);
      } catch (error) {
        console.log(error);
      }
    };

    loadMenuApps();
  }, [params.params]);

  const handleVoiceRecordResults = (results: string[]) => {
    const convertedResults = results.map((item) => item.toUpperCase());
    menu.map((item) => {
      setPackageName(item.url);
      if (convertedResults.includes(item.text.toUpperCase())) {
        setIsRecordingVoice(!isRecordingVoice);
        if (item.urlType === 'component') {
          navigation.navigate(item.url, item.params);
        }
        const isOpenAppModal = handleApps(item.url, item.urlType);
        setOpenAppModal(isOpenAppModal);
      }
    });
  };

  return (
    <ScrollView>
      {appModal && (
        <CustomModal
          modalTitle="Parece que esse aplicativo não está instalado no seu dispositivo. Deseja instalar?"
          handleFirstOption={() => redirectToPlayStore(packageName)}
          handleCancelOption={() => setOpenAppModal(false)}
          firstOptionTitle={"Sim"}
          showIcon={false}
        />
      )}
      <View style={Styles.mainView}>
        {isRecordingVoice && (
          <VoiceRecord handleVoiceRecordResults={handleVoiceRecordResults} />
        )}
        {menu.map((item, key) => {
          return (
            <View key={key} style={Styles.menuCardView}>
              <Menu
                iconName={item.iconName ? item.iconName : ""}
                iconType={item.iconType ? item.iconType : ""}
                image={item.image ? item.image : ""}
                text={item.text}
                url={item.url}
                urlType={item.urlType}
                params={item.params}
                toogleVoiceRecord={() => setIsRecordingVoice(!isRecordingVoice)}
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

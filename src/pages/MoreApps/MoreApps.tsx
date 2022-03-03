import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  //   Linking,
  TextInput,
  Animated,
  ImageURISource,
} from 'react-native';
import {Styles} from './MoreApps.style';
import {Icon} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import RNInstalledApplication from 'react-native-installed-application';
import CustomModal from '../../components/CustomModal/CustomModal';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {App, RootStackParamList} from '../../utils/stack/stack';

const NewApps = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchedApps, setSearchedApps] = useState<App[]>([]);
  const [installedApps, setInstalledApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<App>();
  useEffect(() => {
    const loadInstalledApps = async () => {
      RNInstalledApplication.getNonSystemApps()
        .then((apps: React.SetStateAction<App[]>) => {
          setSearchedApps(apps);
          setInstalledApps(apps);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };
    loadInstalledApps();
  }, []);

  const toogleSearchedApps = (searchedValue: string) => {
    const results: App[] = installedApps.filter((app: {appName: string}) =>
      app.appName.toLowerCase().includes(searchedValue.toLowerCase()),
    );
    setSearchedApps(results);
  };

  const openModal = (app: App) => {
    setIsOpenModal(true);
    setSelectedApp(app);
  };

  const addAppToHomepage = () => {
    if (selectedApp) {
      navigation.navigate('Home', {app: selectedApp});
    }
  };

  return (
    <ScrollView>
      <View>
        <View style={Styles.modalView}>
          {isOpenModal && (
            <CustomModal
              modalTitle="Deseja adicionar esse aplicativo a tela inicial ?"
              handleFirstOption={addAppToHomepage}
              handleCancelOption={() => setIsOpenModal(false)}
              firstOptionTitle={'Adicionar'}
              showIcon={false}
            />
          )}
        </View>
        <View style={Styles.searchSection}>
          <TextInput
            style={Styles.input}
            placeholder="Pesquisar aplicativo"
            placeholderTextColor="gray"
            onChangeText={text => toogleSearchedApps(text)}
          />
          <Icon
            name={'search'}
            type={'font-awesome'}
            color="#aa5c9f"
            iconStyle={Styles.searchIcon}
            tvParallaxProperties={undefined}
          />
        </View>
        {loading || searchedApps === undefined ? (
          <Text>Carregando...</Text>
        ) : (
          searchedApps.map((item, key) => {
            return (
              <TouchableWithoutFeedback
                key={key}
                onPress={() => {
                  openModal(item);
                }}>
                <Animated.View style={Styles.listContainer}>
                  <Image
                    source={{uri: `data:image/png;base64,${item.icon}`}}
                    style={Styles.imageContainer}
                  />
                  <Text style={Styles.options}>{item.appName}</Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default NewApps;

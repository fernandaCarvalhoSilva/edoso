import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home/Home";
import Camera from "./pages/Camera/Camera";
import NewContact from "./pages/Contacts/NewContact/NewContact";
import Contacts from "./pages/Contacts/ListContacts/ListContacts";
import ShowContact from "./pages/Contacts/ShowContact/ShowContact";
import MoreApps from "./pages/MoreApps/MoreApps";
import ListMedicine from "./pages/MedicineManagement/ListMedicine/ListMedicine";
import NewMedicine from "./pages/MedicineManagement/NewMedicine/NewMedicine";
import ShowMedicine from "./pages/MedicineManagement/ShowMedicine/ShowMedicine";
import EmergencyContacts from "./pages/EmergencyContacts/EmergencyContacts";
import Settings from "./pages/Settings/Settings";
import TutorialPage from "./pages/Settings/Tutorial/TutorialPage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';

const AppStack = createStackNavigator();

export default function Routes() {
  LogBox.ignoreAllLogs();
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  AsyncStorage.getItem('client-key').then(key => {
    if (key === undefined || key === "" || key === null) {
      AsyncStorage.setItem('client-key', makeid());
    }
  });
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 32, paddingLeft: 20 },
        }}
      >
        <AppStack.Screen
          name="Home"
          component={Home}
          options={{ title: "E-doso" }}
        />
        <AppStack.Screen
          name="Camera"
          component={Camera}
          options={{ title: "Câmera" }}
        />
        <AppStack.Screen
          name="NewContact"
          component={NewContact}
          options={{ title: "Novo contato" }}
        />
        <AppStack.Screen
          name="Contacts"
          component={Contacts}
          options={{ title: "Contatos" }}
        />
        <AppStack.Screen
          name="ShowContact"
          component={ShowContact}
          options={{ title: "Exibir Contato" }}
        />
        <AppStack.Screen
          name="MoreApps"
          component={MoreApps}
          options={{ title: "Mais aplicativos" }}
        />
        <AppStack.Screen
          name="ListMedicine"
          component={ListMedicine}
          options={{ title: "Remédios" }}
        />
        <AppStack.Screen
          name="NewMedicine"
          component={NewMedicine}
          options={{ title: "Novo remédio" }}
        />
        <AppStack.Screen
          name="ShowMedicine"
          component={ShowMedicine}
          options={{ title: "Visualizar remédio" }}
        />
        <AppStack.Screen
          name="EmergencyContacts"
          component={EmergencyContacts}
          options={{ title: "Emergência" }}
        />
        <AppStack.Screen
          name="Settings"
          component={Settings}
          options={{ title: "Configurações" }}
        />
        <AppStack.Screen
          name="Tutorial"
          component={TutorialPage}
          options={{ title: "Tutorial" }}
        /> 
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

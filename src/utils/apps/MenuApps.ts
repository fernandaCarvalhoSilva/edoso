import { ImageURISource, Linking } from "react-native";
import SendIntentAndroid from "react-native-send-intent";
export interface MenuItems {
  iconName?: string;
  iconType?: string;
  image?: ImageURISource;
  text: string;
  url: any;
  urlType: "intent" | "url" | "component" | "state" | "voiceRecord";
  params?: Object;
}

export const menuApps: MenuItems[] = [
  {
    iconName: "whatsapp",
    iconType: "font-awesome",
    text: "Whatsapp",
    url: 'com.whatsapp',
    urlType: 'intent',
  },
  {
    iconName: "facebook",
    iconType: "font-awesome",
    text: "Facebook",
    url: "https://www.facebook.com/",
    urlType: "url",
  },
  {
    iconName: "phone",
    iconType: "font-awesome",
    text: "Chamadas",
    url: "tel:",
    urlType: "url",
  },
  {
    iconName: "image",
    iconType: "font-awesome",
    text: "Fotos",
    url: "content://media/internal/images/media",
    urlType: "url",
  },
  {
    iconName: "camera",
    iconType: "font-awesome",
    text: "Camera",
    url: "Camera",
    urlType: "component",
    params: { zoomMode: false },
  },
  {
    iconName: "microphone",
    iconType: "font-awesome",
    text: "Microfone",
    url: "",
    urlType: "voiceRecord",
  },
  {
    iconName: "search",
    iconType: "font-awesome",
    text: "Lupa",
    url: "Camera",
    urlType: "component",
    params: { zoomMode: true },
  },
  {
    iconName: "user-plus",
    iconType: "font-awesome",
    text: "Criar Contato",
    url: "NewContact",
    urlType: "component",
    params: {},
  },
  {
    iconName: "first-aid",
    iconType: "font-awesome-5",
    text: "Emergência",
    url: "EmergencyContacts",
    urlType: "component",
    params: {},
  },
  {
    iconName: "capsules",
    iconType: "font-awesome-5",
    text: "Remédios",
    url: "ListMedicine",
    urlType: "component",
    params: {},
  },
  {
    iconName: "users",
    iconType: "font-awesome",
    text: "Contatos",
    url: "Contacts",
    urlType: "component",
    params: {},
  },
  {
    iconName: "plus",
    iconType: "font-awesome",
    text: "Mais",
    url: "MoreApps",
    urlType: "component",
    params: {},
  },
  {
    iconName: "cog",
    iconType: "font-awesome",
    text: "Ajustes",
    url: "Settings",
    urlType: "component",
    params: {},
  },
]

export const handleApps = async (
  url: any,
  urlType: string,
): Promise<boolean> => {
  let openAppModal = false;
  switch (urlType) {
    case "intent":
      await SendIntentAndroid.openApp(url, {}).then((result) => {
        console.log(3,result)
        if (!result) {
            openAppModal= true
        }
      });
      break;
    case "url":
      await Linking.openURL(url).then((result) => {
        // openAppModal = true;
      }) ;
      break;
    default:
      break;
  }
  return openAppModal;
};

export const redirectToPlayStore = (packageName: string) => {
  const storeUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
  Linking.canOpenURL(storeUrl)
    .then(supported => {
      if (supported) {
        return Linking.openURL(storeUrl);
      }
    })
    .catch(err => console.log(err));
};

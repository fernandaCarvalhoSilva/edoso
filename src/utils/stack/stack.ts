import { ImageURISource } from "react-native";

export interface Contact {
    recordID: string;
    rawContactId: string;
    backTitle: string;
    company: string | null;
    emailAddresses: EmailAddress[];
    displayName: string;
    familyName: string;
    givenName: string;
    middleName: string;
    jobTitle: string;
    phoneNumbers: PhoneNumber[];
    hasThumbnail: boolean;
    thumbnailPath: string;
    postalAddresses: PostalAddress[];
    prefix: string;
    suffix: string;
    department: string;
    birthday: Birthday;
    imAddresses: InstantMessageAddress[];
    note: string;
}

interface EmailAddress {
    label: string;
    email: string;
  }
  
  interface PhoneNumber {
    label: string;
    number: string;
  }
  
  interface PostalAddress {
    label: string;
    formattedAddress: string;
    street: string;
    pobox: string;
    neighborhood: string;
    city: string;
    region: string;
    state: string;
    postCode: string;
    country: string;
  }
  
  interface InstantMessageAddress {
    username: string;
    service: string;
  }
  
  interface Birthday {
    day: number;
    month: number;
    year: number;
  }

export  interface MedicineProps {
    triggerIds: string[];
    name: string;
    dateTimeNotification: Date;
    imageUri: string;
    repeatAlarm: number | undefined;
    id: string | undefined;
}

export interface App {
    packageName: string;
    appName: string;
    icon: ImageURISource;
    apkDir: string;
}

export type RootStackParamList = {
    Home: {app: App | null};
    Camera: {zoomMode: boolean};
    NewContact: {param: string; contact: Contact};
    Contacts: {isEmergency: boolean};
    MoreApps: {};
    ListMedicine: {reload:boolean};
    EmergencyContacts: {contact: Contact};
    Settings: {};
    ShowContact: {};
    NewMedicine: {};
    ShowMedicine: MedicineProps;
    Tutorial: {};
};
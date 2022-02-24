import notifee, {
  TriggerType,
  RepeatFrequency,
  AndroidCategory,
  TimeUnit,
  AndroidImportance,
} from "@notifee/react-native";

export interface Reminder {
  title: string;
  body: string;
  android: Android;
}

interface Android {
  channelId: string;
  category: AndroidCategory;
  importance: number;
  actions: Actions[];
}

interface Actions {
  pressAction: {id: string};
  title: string;
}
export async function createTriggerNotification(
  reminderNotification: Reminder,
  selectedDateTime: Date,
  repeatAlarm: number,
) {
    const medicineTime = selectedDateTime;
    for (var i = 1; i <= repeatAlarm; i++) {
        if (i > 1) {
            medicineTime.setHours(medicineTime.getHours() + repeatAlarm);
        }
        await notifee.createTriggerNotification(reminderNotification, {
            type: TriggerType.TIMESTAMP,
            timestamp: medicineTime.getTime(),
            repeatFrequency: RepeatFrequency.DAILY,
          })
    }
}

export async function createChannel() {
  await notifee.getChannels().then(async (channels) => {
      if (channels.length === 0) {
        await notifee.createChannel({
            id: "custom-sound",
            name: "System Sound",
            sound: 'time_alarm',
            importance: AndroidImportance.HIGH,
            bypassDnd: true,
          });
      }
  })
}

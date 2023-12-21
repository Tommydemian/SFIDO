import * as Notifications from "expo-notifications";

type NotificationContent = {
  title: string;
  body: string;
  data: { data: string };
  selectedDate: Date;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const scheduleNotifications = async ({
  title,
  body,
  data,
  selectedDate,
}: NotificationContent) => {
  try {
    const now = new Date();

    if (selectedDate > now) {
      console.log("wait for it");
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: selectedDate,
      });
    } else {
      console.log("Selected date is in the past.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const requestPermissions = () => {
  Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  })
    .then((status) => {
      // permission is granted or denied
      console.log(status);
    })
    .catch((error) => {
      console.log(error);
    });
};

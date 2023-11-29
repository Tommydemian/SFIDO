import * as Notifications from 'expo-notifications';

type NotificationContent = {
  title: string
  body: string
  data: {data: string}
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true, 
      shouldSetBadge: true,
    }),
  });

  export const scheduleNotifications = async({title, body, data}: NotificationContent) => {
    try {
      await Notifications.scheduleNotificationAsync({
          content: {
            title,
            body,
            data
          },
          trigger: { seconds: 5 },
        });
      } catch (error) {
        console.log(error);
      }
  }

  export const requestPermissions = () => {
    Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true, 
            allowBadge: true, 
            allowSound: true, 
            allowAnnouncements: true,
        }
      }).then((status) => {
        // permission is granted or denied
        console.log(status);
      }).catch((error) => {
        console.log(error);
        
      })
  }
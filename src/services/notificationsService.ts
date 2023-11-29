import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true, 
      shouldSetBadge: true,
    }),
  });

  export const scheduleNotifications = async() => {
    await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: 'Here is the notification body',
          data: { data: 'goes here' },
        },
        trigger: { seconds: 5 },
      });
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
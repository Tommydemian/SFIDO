import * as Notifications from 'expo-notifications';
import format from 'date-fns/format';

type NotificationContent = {
  title: string
  body: string
  data: {data: string}, 
  selectedDateString: string
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true, 
      shouldSetBadge: true,
    }),
  });

  export const scheduleNotifications = async({title, body, data, selectedDateString}: NotificationContent) => {
    try {

         // Divide la cadena de fecha y hora
    const [datePart, timePart] = selectedDateString.split(' ');
    const [year, month, day] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
      
    // Crea un objeto Date
    const selectedDate = new Date(year, month - 1, day, hours, minutes)
    // console.log(selectedDate, 'SELECTED DATE from func');
    console.log(format(selectedDate, 'PPpp'), 'SELECTED DATE from func'); // Formatea la fecha en la zona horaria local

    
      // verify that selectedDate is in the future
     // Obtiene la fecha y hora actual en la zona horaria local
     const now = new Date();
  
     console.log(format(now, 'PPpp'), 'NOW FROM func'); // Formatea la fecha en la zona horaria local

    //  console.log(now.toString(), 'NOW FROM func'); 
      
      if (selectedDate) {
        console.log('wait for it');
        await Notifications.scheduleNotificationAsync({
          content: {
            title,
            body,
            data
          },
          trigger: selectedDate,
        });
      } else {
        console.log("Selected date is in the past.");
      }
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
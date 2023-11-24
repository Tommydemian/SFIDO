// import * as React from 'react';
// import * as Google from 'expo-auth-session/providers/google';
// import { Button } from 'react-native';

// export const GoogleButton = () => {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: '86924702179-fkg4evrmr3rcu1om8np5gg898v73u5j6.apps.googleusercontent.com',
//   });

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response;
//       // Aquí puedes usar el token de Google para autenticarte con tu backend o Firebase
//     }
//   }, [response]);

//   return (
//     <Button
//       disabled={!request}
//       title="Login with Google"
//       onPress={() => {
//         promptAsync();
//       }}
//     />
//   );
// }

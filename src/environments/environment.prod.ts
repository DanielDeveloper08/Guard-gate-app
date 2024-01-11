const BASE_URL:string = 'https://guardgatedeploy.onrender.com';

export const environment = {
  firebaseConfig:{
    apiKey: "AIzaSyChMR9gt5ofJbveZOIt-LvwYMVAvIm7w-M",
    authDomain: "guardgate.firebaseapp.com",
    projectId: "guardgate",
    storageBucket: "guardgate.appspot.com",
    messagingSenderId: "784643634677",
    appId: "1:784643634677:web:b29310e0aedb7214525cbc"
  },
  production: true,
  URL_API: `${BASE_URL}/api/v1`,
  SOCKET_URL: BASE_URL,
  QR_PREFIX: 'guardgate-'
};
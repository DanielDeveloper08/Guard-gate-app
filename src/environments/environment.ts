const BASE_URL:string = 'https://guardgatedeploy.onrender.com';

export const environment = {
  KEY_CRYPTO: 'key#crypto?uid=guard_gate_app82610987',
  IV_CRYPTO: 'iv_crypto?uid=guard_gate_app5209141230',
  firebaseConfig:{
    apiKey: "AIzaSyChMR9gt5ofJbveZOIt-LvwYMVAvIm7w-M",
    authDomain: "guardgate.firebaseapp.com",
    projectId: "guardgate",
    storageBucket: "guardgate.appspot.com",
    messagingSenderId: "784643634677",
    appId: "1:784643634677:web:b29310e0aedb7214525cbc"
  },
  production: false,
  URL_API: `${BASE_URL}/api/v1`,
  SOCKET_URL: BASE_URL,
  QR_PREFIX: 'guardgate-'
};
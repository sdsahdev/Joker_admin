// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBNJl8fdc-3CodcrJBXD4-pkX2dgzOXrW8",
//     authDomain: "joker-c5878.firebaseapp.com",
//     projectId: "joker-c5878",
//     storageBucket: "joker-c5878.appspot.com",
//     messagingSenderId: "108210998277",
//     appId: "1:108210998277:web:9eb21b8511fabce8bc206c",
//     measurementId: "G-NR5B7GQNL1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import messaging from '@react-native-firebase/messaging';

export default async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFcmToken();
    }
}
async function GetFcmToken() {
    try {

        let fcmToken = await messaging().getToken();
        console.log(fcmToken, "==firebase token==");
    } catch (error) {
        console.log(error, 'error');
    }
}
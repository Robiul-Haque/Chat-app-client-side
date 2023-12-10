// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDy-8k9ub3QBZxLOrL5wq0BaisR90AXXNw",
    authDomain: "chat-app-e3f52.firebaseapp.com",
    projectId: "chat-app-e3f52",
    storageBucket: "chat-app-e3f52.appspot.com",
    messagingSenderId: "211458253953",
    appId: "1:211458253953:web:8eefd00e9535ea13b39980"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
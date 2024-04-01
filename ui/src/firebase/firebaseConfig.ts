import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyBwu8n9zvqNkx6DeJkTJ2McjV7braCJmp4",
	authDomain: "wtf-truck.firebaseapp.com",
	projectId: "wtf-truck",
	storageBucket: "wtf-truck.appspot.com",
	messagingSenderId: "740528849850",
	appId: "1:740528849850:web:24e206d6c8a6f755ce9383",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default firebase;

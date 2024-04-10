
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
// Initialize Firebase with your project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1AC3ptMI60oGbYBeseroCTdnEDex7AQg",
  authDomain: "airaware-f22c0.firebaseapp.com",
  projectId: "airaware-f22c0",
  storageBucket: "airaware-f22c0.appspot.com",
  messagingSenderId: "580535713947",
  appId: "1:580535713947:web:010ec1671df4d20a1c863e",
  measurementId: "G-RQ1WWWJWKP"
};
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const collectionRef = collection(db, "data2");



function updatefiredata(data,city){
    var firedata = {
      "type": "Feature",
      "geometry": {
      "type": "Point",
      "coordinates": [data.data.city.geo[1],data.data.city.geo[0]]//data.location.lon, data.location.lat
        },
      "properties": {
      "id":i,
      "name": `${city}`, //data.location.name,
      "aqi":data.data.aqi ,
      "t": data.data.iaqi.t.v,
      "h": data.data.iaqi.h.v,
      }
    };
     const customDocId = city; // Replace with your desired custom ID
  
    const customDocRef = doc(collectionRef, customDocId);
    
    
    setDoc(customDocRef, firedata)
      .then(() => {
        console.log("Custom document added with ID: " + customDocId);
      })
      .catch((error) => {
        console.error("Error adding custom document: ", error);
      });
    
      const newData = {
      "properties.t": 0, // Update the "t" field
      "properties.h": 2, // Update the "h" field
      "properties.aqi": 3, // Update the "aqi" field
    };
  }
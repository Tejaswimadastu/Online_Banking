import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, Timestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB81prayBQo5XuTEVljA9K_lN8sCUEJTCE",
    authDomain: "online-banking-system-52ab3.firebaseapp.com",
    databaseURL: "https://online-banking-system-52ab3-default-rtdb.firebaseio.com",
    projectId: "online-banking-system-52ab3",
    storageBucket: "online-banking-system-52ab3.firebasestorage.app",
    messagingSenderId: "439422191857",
    appId: "1:439422191857:web:d2bf08992d74dfd4610150",
    measurementId: "G-CV9J6TP1VG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, query, where, getDocs, updateDoc, doc, Timestamp };
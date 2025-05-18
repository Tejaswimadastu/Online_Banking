import { db, collection, query, where, getDocs, addDoc, Timestamp } from './firebase-config.js';

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const enteredAccountNumber = document.getElementById("loginAccountNumber").value.trim();
    const enteredPin = document.getElementById("loginPin").value.trim();

    try {
        // Query Firestore for user
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("accountNumber", "==", enteredAccountNumber));
        const querySnapshot = await getDocs(q);

        let isMatch = false;
        let userData = null;

        if (!querySnapshot.empty) {
            userData = querySnapshot.docs[0].data();
            isMatch = enteredPin === userData.pin;
        }

        // Log login attempt
        try {
            const docRef = await addDoc(collection(db, "loginAttempts"), {
                accountNumber: enteredAccountNumber,
                success: isMatch,
                timestamp: Timestamp.now()
            });
            console.log("Login attempt logged with ID:", docRef.id);
        } catch (error) {
            console.error("Error logging login attempt:", error.message, error.code);
        }

        if (querySnapshot.empty) {
            showError("No account found. Please register first.");
            return;
        }

        if (!userData.pin) {
            showError("PIN not set. Please create a PIN first.");
            setTimeout(() => {
                window.location.href = "pin.html";
            }, 2000);
            return;
        }

        if (isMatch) {
            console.log("Login successful for account:", enteredAccountNumber);
            localStorage.setItem("currentAccount", enteredAccountNumber); // Store for session
            window.location.href = "transaction.html";
        } else {
            showError("Invalid account number or PIN.");
        }
    } catch (error) {
        console.error("Error during login:", error.message, error.code);
        showError("Login failed. Please try again.");
    }
});

function showError(message) {
    const errorEl = document.getElementById("error-message");
    errorEl.innerText = message;
    errorEl.style.display = "block";
}
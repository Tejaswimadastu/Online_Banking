// pin-creation.js
import { db, collection, query, where, getDocs, updateDoc, doc } from './firebase-config.js';

document.getElementById("pinForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const accountNumber = document.getElementById("accountNumber").value.trim();
    const pin = document.getElementById("pin").value;
    const confirmPin = document.getElementById("confirmPin").value;

    // Validate inputs
    if (!accountNumber || !pin || !confirmPin) {
        showError("All fields are required!");
        return;
    }

    // Validate if PINs match
    if (pin !== confirmPin) {
        showError("PINs do not match!");
        return;
    }

    // Validate if PIN is 4-6 digits
    if (!/^\d{4,6}$/.test(pin)) {
        showError("PIN must be 4-6 digits.");
        return;
    }

    // Show loading spinner
    document.getElementById("loadingSpinner").style.display = "block";

    try {
        // Check if account exists
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("accountNumber", "==", accountNumber));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            showError("Account not found. Please check your account number.");
            return;
        }

        // Update the user document with PIN
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "users", userDoc.id), {
            pin: pin,
            pinCreatedAt: new Date().toISOString()
        });

        // Store account number in localStorage for session management
        localStorage.setItem("currentAccount", accountNumber);

        // Redirect to login
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error creating PIN:", error.message, error.code);
        showError("Failed to create PIN. Please try again.");
    } finally {
        // Hide loading spinner
        document.getElementById("loadingSpinner").style.display = "none";
    }
});

function showError(message) {
    const errorEl = document.getElementById("error-message");
    errorEl.innerText = message;
    errorEl.style.display = "block";
}
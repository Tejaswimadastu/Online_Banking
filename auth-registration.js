// auth-registration.js
import { db, collection, addDoc, query, where, getDocs } from './firebase-config.js';

// Function to check if the user is already registered
async function isUserRegistered(email, phoneNumber) {
    try {
        const usersRef = collection(db, "users");
        const emailQuery = query(usersRef, where("email", "==", email));
        const phoneQuery = query(usersRef, where("phoneNumber", "==", phoneNumber));
        const [emailSnapshot, phoneSnapshot] = await Promise.all([
            getDocs(emailQuery),
            getDocs(phoneQuery)
        ]);
        return !emailSnapshot.empty || !phoneSnapshot.empty;
    } catch (error) {
        console.error("Error checking user registration:", error.message, error.code);
        return false;
    }
}

// Function to store user data in Firestore
async function storeUserData(userData) {
    try {
        const docRef = await addDoc(collection(db, "users"), userData);
        console.log("User data stored with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error storing user data:", error.message, error.code);
        throw error;
    }
}

// Function to handle form submission
document.getElementById("registrationForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const country = document.getElementById("country").value.trim();

    // Validate all fields
    if (!fullName || !email || !phoneNumber || !pincode || !city || !state || !country) {
        showError("All fields are required.");
        return;
    }

    // Validate email format
    if (!validateEmail(email)) {
        showError("Please enter a valid email address.");
        return;
    }

    // Validate phone number (must be 10 digits)
    if (!validatePhoneNumber(phoneNumber)) {
        showError("Please enter a valid 10-digit phone number.");
        return;
    }

    try {
        // Check if the user is already registered
        const isRegistered = await isUserRegistered(email, phoneNumber);
        if (isRegistered) {
            showError("You are already registered! Redirecting to login page...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
            return;
        }

        // Generate a random 10-digit account number
        const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

        // Prepare user data
        const userData = {
            fullName,
            email,
            phoneNumber,
            pincode,
            city,
            state,
            country,
            accountNumber,
            createdAt: new Date().toISOString(),
            balance: 0,
            transactions: []
        };

        // Store user data in Firestore
        await storeUserData(userData);

        // Show success message with account number
        alert(`Registration successful! Your Account Number is: ${accountNumber}`);

        // Redirect to PIN creation page
        window.location.href = "pin.html";
    } catch (error) {
        console.error("Registration error:", error.message, error.code);
        showError("Registration failed. Please try again.");
    }
});

// Function to handle "Forgot Account Number"
async function forgotAccountNumber() {
    const email = prompt("Please enter your registered email address:");
    if (!email) return;

    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                alert(`Your Account Number is: ${doc.data().accountNumber}`);
            });
        } else {
            alert("No account found with this email address.");
        }
    } catch (error) {
        console.error("Error retrieving account number:", error.message, error.code);
        alert("An error occurred. Please try again.");
    }
}

// Function to handle "Forgot PIN"
async function forgotPin() {
    const accountNumber = prompt("Please enter your Account Number:");
    if (!accountNumber) return;

    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("accountNumber", "==", accountNumber));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            alert("Please contact the bank to reset your PIN.");
        } else {
            alert("No account found with this Account Number.");
        }
    } catch (error) {
        console.error("Error retrieving account:", error.message, error.code);
        alert("An error occurred. Please try again.");
    }
}

// Helper functions
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
}

function showError(message) {
    const errorEl = document.getElementById("error-message");
    errorEl.innerText = message;
    errorEl.style.display = "block";
}

// Assign functions to window for HTML onclick events
window.forgotAccountNumber = forgotAccountNumber;
window.forgotPin = forgotPin;
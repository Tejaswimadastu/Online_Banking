// auth-transaction.js
import { db, collection, addDoc, Timestamp } from './firebase-config.js';

// Hook into performTransaction
window.performTransaction = async function() {
    const type = document.getElementById("transactionType").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const recipientAccount = document.getElementById("recipientAccount").value || null;
    const currentUser = localStorage.getItem("currentAccount") || "unknown";

    let status = "success";
    let reason = "";

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        status = "failed";
        reason = "Please enter a valid amount.";
    }

    // Type-specific validation
    if (status === "success") {
        if (type === "withdraw") {
            const currentBalance = parseFloat(localStorage.getItem(`balance_${currentUser}`)) || 0;
            if (amount > currentBalance) {
                status = "failed";
                reason = "Insufficient balance.";
            }
        } else if (type === "transfer") {
            if (!recipientAccount) {
                status = "failed";
                reason = "Recipient account number is required.";
            } else if (!REGISTERED_ACCOUNTS.includes(recipientAccount)) {
                status = "failed";
                reason = "Recipient account not found.";
            } else {
                const currentBalance = parseFloat(localStorage.getItem(`balance_${currentUser}`)) || 0;
                if (amount > currentBalance) {
                    status = "failed";
                    reason = "Insufficient balance for transfer.";
                }
            }
        }
    }

    // Log transaction attempt to Firestore
    try {
        const docRef = await addDoc(collection(db, "transactionLogs"), {
            user: currentUser,
            type,
            amount,
            recipient: recipientAccount,
            status,
            reason,
            timestamp: Timestamp.now()
        });
        console.log("Transaction log added with ID:", docRef.id);
    } catch (err) {
        console.error("Error logging transaction:", err.message, err.code);
        status = "failed";
        reason = reason || "Failed to log transaction.";
    }

    // Execute transaction if successful
    if (status === "success") {
        if (typeof window._originalPerformTransaction === "function") {
            window._originalPerformTransaction();
        } else {
            console.error("Original performTransaction function not found.");
            alert("Transaction processing error. Please try again.");
        }
    } else {
        alert(`Transaction failed: ${reason}`);
    }
};
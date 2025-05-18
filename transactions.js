// Reuse common fetchAPI function
async function fetchAPI(url, method, data) {
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // Check if response is ok, if not, throw an error
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch API Error:", error);
      return { success: false, message: error.message };
    }
  }
  
  // Only run if on transaction.html
  if (window.location.pathname.includes("transaction.html")) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "login.html";
    }
  
    // Display user info
    document.getElementById("accountNumber").textContent = user.account_number;
    document.getElementById("balance").textContent = user.balance || 0;
  
    // Handle transaction form submission
    document.getElementById("transactionForm").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const type = e.target.transactionType.value;
      const amount = parseFloat(e.target.amount.value);
      const recipient = e.target.recipient?.value || null;
  
      if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }
  
      const data = {
        userId: user.id,
        type,
        amount,
        recipient_account: recipient,
      };
  
      const result = await fetchAPI("/api/transaction", "POST", data);
  
      if (result.success) {
        alert("Transaction successful!");
        window.location.reload(); // reload to update balance and history
      } else {
        alert("Transaction failed: " + result.message);
      }
    });
  
    // Fetch and display transaction history
    async function loadTransactions() {
      const loadingText = document.getElementById("loadingTransactions");
      loadingText.textContent = "Loading transactions...";
  
      const result = await fetchAPI("/api/transactions", "POST", { userId: user.id });
  
      loadingText.textContent = ""; // Clear loading text once transactions are loaded
  
      if (result.success) {
        const table = document.getElementById("transactionHistory");
        if (result.transactions.length === 0) {
          const row = table.insertRow();
          row.innerHTML = `<td colspan="4">No transactions found.</td>`;
        } else {
          result.transactions.forEach(tx => {
            const row = table.insertRow();
            row.innerHTML = `
              <td>${tx.type}</td>
              <td>${tx.amount}</td>
              <td>${tx.recipient_account || "-"}</td>
              <td>${new Date(tx.timestamp).toLocaleString()}</td>
            `;
          });
        }
      } else {
        console.error("Could not load transactions:", result.message);
        alert("Failed to load transactions: " + result.message);
      }
    }
  
    loadTransactions();
  
    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }
  
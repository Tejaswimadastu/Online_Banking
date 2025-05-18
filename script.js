//script.js
// Common API Request Function
async function fetchAPI(url, method, data) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Signup Page
if (window.location.pathname.includes("signup.html")) {
  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
    };
    const result = await fetchAPI("/api/signup", "POST", data);
    if (result.success) {
      alert(`Account created! Your account number: ${result.accountNumber}`);
      window.location.href = "login.html";
    } else {
      alert("Signup failed: " + result.message);
    }
  });
}

// Login Page
if (window.location.pathname.includes("login.html")) {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const result = await fetchAPI("/api/login", "POST", data);
    if (result.success) {
      localStorage.setItem("user", JSON.stringify(result.user));
      window.location.href = "transaction.html";
    } else {
      alert("Login failed: " + result.message);
    }
  });
}

// Transaction Page
if (window.location.pathname.includes("transaction.html")) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) window.location.href = "login.html";

  // Display user info
  document.getElementById("accountNumber").textContent = user.account_number;
  document.getElementById("balance").textContent = user.balance || 0;

  // Handle transactions
  document.getElementById("transactionForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const type = e.target.transactionType.value;
    const amount = parseFloat(e.target.amount.value);
    const result = await fetchAPI("/api/transaction", "POST", {
      userId: user.id,
      amount,
      type,
    });
    if (result.success) {
      alert("Transaction successful!");
      window.location.reload();
    } else {
      alert("Transaction failed: " + result.message);
    }
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}

// PIN Page
if (window.location.pathname.includes("pin.html")) {
  document.getElementById("pinForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const accountNumber = document.getElementById("accountNumber").value;
    const pin = document.getElementById("pin").value;
    const confirmPin = document.getElementById("confirmPin").value;
    const errorEl = document.getElementById("error-message");

    // Reset error message
    errorEl.style.display = "none";
    errorEl.textContent = "";

    if (pin !== confirmPin) {
      errorEl.textContent = "PINs do not match!";
      errorEl.style.display = "block";
      return;
    }

    if (!/^\d{4,6}$/.test(pin)) {
      errorEl.textContent = "PIN must be 4-6 digits.";
      errorEl.style.display = "block";
      return;
    }

    const result = await fetchAPI("/api/set-pin", "POST", {
      accountNumber,
      pin,
    });

    if (result.success) {
      alert("PIN set successfully!");
      window.location.href = "login.html";
    } else {
      errorEl.textContent = result.message || "Failed to set PIN.";
      errorEl.style.display = "block";
    }
  });
}

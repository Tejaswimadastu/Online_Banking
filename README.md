# 🏦 Online Banking System

## Overview

The Online Banking System is a web-based banking application developed using HTML, CSS, JavaScript, and Firebase. The system enables users to register, log in, manage their accounts, perform transactions, and track financial activities through a secure and user-friendly interface.

This project simulates core banking functionalities and demonstrates modern web development concepts integrated with cloud-based authentication and database services.

---

## Features

### User Authentication

* User Registration
* Secure Login
* User Session Management
* Password Protection

### Account Management

* Create and manage bank accounts
* View account details
* Check account balances
* Update profile information

### Banking Transactions

* Deposit money
* Withdraw funds
* Transfer money between accounts
* Transaction history tracking

### Dashboard

* Account summary
* Current balance display
* Recent transactions
* Banking activity overview

### Secure Backend Integration

* Firebase Authentication
* Firebase Realtime Database / Firestore
* Secure user data management

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend & Database

* Firebase Authentication
* Firebase Realtime Database / Firestore

### Deployment

* GitHub Pages

---

## Project Structure

```text
Online_Banking/
│
├── records/
├── app.js
├── db.js
├── firebase-config.js
│
├── Authentication
│   ├── login.html
│   ├── register.html
│   ├── auth.js
│   ├── auth-login.js
│   └── auth-registration.js
│
├── Banking Modules
│   ├── dashboard.js
│   ├── transactions.html
│   ├── transactions.js
│   ├── deposit.html
│   ├── withdraw.html
│   ├── transfer.html
│   └── update.html
│
├── Assets
│   ├── styles.css
│   ├── script.js
│   └── images/
│
└── README.md
```

---

## System Workflow

```text
User Registration
        │
        ▼
User Login
        │
        ▼
Dashboard Access
        │
 ┌──────┼──────┐
 │      │      │
 ▼      ▼      ▼
Deposit Withdraw Transfer
 │       │       │
 └───────┴───────┘
         │
         ▼
Transaction History
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Tejaswimadastu/Online_Banking.git
cd Online_Banking
```

---

## Firebase Configuration

Create a Firebase project and configure:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Add these credentials inside:

```text
firebase-config.js
```

---

## Running the Project

### Option 1: Live Server

Open the project in VS Code and run:

```text
Live Server
```

### Option 2: Direct Browser Access

Open:

```text
index.html
```

in your browser.

---

## Core Functionalities

### Registration

* Create new user accounts
* Store user credentials securely

### Login

* Authenticate users using Firebase

### Deposit

* Add money to account balance

### Withdrawal

* Deduct funds from account

### Fund Transfer

* Transfer money between users

### Transaction History

* Maintain transaction records
* Display recent activity

### Profile Management

* Update user information

---

## Security Features

* Firebase Authentication
* User Session Management
* Secure Data Storage
* Input Validation
* Protected User Access

---

## Applications

* Online Banking Simulation
* Financial Management Systems
* Banking Software Learning
* FinTech Projects
* Educational Demonstrations

---

## Future Enhancements

* Two-Factor Authentication (2FA)
* Email Notifications
* Loan Management Module
* Credit/Debit Card Integration
* Mobile Banking Application
* QR Code Payments
* Bill Payment Services
* Admin Dashboard

---

## Learning Outcomes

This project demonstrates:

* Frontend Web Development
* Firebase Integration
* Authentication Systems
* Database Management
* Financial Transaction Processing
* User Interface Design
* JavaScript Application Development

---

## Author

**Tejaswi Madastu**

GitHub: https://github.com/Tejaswimadastu

---

## License

This project is developed for educational and learning purposes.

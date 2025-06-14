# 🚀 Mini SMM Panel Backend (Node.js + Express)

This is a **Mini SMM (Social Media Marketing) Panel Backend** project built using **Node.js**, **Express**, and the **smmprovider.co API**. It allows you to interact with the SMM provider, place social media service orders, check your balance, and simulate wallet top-ups without a frontend.

---

## ✨ Features

- 🔍 Fetch available social media marketing services
- 💰 View your real-time SMM provider account balance
- 🛒 Place orders (e.g., Instagram followers, likes, YouTube views, etc.)
- 💸 Simulate user wallet top-ups
- 📁 Save orders and wallet records in JSON files for reference
- ⚙️ Built for testing and educational use

---

## 🧰 Tech Stack

- **Node.js**
- **Express**
- **Axios**
- **Dotenv** for API key security
- **File System (fs)** for local JSON data storage

---

## 📦 Setup Instructions

### 1. Clone the repository

``bash
git clone https://github.com/Praiseogooluwa/mini-smm-panel.git
cd mini-smm-panel

# 2. Install dependencies
npm install

# 3. Create a .env file
### In the root folder, add your API credentials from https://smmprovider.co:
SMM_API_KEY=your_api_key_here
SMM_API_URL=https://smmprovider.co/api/v2

# 4. Start the server
node index.js

🔗 API Endpoints
Endpoint	Method	Description

/	          -  GET	     -     Home route (test if server is live)

/services	  -  GET	     -     Fetch available SMM services

/balance	  -  GET	     -     Check your SMM panel balance

/order	    -  POST	     -     Place an SMM order

/add-funds	-  POST	     -     Simulate user funding their wallet

🛒 Order Format (POST /order)

---

{
  
  "service": 1234,
  
  "link": "https://instagram.com/your-profile",
  
  "quantity": 100

}

---

💸 Add Funds Format (POST /add-funds)


{
 
  "userId": "user123",
  
  "amount": 500

}

---

📁 Folder Structure

mini-smm-panel/

├── index.js

├── smmApi.js

├── .env

├── data/

│   └── wallets.json

├── orders/

│   └── orders.json

├── .gitignore

└── README.md

🛡️ Security & Notes
- Use Postman or CURL to test the endpoints manually.
- This is for educational/testing purposes. For production, use a proper database and frontend.

📢 Author
Built with ❤️ by Isaiah Praise Ogooluwa Bakare— feel free to connect with me on LinkedIn or GitHub.

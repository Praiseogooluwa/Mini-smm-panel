// index.js
const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // 💡 Load .env variables
const { getServices, getBalance, createOrder } = require("./smmApi");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🏠 Base route
app.get("/", (req, res) => {
  res.send("🔥 Mini SMM Panel Backend is Running!");
});

// 📦 Get list of services
app.get("/services", async (req, res) => {
  try {
    const services = await getServices();
    if (services?.error) {
      return res.status(500).json({ error: services.error });
    }
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Internal server error while fetching services" });
  }
});

// 💰 Check current balance
app.get("/balance", async (req, res) => {
  try {
    const balance = await getBalance();
    if (balance?.error) {
      return res.status(500).json({ error: balance.error });
    }
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: "Internal server error while fetching balance" });
  }
});

// 🛒 Place an order
app.post("/order", async (req, res) => {
  const { service, link, quantity } = req.body;

  if (!service || !link || !quantity) {
    return res.status(400).json({ error: "Missing required fields: service, link, quantity" });
  }

  try {
    const orderResult = await createOrder({ service, link, quantity });

    if (orderResult?.error) {
      return res.status(500).json({ error: orderResult.error });
    }

    // 💾 Save order to file
    const ordersDir = path.join(__dirname, "orders");
    const ordersFilePath = path.join(ordersDir, "orders.json");

    // Ensure orders folder exists
    if (!fs.existsSync(ordersDir)) {
      fs.mkdirSync(ordersDir);
    }

    const existingOrders = fs.existsSync(ordersFilePath)
      ? JSON.parse(fs.readFileSync(ordersFilePath))
      : [];

    const newOrder = {
      ...orderResult,
      service,
      link,
      quantity,
      date: new Date().toISOString(),
    };

    existingOrders.push(newOrder);

    fs.writeFileSync(ordersFilePath, JSON.stringify(existingOrders, null, 2));

    res.json(orderResult);
  } catch (error) {
    console.error("❌ Error handling order:", error.message);
    res.status(500).json({ error: "Internal server error while placing order" });
  }
});

// 💸 Add funds (simulate wallet funding)
app.post("/add-funds", (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ error: "Missing userId or amount" });
  }

  const dataDir = path.join(__dirname, "data");
  const walletsFilePath = path.join(dataDir, "wallets.json");

  // Ensure data folder exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const wallets = fs.existsSync(walletsFilePath)
    ? JSON.parse(fs.readFileSync(walletsFilePath))
    : [];

  const existing = wallets.find(w => w.userId === userId);

  if (existing) {
    existing.balance += amount;
  } else {
    wallets.push({ userId, balance: amount });
  }

  fs.writeFileSync(walletsFilePath, JSON.stringify(wallets, null, 2));

  res.json({ message: `Added ₦${amount} to ${userId}`, wallets });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});

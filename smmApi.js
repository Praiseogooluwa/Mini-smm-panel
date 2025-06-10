// smmApi.js
const axios = require("axios");
require("dotenv").config();

// ✅ Ensure your .env file has:
// SMM_API_KEY=88fb783c467552aa7ddf0cd1b6594d31
// SMM_API_URL=https://smmprovider.co/api/v2

const API_KEY = process.env.SMM_API_KEY;
const API_URL = process.env.SMM_API_URL;

// 🟢 Fetch list of all available SMM services
async function getServices() {
  try {
    const response = await axios.post(API_URL, {
      key: API_KEY,
      action: "services",
    });

    return response.data;
  } catch (err) {
    console.error("❌ Error fetching services:", err.response?.data || err.message);
    return { error: "Failed to fetch services" };
  }
}

// 🟢 Check account balance from the SMM provider
async function getBalance() {
  try {
    const response = await axios.post(API_URL, {
      key: API_KEY,
      action: "balance",
    });

    return response.data;
  } catch (err) {
    console.error("❌ Error fetching balance:", err.response?.data || err.message);
    return { error: "Failed to fetch balance" };
  }
}

// 🟢 Place a new service order
async function createOrder({ service, link, quantity }) {
  try {
    const response = await axios.post(API_URL, {
      key: API_KEY,
      action: "add",
      service,
      link,
      quantity,
    });

    return response.data;
  } catch (err) {
    console.error("❌ Error placing order:", err.response?.data || err.message);
    return { error: "Failed to place order" };
  }
}

// 📤 Export all helper functions
module.exports = {
  getServices,
  getBalance,
  createOrder,
};

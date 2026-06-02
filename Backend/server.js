require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { HoldingsModel } = require("./model/HoldingsModel");
const { OrdersModel } = require("./model/OrdersModel");
const holdingsSeed = require("./seed/holdingsSeed");

const app = express();

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching holdings" });
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ createdAt: -1 });
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;
  try {
    const newOrder = await OrdersModel.create({ name, qty, price, mode });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Error creating order" });
  }
});

async function seedHoldings() {
  const count = await HoldingsModel.countDocuments();
  if (count === 0) {
    await HoldingsModel.insertMany(holdingsSeed);
    console.log("Holdings seeded");
    return;
  }

  const sample = await HoldingsModel.findOne().lean();
  if (!sample?.name) {
    await HoldingsModel.deleteMany({});
    await HoldingsModel.insertMany(holdingsSeed);
    console.log("Holdings re-seeded (replaced invalid documents)");
  }
}

mongoose
  .connect(url)
  .then(async () => {
    console.log("MONGODB CONNECTED SUCCESSFULLY");
    await seedHoldings();
    app.listen(PORT, () => {
      console.log(`App Started on Port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("MONGODB CONNECTION FAILED");
  });

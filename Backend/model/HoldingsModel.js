const mongoose = require("mongoose");
const { HoldingsSchema } = require("../schemes/HoldingsSchema");

const HoldingsModel = mongoose.model("holding", HoldingsSchema);

module.exports = { HoldingsModel };

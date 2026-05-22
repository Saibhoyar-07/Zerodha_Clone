const {model} = require("mongoose");

const {HoldingsSchema} = require('../schemes/HoldingsSchema');

const HoldingsModel= new model("holding", HoldingsSchema);

module.exports={HoldingsModel};
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 8000;
const url = process.env.MONGO_URL;

mongoose.connect(url)
.then(() => {
    console.log("MONGODB CONNECTED SUCCESSFULLY");

    app.listen(PORT, () => {
        console.log(`App Started on Port ${PORT}`);
    });
})
.catch(() => {
    console.log("MONGODB CONNECTION FAILED");
});
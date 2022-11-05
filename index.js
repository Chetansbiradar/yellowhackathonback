//1. Pull pending payments from Splitwise and load it on a Web UI (or mobile UI if youfeel adventurous)
//2. For each pending payment associate a UPI ID
//3. Generate a QR code for each pending payment with UPI ID which will take the user
//to a UPI app and auto populate the following:
//  a. Contact to be paid
//  b. Amount to be paid
//4. Create a login mechanism for users and user management
//5. Given an option to mark payments as completed
//6. Allow users to save frequently used contacts and their UPI IDs

require("dotenv").config();
// const Splitwise = require("splitwise");
const express = require("express");
const app = express();

const cors = require("cors");
const expensesRouter = require("./routes/Expense");

var corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

app.use("/expenses", expensesRouter);

const mongoose = require("mongoose");
const MONGO_URI = process.env.DATABASE_URL;

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to DB");
  }
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8094;
connectDb();
console.log("CONSOLE : SERVER.JS");

// 상대 경로로 들어갈수있도록 해줌
// MiddleWare to receive the data from client
app.use(express.json());
app.use(errorHandler);
app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

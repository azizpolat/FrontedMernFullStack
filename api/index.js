const express = require("express");
const cors = require("cors");
const bodyPars = require("body-parser");
const dotenv = require("dotenv");
const database = require("./database.js");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyPars.json({ limit: "30mb", extended: true }));
app.use(bodyPars.urlencoded({ limit: "30mb", extended: true }));
app.use("/", authRouter);
app.use("/", postRouter);

const PORT = 5000;

database();

app.listen(PORT, () => {
  console.log("Server Dinliyor", PORT);
});

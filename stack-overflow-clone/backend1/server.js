const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;
const path = require("path");
const db = require("./db");
const router = require("./routers");

// db connection
db.connect();

// cors
app.use(cors());

//middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

//headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// static resources
app.use("/upload", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

// api

app.use("/api", router);

// catch-all route (must be last)
app.use((req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
  } catch (e) {
    res.send("Oops! error occured");
  }
});

// server listen
app.listen(PORT, () => {
  console.log("StackOverflow clone is running on PORT NO- ${PORT}");
});

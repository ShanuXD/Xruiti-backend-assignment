const express = require("express");
const { urlencoded, json } = require("express");
const connectToDatabase = require("./db/connectDatabase");
const allRoutes = require("./routes/index")

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

const LocalDB = "mongodb://localhost:27017/UsersAPI";
connectToDatabase(LocalDB);

app.use("/", allRoutes)

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(8000, () => console.log("server is running!"));

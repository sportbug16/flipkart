const express = require("express");
const app = express();
const connectDb = require("./config/dbconnection");
const errorhandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const cors = require('cors');
const {json} = require("express");
const port = 5000;

connectDb();
app.use(cors());
app.use(json());
app.use(express.json());
app.use("/kp/users", require("./routes/userroutes"));
app.use("/kp/chats", require("./routes/chatRoutes"));
// app.use(errorhandler);

app.listen(port, () => {
  console.log("Server running on port " + port);
});

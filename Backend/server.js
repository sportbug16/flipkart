const express = require("express");
const app = express();
const connectDb = require("./config/dbconnection");
const errorhandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const cors = require('cors');
const port = 5000;
await connectDb();
app.use(cors());

app.use(express.json());
app.use("/kp/users", require("./routes/userroutes"));
app.use("/kp/chat", require("./routes/chatRoutes"));
app.use(errorhandler);

app.listen(port, () => {
  console.log("Server running on port " + port);
});

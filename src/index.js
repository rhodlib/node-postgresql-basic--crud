const express = require("express");
const routes = require("./routes/index")
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(routes);

//server
app.listen(3000);
console.log("Server on port 3000");
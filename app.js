const express = require("express");
const app = express();

// const utils = require('./utils'); //此次启动使用

// passport 初始化 
const passport = require("passport");
app.use(passport.initialize());
require("./config/passport")(passport);

const cors = require("cors");

app.use(cors()); 

// express.json()解析数据
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// import api
const users = require("./routes/api/users");
const graphs = require("./routes/api/graphs")
//use routes    
app.use("/api/admin", users);
app.use("/api/graphs", graphs);

module.exports = app;
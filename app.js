const express = require("express");
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({limit: '50mb'}))
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
const upload = require("./routes/api/upload")
//use routes    
app.use("/api/admin", users);
app.use("/api/graphs", graphs);
app.use("/api/upload", upload);

module.exports = app;
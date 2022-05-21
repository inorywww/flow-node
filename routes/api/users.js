// @login && register && auth

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");
const { randomCode, sendCode } = require("../../utils/getMessage");

const auths = [] // 存放注册时的验证信息
// login api
// $route POST api/users/login
// @desc 返回token jwt passport
router.post("/login", (req, res) => {
    const account = req.body.account;
    const password = req.body.password;
    
    // 查询数据库
    User.findOne({ account }).then(user => {
        if (!user) {
            return res.status(400).json("用户不存在！");
        } else {
            if (user.password == password) {
                const rule = {
                    id: user.id,
                    account: user.account
                };
                jwt.sign(rule, keys.secretOrKey, { expiresIn: 36000 }, (err, token) => {
                    if (err) {
                        console.log(err);
                    };
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res.status(400).json("密码错误！")
            }
        }
    })
})

// register api
// $route POST api/users/register
// @desc 是否登录成功
router.post("/register", (req, res) => {
    //查询数据库是否拥有该账户
    User.findOne({account: req.body.account}).then((user) => {
        if (user) {
            return res.status(400).json("该手机号已被注册");
        } else {
            new User({
                account: req.body.account,
                password: req.body.password
            }).save().then(graph => res.json({graph}))
        }
    })
})

// authToken api 权限管理 验证token
// $route GET api/users/authToken 
// @desc return authToken user
// access Private
router.get("/authToken", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        account: req.user.account,
    });
})

// 生成验证码
router.get("/getCode", (req,res)=>{
    let code = randomCode(6);//生成6位数字随机验证码
    sendCode(Number(req.query.account), code, function(success) {
        if(success){
            res.json({msg: "短信验证码已发送"})
            auths.push({
                account: req.query.account,
                code
            })
        }else{
            res.status(400).json("发送失败")
        }
    })
})

// 核对验证码是否正确
router.post("/checkCode", (req, res) => {
    const index = auths.findIndex(item => item.account == req.body.account)
    console.log(auths, index)
    if (index !== -1) {
        if (req.body.code == auths[index].code) {
            res.json({msg: "验证成功"})
            auths.splice(index, 1)
        } else {
            res.status(400).json("验证码错误")
        }
    } else {
        res.status(400).json("网络错误")
    }
    
})

// 获取用户信息
router.get("/getUserInfo/:account", (req,res)=>{
    User.findOne({account: req.params.account}).then((user) => {
        if (user) {
            return res.json(user);
        } else {
            return res.status(400).json({msg: "暂无此人！"})
        }
    })
})

// 编辑用户信息
router.post("/editUserInfo/:account", (req, res)=>{
    const fields = {};
    if (req.body.account) fields.account = req.body.account;
    if (req.body.password) fields.password = req.body.password;
    if (req.body.nickname) fields.nickname = req.body.nickname;
    if (req.body.avatar) fields.avatar = req.body.avatar;
    Graph.findOneAndUpdate(
        { id: req.params.account },
        { $set: fields },
        { new: true })
        .then(g => res.json(g))
})



module.exports = router;
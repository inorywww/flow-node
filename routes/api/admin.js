// @login && register && auth

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");

// login api
// $route POST api/users/login
// @desc 返回token jwt passport
router.post("/login", (req, res) => {
    const account = req.body.account;
    const password = req.body.password;
    
    // 查询数据库
    User.findOne({ account })
        .then(user => {
            if (!user) {
                return res.status(400).json("用户不存在！");
            } else {
                const pwdMatchFlag = bcrypt.compareSync(user.password, password);
                if (pwdMatchFlag) {
                    const rule = {
                        id: user.id,
                        account: user.account
                    };
                    jwt.sign(rule, keys.secretOrKey, {
                        expiresIn: 3600
                    }, (err, token) => {
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
    //查询数据库是否拥有该邮箱
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                return res.status(400).json("邮箱已被注册");
            } else {
                const newUser = new User({
                    account: req.body.account,
                    email: req.body.email,
                    password: req.body.password
                });
                newUser.save()
                    .then(user =>  res.json(user))
                    .catch(err => res.json(err));
                // 加密密码
                // bcrypt.genSalt(10, function (err, salt) {
                //     bcrypt.hash(newUser.password, salt, (err, hash) => {
                //         if (err) throw err;
                //         newUser.password = hash;
                //         newUser.save()
                //             .then(user => res.json(user))
                //             .catch(err => console.log(err))
                //     })
                // })
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
        email: req.user.email
    });
})

module.exports = router;
// @login && register && auth
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Graph = require("../../models/Graph");
const { uuid } = require('uuidv4')

// addGraphs api
// $route Get api/graphs/add
// @desc 添加graph
// @access Public
router.get("/add", async (req, res) => {
    const graphFields = {};
    graphFields.id = uuid();
    if (req.body.name) graphFields.name = req.body.name;
    if (req.body.info) graphFields.info = req.body.info;
    new Graph(graphFields).save().then(graph => {
        res.json({
            graph
        })
    })
})

// getGraphss api
// $route GET api/graphs
// @desc 获取所有graph
// @access Public
router.get("/", (req, res) => {
    Graph.find().then(g => {
        if (!g) {
            return res.status(404).json("没有任何内容");
        }
        res.json(g)
    }).catch(err => res.status(404).json(err))
})

// getOneGraph api
// $route GET api/graph/:id
// @desc 获取具体某个graph
// @access Public
router.get("/:id", (req, res) => {
    Graph.find({ id: req.params.id })
        .then(g => {
            if (!g) {
                return res.status(200).json("没有任何内容");
            }
            res.json(g)
        }).catch(err => res.status(404).json(err))
})

// editOneGraph api
// $route GET api/graph/edit/:id
// @desc 编辑graph
// @access Private
// router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
router.post("/edit/:id", (req, res) => {
    const fields = {};
    fields.recent_time = Date.now()
    if (req.body.name) fields.name = req.body.name;
    if (req.body.info) fields.info = req.body.info;
    Graph.findOneAndUpdate(
        { id: req.params.id },
        { $set: fields },
        { new: true })
        .then(g => res.json(g))
})

// deleteGraphs api
// $route GET api/graph/delete/:id
// @desc 删除graph
// @access Private
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Message.findOneAndRemove({ id: req.params.id })
        .then(g => {
            res.json(g);
        }).catch(err => res.status(404).json("删除失败"))
})

module.exports = router;
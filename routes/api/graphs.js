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
router.post("/add", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const graphFields = {};
    graphFields.id = uuid();
    if (req.body.name) graphFields.name = req.body.name;
    if (req.body.info) graphFields.info = req.body.info;
    if (req.body.types) graphFields.types = req.body.types;
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
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const type = req.query.type // 类型 0||null: 全部 1: 最近修改 2: 回收站
    Graph.find().then(g => {
        if (!g) {
            return res.status(404).json("没有任何内容");
        }
        let list = []
        if (type == 0 || type == 1) {
            list = g.filter(item => !item.is_del)
        }
        if (type == 1) {
            res.json(list.sort(compare("recent_time")))
        } else if (type == 2) {
            res.json(g.filter(item => item.is_del))
        } else {
            res.json(list)
        }
    }).catch(err => res.status(404).json(err))
})
function compare (p) { //这是比较函数
    return function (m, n) {
        var a = m[p]
        var b = n[p]
        return b - a //升序
    }
}
// getOneGraph api
// $route GET api/graph/:id
// @desc 获取具体某个graph
// @access Public
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Graph.find({ id: req.params.id }).then(g => {
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
router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    const fields = {};
    fields.recent_time = Date.now()
    if (req.body.name) fields.name = req.body.name;
    if (req.body.info) fields.info = req.body.info;
    if (req.body.img) fields.img = req.body.img;
    if (req.body.types) fields.types = req.body.types;
    fields.is_del = req.body.is_del;
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
// router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
router.get("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.query.is_del == 1) {
        Graph.findOneAndRemove({ id: req.params.id }).then(g => res.json(g)).catch(err => res.status(404).json("删除失败"))
    } else {
        const fields = {};
        fields.is_del = 1
        Graph.findOneAndUpdate(
            { id: req.params.id },
            { $set: fields },
            { new: true }).then(g => res.json(g))
    }
    
})

router.get("/clone/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Graph.find({ id: req.params.id }).then(g => {
        if (!g) {
            return res.status(200).json("没有任何内容");
        }
        const graphFields = {};
        if (req.query.name) {
            graphFields.name = req.query.name
        } else {
            graphFields.name = g[0].name
        }
        graphFields.info = g[0].info
        graphFields.img = g[0].img
        graphFields.types = g[0].types
        graphFields.id = uuid();
        new Graph(graphFields).save().then(graph => {
            res.json({
                graph
            })
        })
    }).catch(err => res.status(404).json(err))
})

// deleteGraphs api
// $route GET api/graph/delete
// @desc 删除graph
// @access Private
router.get("/delete", (req, res) => {
    Graph.remove().then(g => {
        res.json(g);
    }).catch(err => res.status(404).json("删除失败"))
})

module.exports = router;
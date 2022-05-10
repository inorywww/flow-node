const express = require("express")
const router = express.Router();
const Article = require("../../models/Article");
const Say = require("../../models/Say");
const Message = require("../../models/Message");
const Tag = require("../../models/Tag");

// getAllInfo api
// $route GET api/home
// @desc 获取所有数据库信息
// @access Private

router.get('/', async (req, res) => {
    homeInfo = await getInfo();
    res.json(homeInfo)
});

async function getInfo(){
    let allArticle = [];
    await Article.find().then(res => {
        allArticle = res;
    });

    let allSay = [];
    await Say.find().then(res => {
        allSay = res;
    });
    
    let allMessage = [];
    await Message.find().then(res => {
        allMessage = res;
    });
    
    let allTag = [];
    await Tag.find().then(res => {
        allTag = res;
    });
    const articleInfo = {
        name:'articleInfo',
        num: allArticle.length,//数量
        recent:allArticle.slice(-5),
    }
    const sayInfo = {
        name:'sayInfo',
        num: allSay.length,//数量
        recent:allSay.slice(-3),
    }
    const messageInfo = {
        name:'messageInfo',
        num: allMessage.length,//数量
        recent:allMessage.slice(-3),
    }
    const tagInfo = {
        name:'tagInfo',
        num: allTag.length,//数量
        recent:allTag.slice(-3),
    }
    
    return {
        articleInfo,
        sayInfo,
        messageInfo,
        tagInfo}
}

module.exports = router;
const Tag = require("./models/Tag");
const Article = require("./models/Article");

// 查找articles中的所有tag
exports.getTags = async function(){
    let allArticles = []; // 存放所有文章
    let allTags = []; // 存放数据库所有tag
    let allTagsTemp = []; // 存放文章中所有tag
    await Article.find().then(res => allArticles = res);
    await Tag.find().then(res => allTags = res);
    let tagID = 0;

    // 先找到文章中所有包含的tag
    allArticles.forEach(item => {
        item.tags.forEach(tag => {
            const index = allTagsTemp.findIndex(t => t.tagName && t.tagName === tag)
            if(index >= 0){
                allTagsTemp[index].totalNum += 1;
            }
            else{
                allTagsTemp.push({
                    tagName:tag,
                    totalNum:1,
                    tagID
                });
            tagID += 1;
            }
        });
    });

    // 判断数据库中所有tag有没有没被使用的 有的话就设置为0 因为可能编辑的时候删除了tag
    allTags.forEach(item => {
        const index = allTagsTemp.findIndex(t => t.tagName && t.tagName === item.tagName);
        if(index < 0){
            Tag.findOneAndUpdate(
                {tagName:item.tagName},
                {$set:{"totalNum": 0}},
                {new:true}).then(res => res)
        }
    });
    // 判断当前tag是否存在，不存在新建个tag 存在更新数量，因为可能添加的时候添加了tag
    allTagsTemp.forEach(item => {
        const index = allTags.findIndex(t => t.tagName && t.tagName === item.tagName);
        if(index < 0){
            new Tag(item).save();
        }
        else{
            Tag.findOneAndUpdate(
                {tagName:item.tagName},
                {$set:{"totalNum": item.totalNum}},
                {new:true}).then(res => res)
        }
    })
}

//对对象数组排序
exports.compare = function (property){
    return function(obj1,obj2){
        const value1 = obj1[property];
        const value2 = obj2[property];
        return value2 - value1;     // 升序
    }
}
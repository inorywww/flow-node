module.exports = {
    mongoURI : "mongodb://localhost:27017/flow",
    // mongoURI : "mongodb+srv://inoryww:hentai233@cluster0.dm01f.mongodb.net/testDB?retryWrites=true&w=majority",
    secretOrKey:"secret",
    fileDir:"public/files",
    // 存放前端上传到后端的图片位置，如果部署到服务器请更改为自己的图床位置
    imgDir:"public/articles/cover",
    // imgDir:"/my/images/cover",
}
const express = require("express")
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const imgDir = require("../../config/keys").imgDir; //图床位置
const mdDir = require("../../config/keys").mdDir; //md文件位置

let upload = multer({
    storage: multer.diskStorage({
        //设置文件存储位置
        destination: function (req, file, cb) {
            let dir = '';
            //判断文件类型
            if (file.originalname.split('.').pop() === 'md') {
                dir = mdDir;
            } else {
                dir = imgDir;
            }
            //判断目录是否存在，没有则创建
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }
            //dir就是上传服务器成功的图片的存放的目录
            cb(null, dir);
        },
        //设置文件名称并上传文件
        filename: function (req, file, cb) {
            //fileName就是上传文件的文件名
            cb(null, file.originalname);
        }
    })

});

router.post('/', upload.single('file'), async (req, res) => {
    res.json({
        file: req.file
    })
});

module.exports = router;
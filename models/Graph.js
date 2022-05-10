const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const GraphSchema = new Schema({
  create_time: { // 创建时间
    type: Number,
    default: Date.now()
  },
  recent_time: { // 最近修改时间
    type: Number,
    default: Date.now()
  },
  id: { // 唯一id
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: '未命名文件'
  },
  info: {
    type: String,
    default: ''
  }
});

module.exports = Graph = mongoose.model("graphs", GraphSchema);
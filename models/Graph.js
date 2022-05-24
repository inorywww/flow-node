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
  is_del: { // 是否删除 0：未删除 1: 假删除
    type: Number,
    default: 0, 
  },
  info: {
    type: Object,
    default: {
      nodes: [],
      edges: [],
    }
  },
  img: {
    type: String,
    default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAPtJREFUeF7t0rENAAAMwrDy/9M9wmvYs1jsGgmM6uILEE8QYIAogHkPDBAFMO+BAaIA5j0wQBTAvAcGiAKY98AAUQDzHhggCmDeAwNEAcx7YIAogHkPDBAFMO+BAaIA5j0wQBTAvAcGiAKY98AAUQDzHhggCmDeAwNEAcx7YIAogHkPDBAFMO+BAaIA5j0wQBTAvAcGiAKY98AAUQDzHhggCmDeAwNEAcx7YIAogHkPDBAFMO+BAaIA5j0wQBTAvAcGiAKY98AAUQDzHhggCmDeAwNEAcx7YIAogHkPDBAFMO+BAaIA5j0wQBTAvAcGiAKY98AAUQDzHoiAD0PoAFE/HRk+AAAAAElFTkSuQmCC'
  },
  types: {
    type: Array,
    default: []
  }
});

module.exports = Graph = mongoose.model("graphs", GraphSchema);
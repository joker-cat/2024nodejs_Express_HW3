const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { apiClass } = require("./module/apiClassModule");
const { schema, options } = require("./module/schemaModule");
const { resFaildWrite } = require("./module/resModule");
const app = express();
const port = 3000;
app.use(express.json());

// 引用環境變數檔
dotenv.config({ path: "./config.env" });
const dbUrl = process.env.URL.replace("<password>", process.env.PASSWORD);

// 連接資料庫
// 如果localhost連接失敗，請改成127.0.0.1，此問題可能為 node / npm 版本造成
mongoose
  // .connect(dbUrl)
  .connect("mongodb://127.0.0.1:27017/nodejs_homework3")
  .then(() => console.log("資料庫連線成功"))
  .catch((error) => console.error("資料庫連線失敗"));

const postSchema = new mongoose.Schema(schema, options); // 設定Schema
const Post = mongoose.model("post", postSchema); // 關聯

const createClass = new apiClass(app, Post);
createClass.getPost();
createClass.postPost();
createClass.delPost();
createClass.delAllPost();
createClass.patchPost();
createClass.notFound();
createClass.reqOptions();

// 自訂錯誤處理中間件
app.use((err, req, res, next) => {
  resFaildWrite(res, 400, "資料格式有誤");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

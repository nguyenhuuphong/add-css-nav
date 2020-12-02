var express = require("express");
var db = require('../db');
const shortid = require("shortid");

var router = express.Router();
var controller = require('../controllers/books.controller');

router.get("/", controller.home );
// thêm tên sách
router.get("/create", controller.create);

router.post("/create", controller.createPost);
// xóa tên sách
router.get("/:id/delete", controller.idDelete );


// cập nhật tên sách
router.get("/:id/update", controller.idUpdate);

router.post("/:id/update", controller.idUpdatePost);

module.exports = router;
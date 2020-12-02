var express = require("express");
var router = express.Router();
const shortid = require("shortid");
var db = require('../db');

var controller = require('../controllers/users.controller');
// view home user
router.get("/", controller.index );

// add new user
router.get("/add",controller.add );

router.post("/add", controller.addPost );
// xóa người thuê
router.get("/:id/delete",controller.idDelete );
// show thông tin
router.get("/:id", controller.show );


module.exports = router;
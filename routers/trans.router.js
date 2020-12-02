var express = require("express");
var db = require('../db');
const shortid = require("shortid");

var router = express.Router();
var controller = require('../controllers/trans.controller');
// show người đã mượn sách
router.get("/", controller.trans);
// thêm userId và BookId mới
router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.get("/:id/complete", (req, res )=>{
  var getId = req.params.id;
  var getData = db
         .get("trans")
         .find({ id: getId })
         .value();

    res.render("transupdate", {
    trans: getData
 }); 
});
router.post("/:id/complete", (req ,res)=>{
  var id = req.params.id;
  var userId = req.body.userId;
  var bookId  = req.body.bookId;
  var isComplete= req.body.isComplete
   
   db.get('trans')
  .find({ id: id })
  .assign({ userId: userId, bookId: bookId,isComplete: isComplete })
  .write()
  
  res.redirect("/transaction");
})

module.exports = router;


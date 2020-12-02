var db = require("../db");
const shortid = require("shortid");

module.exports.trans = function (req, res) {
	var trans = db.get('trans').value();
	var users = db.get('user').value();
	var books = db.get('books').value();
	var result = [];

	// { 
	//	 id: 'transactionId',
	//   userId: 'userId',
	//   bookId: 'bookId',
	//   isComplete: false,
	// }
	trans.map(function(item){ // reduce
		var obj = {};   
		obj.id = item.id;

		users.map(function(user){ // find
			if(item.userId === user.id){
				return obj.user = user;
			}
		});

		books.map(function(book){ // find
			if(item.bookId === book.id){
				return obj.book = book;
			}
		});
		obj.isComplete = item.isComplete
		return result.push(obj)
	});
	console.log(result);
	/**{
		id: 'transactionId',
		user: {
		    id: 'userId'
		    name: 'hoang',
		},
		book: {
		  id: 'bookId',
		  title: 'book title'
	  	},
		  isComplete: false
		} 
	*/
	res.render('trans', {
		transactions: result,

	})
};
// thêm userId và BookId mới
module.exports.create = function(req, res) {
	var users = db.get('user').value();
	var books = db.get('books').value();

 	res.render("transcreate", {
 		users: users,
 		books: books
 	});
};
module.exports.createPost = function(req, res){
	req.body.id = shortid.generate();
	// req.body: {
    //   "userId": "uIdx5Ji1q",
    //   "bookId": "YcGHF4uwC",
    //   "id": "k-meYJQmQ"
    // }
    // req.body.isComplete = false;
	db.get('trans').push(req.body).write();  
    res.redirect("/transaction");
};
module.exports.idComplete = function (req, res ){
  var getId = req.params.id;
  var getData = db
         .get("trans")
         .find({ id: getId })
         .value();

    res.render("transupdate", {
    trans: getData
 }) };
module.exports.idCompletePost = function (req ,res){
  var id = req.params.id;
  var userId = req.body.userId;
  var bookId  = req.body.bookId;
  var isComplete= req.body.isComplete
   
   db.get('trans')
  .find({ id: id })
  .assign({ userId: userId, bookId: bookId,isComplete: isComplete })
  .write()
  
  res.redirect("/transaction");
};
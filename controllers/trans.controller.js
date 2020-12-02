var db = require("../db");
const shortid = require("shortid");
module.exports.trans = function (req, res) {
	var trans = db.get('trans').value();
	var users = db.get('user').value();
	var books = db.get('books').value();

	var result = [];

	trans.map(function(item){
		var obj = {};   
		obj.id = item.id;

		users.map(function(user){
			if(item.userId === user.id){
				return obj.user = user;
			}
		});

		books.map(function(book){
			if(item.bookId === book.id){
				return obj.book = book;
			}
		});
		return result.push(obj)
	});

	res.render('trans', {
		transactions: result
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
	db.get('trans').push(req.body).write();  
    res.redirect("/transaction");
};


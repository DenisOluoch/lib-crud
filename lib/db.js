var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'DENIS2600',
	database:'library',
	insecureAuth : true
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;
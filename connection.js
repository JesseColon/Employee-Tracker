const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1234',
    database: 'EmployeeTracker',
}); 

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

module.exports = connection;
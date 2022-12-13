const mysql = require('mysql');

const db = mysql.createConnection({
    host: '52.9.145.214',
    port:'3306',
    user: 'root',
    password: 'X3ryu5IPBX.TxMT3l3c0m',
    database: 'contract'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;


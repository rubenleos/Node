const mysql = require('mysql');
const User = require('../models/user');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    databvase:'udemy_delivery'
});

db.connect(function(err){

    if(err) throw err;
    console.log('database connected');
    


});
module.exports =User ; 




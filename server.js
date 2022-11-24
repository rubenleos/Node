const express = require('express');
const { listen } = require('express/lib/application');
const app =express();
const http = require('http');
const server = http.createServer(app);

//puerto que esta escuchando nuestro server 
const port = process.env.PORT || 8000;
app.set('port',port);

server-listen(8000,'172.16.1.15'|| 'localhost',function(){
console.log('Aplicacion de node js '+ process.pid + 'iniciada...')

});
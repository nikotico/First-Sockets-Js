/*
dependencias
npm i express
npm i socket.io
npm i nodemon --save -dev solo para desarrollo
*/

var express = require('express');
var app = express();
var server = require('http').Server(app);//Sepa que va estar usando sockets para
var io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});
app.use(express.static('client'));//Cargar el html de client

app.get('/msg',function(req,res){
    res.status(200).send('null');
});

var messages = [{
    id:1,
    text: "Hello Chat",
    nickname: "Bot"
}];

io.on('connection',function(socket){//Detectar cuando alguien se conecta
    console.log('conectado al socket la IP'+socket.handshake.address);
    
    socket.emit('message',messages)//Apenas inicia manda los mensajes que tengo guardados

    socket.on('add-msg',function(data){//Para recibir el mensaje
        messages.push(data);
        io.sockets.emit('message',messages)//Enviarle a todos los clientes los mensajes
    });
});

server.listen(8081,function(){
    console.log("Listo en el 8081") ;
})//Crear el servidor, basico
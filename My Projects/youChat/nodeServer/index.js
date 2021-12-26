// this is the node server which will handle socket.io connection .

const io = require('socket.io')(8000,{
    cors :{
        origin : '*',
    }
});

const users = {} ;

io.on('connection' ,socket=>
{
    socket.on('newuser-joined' , Name=>{
        users[socket.id] = Name ;

        socket.broadcast.emit('user-joined' , Name) ;
    }) ;

    socket.on('send' , message=>
    {
        socket.broadcast.emit('receive' , {message : message , name : users[socket.id]}) ; 
    }) ;

    socket.on('disconnect' , message=>{
        socket.broadcast.emit('left' ,users[socket.id]) ;
        delete users[socket.id] ;
    }) ;
} ) ;

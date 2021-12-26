const socket = io('http://localhost/8000') ;

const form = document.getElementById('send-container') ;

const messageInput = document.getElementById('messageInp') ;
const messageCont = document.querySelector(".container") ;



const append = (message , position)=>{
    const messageEle = document.createElement('div') ;
    messageEle.innerText = message ;
    messageEle.classList.add('message') ;
    messageEle.classList.add(position) ;
    
    messageCont.append(messageEle) ;
} ;


form.addEventListener('submit' , (e)=>{
    e.preventDefault() ;
    const message = messageInput.value ;

    append(`You : ${message}` , 'right') ;
    socket.emit('send' , message) ;
    messageInput.value = '' ;
})

const Name = prompt("Enter your name to join") ;
socket.emit('newuser-joined' , Name) ;

socket.on('user-joined' , Name =>{
    append(`${Name} joined the chat` , 'right') ;
})

socket.on('receive' , data=>{
    append(`${data.name} : ${data.message}` , 'left') ;
})

socket.on('left' , Name=>
{
    append(`${Name} left the chat` , 'center') ;
})

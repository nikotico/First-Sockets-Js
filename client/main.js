
var socket = io.connect('http://192.168.0.2:8081',{'forceNew':true});

socket.on('message', function(data){
    render(data);
});

function render(data) {
    var html = data.map(function(msg,i){//dato e indice
        return (`
            <div class="msg">
                <strong>${msg.nickname} dice:</strong>
                <p>${msg.text}</p>
            </div>
        `);
    }).join(' ');
    var div_add = document.getElementById('msgs')
    
    div_add.innerHTML = html;//Imprimo el mensaje en el div msgs
    div_add.scrollTop = div_add.scrollHeight;
}

function addMsg(e){
    var msg = {//accedo a los inputs con el DOM
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display = 'none';//Para que no pueda cambiar el nickname
    document.getElementById('text').value = ' ';//Para que no pueda cambiar el nickname

    socket.emit('add-msg',msg);//Emito el mensaje al socket(index.js)

    return false;
}
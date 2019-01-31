const socket = io();
            

socket.on('connect', function (){
    console.log('Connected with server');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
})

socket.on('newMessage', function(message){
    console.log('newMessage', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
})

socket.on('newJoin', function(message){
    console.log(message);
})

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(message){
//     console.log(message);
// });

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
        
    })
});




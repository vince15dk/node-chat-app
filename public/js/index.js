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

    const messageTextbox = jQuery('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('')
    })
});

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');  

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})


var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if (!navigator.geolocation) {
        return alert('Geo location not supported by your browser');
        }

        locationButton.attr('disabled', 'disabled').text('Sending Location ...');
    
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location')
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
            
    }, function(){
        locationButton.text('Send Location');
        alert('Unable to fetch location.')
    })

})




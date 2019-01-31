const socket = io();

function scrollToBottom(){
    // Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child')

    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
       messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function (){
    const params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        } else{
            console.log('No error');
        }
    })
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
})

socket.on('updateUserList', function(users){
    let ol = jQuery('<ol></ol>')
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    })

    jQuery('#users').html(ol);
});

socket.on('newMessage', function(message){
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template,{     
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    // let li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
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
    const formattedTime = moment(message.createdAt).format('h:mm a');

    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template,{     
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');  

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
})


var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if (!navigator.geolocation) {
        return alert('Geo location not supported by your browser');
        }

        locationButton.attr('disabled', 'disabled').text('보내는 중 ...');
    
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('현재 위치 보내기')
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
            
    }, function(){
        locationButton.text('현재 위치 보내기');
        alert('Unable to fetch location.')
    })

})




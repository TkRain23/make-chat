//index.js
$(document).ready(() => {
  //index.js
  const socket = io.connect();
  let currentUser;
  // Get the online users from the server
  socket.emit('get online users');

  $('#createUserBtn').click((e) => {
    e.preventDefault();
    if ($('#usernameInput').val().length > 0) {
      socket.emit('new user', $('#usernameInput').val());
      // Save the current user when created
      currentUser = $('#usernameInput').val();
      $('.usernameForm').remove();
      // Have the main page visible
      $('.mainContainer').css('display', 'flex');
    }
  });

  $('#sendChatBtn').click((e) => {
    e.preventDefault();
    let message = $('#chatInput').val();
    // Make sure it's not empty
    if (message.length > 0) {
      // Emit the message with the current user to the Server
      socket.emit('new message', {
        sender: currentUser,
        message: message,
      });
      $('#chatInput').val("");;
    }
  });

  //socket listeners
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat`);
    // Add the new user to the online users div
    $('.usersOnline').append(`<div class="userOnline">${username}</div>`);
  })

  //Output the new message
  socket.on('new message', (data) => {
    $('.messageContainer').append(`
      <div class="message">
        <p class="messageUser">${data.sender}: </p>
        <p class="messageText">${data.message}</p>
      </div>
      `);
  })

  socket.on('get online users', (onlineUsers) => {
    //You may have not have seen this for loop before. It's syntax is for(key in obj)
    //Our usernames are keys in the object of onlineUsers.
    for (username in onlineUsers) {
      $('.usersOnline').append(`<p class="userOnline">${username}</p>`);
    }
  })

  //Refresh the online user list
  socket.on('user has left', (onlineUsers) => {
    $('.usersOnline').empty();
    for (username in onlineUsers) {
      $('.usersOnline').append(`<p>${username}</p>`);
    }
  });

})

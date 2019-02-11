$(document).ready(() => {
  // connect to the socket.io server
  const socket = io.connect();

  $('#createUserBtn').click((e) => {
    let username = $('#usernameInput').val();
    if (username.length > 0) {
      // Emit to the server the new user
      socket.emit('new user', username);
      $('.usernameForm').remove();
    }
  });
});

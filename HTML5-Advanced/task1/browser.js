var socket = new WebSocket("ws://localhost:8081");

document.getElementById('submit').onclick = function() {
  const clientMessage = document.getElementById('input').value;
  if (clientMessage) {
    socket.send(clientMessage);
  } else {
    alert('Say smth.');
  }
  return false;
};

socket.onmessage = function(event) {
  const serverMessage = event.data;
  const bubble = document.getElementById('bubble');
  bubble.style.display = 'block';
  bubble.innerHTML = serverMessage;
};






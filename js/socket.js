
const connectWebSocket = (id, firstName, lastName) => {
  try {
    const name = lastName === undefined ? firstName : firstName + ' ' + lastName;
    const socket = new WebSocket("ws://127.0.0.1:8000/ws");

    socket.onopen = function (e) {
      alert(`Connection established: ${id} ; ${name}`);
      socket.send("Hello from WebApp");
    };
    
    socket.onmessage = function (event) {
      alert(`Data received: ${event.data}`);
    };
    
    socket.onclose = function (event) {
      if (event.wasClean) {
        alert(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        alert('Connection died');
      }
    };
    
    socket.onerror = function (error) {
      alert(`Error: ${error.message}`);
    };
  } catch (error) {
    alert(`Error catch: ${error}`);
  }
}

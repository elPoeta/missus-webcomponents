module.exports = io => {
  const connections = [];
  const users = [];
  io.on("connection", socket => {
    connections.push(socket);
    console.log(`Connected: ${connections.length} connections`);
    console.log(`Users Connected: ${users.length} users`);
    socket.on("disconnect", () => {
      users.splice(users.indexOf(socket.user), 1);
      connections.splice(connections.indexOf(socket), 1);
      updateUsers();
      console.log(`Disconnected: ${connections.length} connections`);
      console.log(`User Disconnected: ${users.length} users`);
    });
    socket.on("new user", (user, callback) => {
      callback(true);
      socket.user = { userName: user, id: socket.id };
      console.log("sovk :: ", socket.user);
      users.push(socket.user);
      updateUsers();
    });
    socket.on("new message", message => {
      console.log("msg", message);
      io.sockets.emit("get message", message);
    });

    function updateUsers() {
      io.sockets.emit("get users", users);
    }
  });
};

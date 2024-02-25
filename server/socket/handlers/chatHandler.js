const auth = require("../../middleware/auth");

module.exports = (io, socket) => {
  socket.on("chat:send", (msg, user) => {
    socket.broadcast.emit("chat:send", msg, user);
  });

  socket.on("logout", (socket) => {
    return socket.disconnect();
  });
};

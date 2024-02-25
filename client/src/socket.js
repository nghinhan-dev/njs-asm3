import { io } from "socket.io-client";

const sendMsgHandler = (msg, user) => {
  socket.emit("chat:send", msg, user);
};

const logOutSocket = () => {
  socket.emit("logout");
};

export { sendMsgHandler, logOutSocket };

export const socket = io("http://localhost:5000/", {
  withCredentials: true,
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");

const { mongooseConnect } = require("./util/connectDB");
const { sessionMiddleware, corsConfig } = require("./util/serverUtil");

// routes
const userRoutes = require("./routes/user");
const prdRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

// socket
const registerChatHandlers = require("./socket/handlers/chatHandler");

const app = express();
const httpServer = createServer(app);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors(corsConfig));

app.use(sessionMiddleware);

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/user", userRoutes);
app.use("/product", prdRoutes);
app.use("/order", orderRoutes);

const io = new Server(httpServer, {
  cors: corsConfig,
});

io.engine.use(sessionMiddleware);
io.on("connection", (socket) => {
  console.log(socket.request.session);

  registerChatHandlers(io, socket);
});

mongooseConnect()
  .then(() => {
    httpServer.listen(5000, () => console.log("Rocking on 5000 🚀"));
  })
  .catch((error) => console.log(error));

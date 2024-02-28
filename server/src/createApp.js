const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { useRoutes } = require("./routes");
const { mongooseConnect } = require("../util/connectDB");
const { sessionMiddleware, corsConfig } = require("../util/serverUtil");
const { initIOEvent } = require("../socket/initIOEvent");

async function createApp(httpServer) {
  mongooseConnect()
    .then(() => console.log("Connected to DB 💾"))
    .catch((err) => console.log(err));
  const app = createExpressApp();
  httpServer.on("request", app);

  app.use(cors(corsConfig));

  const io = new Server(httpServer, {
    cors: corsConfig,
  });

  initAuth(app, io);
  initIOEvent(io);

  useRoutes(app);
}

function createExpressApp() {
  const app = express();

  app.use(bodyParser.json());
  app.use(cookieParser());

  return app;
}

function initAuth(app, io) {
  app.use(sessionMiddleware);
  io.engine.use(sessionMiddleware);
}

module.exports = { createApp };

require("dotenv").config();

const { createServer } = require("http");
const { createApp } = require("./src/createApp");

const httpServer = createServer();

(async () => {
  await createApp(httpServer);
  httpServer.listen(5000, () => console.log("Rocking on 5000 🚀"));
})();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoDBStore = require("connect-mongo");

const { mongooseConnect } = require("./util/connectDB");

// routes
const userRoutes = require("./routes/user");
const prdRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "5ad070abf4844032b8e2e0312580db53",
    resave: false,
    saveUninitialized: false,
    store: mongoDBStore.create({
      mongoUrl:
        "mongodb+srv://sillywhale:Arvgw2WvQRbsfzSt@funix-sw.v8apyjj.mongodb.net/asm3-ecom?retryWrites=true&w=majority",
      collectionName: "sessions",
    }),
    cookie: { maxAge: 86400000 },
  })
);

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

mongooseConnect()
  .then(() => {
    app.listen(5000, () => console.log("Rocking on 5000 🚀"));
  })
  .catch((error) => console.log(error));

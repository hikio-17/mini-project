const express = require("express");
const connectDB = require("./database/db");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const contactRoute = require("./router/contactRouter");

const app = express();
const PORT = 5000;

// set view engine
app.set("view engine", "ejs");

// connect to database
connectDB();

// Third party middleware
app.use(morgan("dev"));
app.use(expressLayouts);
app.use(express.urlencoded());

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// middleware route
app.get("/", (req, res) => {
  res.render("index", {
    layout: "../layout/main-layout",
    title: "Home",
  });
});
app.use("/api", contactRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

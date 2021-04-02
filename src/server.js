const express = require("express");
const ejs = require("ejs");
const router = require("./routers");
const sass = require("node-sass-middleware");
const cookieParser = require("cookie-parser");
const server = express();
const session = require("express-session");
const { flash } = require("express-flash-message");


server.use(express.urlencoded({extended:false}));
server.use(express.static("./src/assets"));
server.use(sass({
    src: "./src",
    dest: "./src/assets"
}));
server.use(session({
    secret: "719a7fa2bb664547aa56cfd7cc30a3f3c890df7214774b929420dd3c68dbca7332a7df8c89a844b1b865621012dcdbed",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
server.use(flash({sessionKeyName: "flashMessage"}));
server.use(cookieParser());
server.use(router);

server.engine("ejs", ejs.renderFile);
server.set("views", "./src/views");

server.listen(8080, () => {
    console.log("Server running at port 8080");
});
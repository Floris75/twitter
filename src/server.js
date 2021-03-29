const express = require("express");
const ejs = require("ejs");
const router = require("./routers");
const sass = require("node-sass-middleware");
const server = express();


server.use(express.urlencoded());
server.use(express.static("./src/assets"));
server.use(router);
server.use(sass({
    src: "./src",
    dest: "./src/assets"
}));

server.engine("ejs", ejs.renderFile);
server.set("views", "./src/views");

server.listen(8080, () => {
    console.log("Server running at port 8080");
});
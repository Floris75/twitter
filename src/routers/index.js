const express = require("express");
const router = express.Router();

// Controllers 

const homepage = require("../controllers/homepageController");
const profile = require("../controllers/profileController");
const visitor = require("../controllers/visitorController");
const connected_user = require("../controllers/connected_userController");

// Routes
    // Homepage

router.get("/", homepage.load);
    
    // Profile

router.get("/username/:id", profile.load);



module.exports = router;
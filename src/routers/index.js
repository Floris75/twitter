const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

// Controllers 

const homepage = require("../controllers/homepageController");
const profile = require("../controllers/profileController");
const visitor = require("../controllers/visitorController");
const connected_user = require("../controllers/connected_userController");

// Routes
    // Homepage

router.get("/",isAuth, homepage.load);
    
    // Profile

router.get("/profile/:username", isAuth, profile.load);
router.get("/profile/:username/:id", isAuth, profile.tweetDetail);

    // Visitor

router.get("/login", visitor.login);
router.post("/login", visitor.authenticate);
router.get("/signup", visitor.signup);
router.post("/signup", visitor.createAccount);

    // User Connected
router.get("/logout", connected_user.logout);
router.get("/myAccount", isAuth, connected_user.load);
router.get("/myAccount/:id", isAuth, connected_user.tweetDetail);
router.get("/myAccount/:id/update", isAuth, connected_user.tweetModify);
router.post("/myAccount/:id/update", isAuth, connected_user.tweetUpdate);
router.get("/myAccount/:id/delete", isAuth, connected_user.deleteTweet);
router.post("/tweet", isAuth, connected_user.tweeter);

module.exports = router;
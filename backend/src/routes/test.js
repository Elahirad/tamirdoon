const express = require('express');
const router = express.Router();
const {User} = require("../models/user");
const {Image} = require("../models/image");
const {sequelize} = require("../../config/db");

router.get("/", (req, res) => {
    res.send("Hello express !!");
});
router.get("/sync", (req, res) => {
    sequelize.sync({force: true})
        .then(() => res.send("Tables created!"))
        .catch((err) => res.status(500).send("Error: " + err));
});

module.exports = router;
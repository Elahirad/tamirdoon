const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const {User, userSignUpValidate, userSignInValidate} = require("../models/user");
const {Op} = require("sequelize");
const auth = require("../middlewares/auth");

router.post("/sign-up", async (req, res) => {
    const {error} = userSignUpValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        where: {
            [Op.or]: [
                {email: req.body.email},
                {phoneNumber: req.body.phoneNumber},
            ],
        },
    });

    if (user) return res.status(400).send("User already registered.");

    user = await User.build(
        _.pick(req.body, [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "password",
        ])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.cookie("x-auth-token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
    res.send(_.pick(user, ["id", "firstName", "lastName", "email", "phoneNumber"]));
});

router.post("/sign-in", async (req, res) => {
    const {error} = userSignInValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({
        where: {
            [Op.or]: [
                {email: req.body.username},
                {phoneNumber: req.body.username},
            ],
        },
    });

    // TODO: Generating token with remember or not

    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");
    const token = user.generateAuthToken();
    res.cookie("x-auth-token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
    res.send(
        _.pick(user, ["id", "firstName", "lastName", "email", "phoneNumber"])
    );
});

router.get("/is-logged-in", auth, (req, res) => {
    res.sendStatus(200);
});

module.exports = router;

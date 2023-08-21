const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const {Customer, customerSignUpValidate, customerSignInValidate} = require("../models/customer");
const {Op} = require("sequelize");
const auth = require("../middlewares/auth");

router.post("/sign-up", async (req, res) => {
    const {error} = customerSignUpValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findOne({
        where: {
            [Op.or]: [
                {email: req.body.email},
                {phoneNumber: req.body.phoneNumber},
            ],
        },
    });

    if (customer) return res.status(400).send("Customer already registered.");

    customer = await Customer.build(
        _.pick(req.body, [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "password",
        ])
    );

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);

    await customer.save();

    const token = customer.generateAuthToken();
    res.cookie("x-auth-token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
    res.send(_.pick(customer, ["id", "firstName", "lastName", "email", "phoneNumber"]));
});

router.post("/sign-in", async (req, res) => {
    const {error} = customerSignInValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findOne({
        where: {
            [Op.or]: [
                {email: req.body.username},
                {phoneNumber: req.body.username},
            ],
        },
    });

    // TODO: Generating token with remember or not

    if (!customer) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(req.body.password, customer.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    const token = customer.generateAuthToken();
    res.cookie("x-auth-token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
    res.send(_.pick(customer, ["id", "firstName", "lastName", "email", "phoneNumber"]));
});

router.get("/is-logged-in", auth, (req, res) => {
    res.sendStatus(200);
});

module.exports = router;

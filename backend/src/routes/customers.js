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

    if (!customer) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(req.body.password, customer.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    customer.generateAuthToken(req, res);

    res.send(_.pick(customer, ["id", "firstName", "lastName", "email", "phoneNumber"]));
});

router.get('/sign-out', auth, (req, res) => {
    res.cookie(
        'x-auth-token',
        {},
        { maxAge: -1 }
    );
    res.sendStatus(200);
});

router.get('/current-user', auth, (req, res) => {
    res.send(req.user);
});

module.exports = router;

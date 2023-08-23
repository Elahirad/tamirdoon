const express = require('express');
const router = express.Router();
const { Admin, adminCreateValidate } = require('../models/admin');
const {Op} = require("sequelize");
const {Customer} = require("../models/customer");
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post('/create-admin', async (req, res)=> {
    const {error} = adminCreateValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let admin = await Admin.findOne({
        where: {
            [Op.or]: [
                {email: req.body.email},
                {phoneNumber: req.body.phoneNumber},
            ],
        },
    });

    if (admin) return res.status(400).send("Admin already registered.");

    admin = await Admin.build(
        _.pick(req.body, [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "password",
        ])
    );

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);

    await admin.save();

    res.send(_.pick(admin, ["id", "firstName", "lastName", "email", "phoneNumber"]));
});
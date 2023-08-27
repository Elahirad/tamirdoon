const express = require('express');
const router = express.Router();
const { Admin, adminCreateValidate, adminUpdateValidate } = require('../../models/admin');
const {Op} = require("sequelize");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {Role} = require("../../models/role");
const {value} = require("lodash/seq");

router.post('/create', async (req, res)=> {
    const {error} = adminCreateValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let admin = await Admin.findOne({
        where: {
            [Op.or]: [
                {email: req.body.email},
                {phoneNumber: req.body.phoneNumber},
            ],
        }
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

    if(req.body.roleId)
        await admin.addRole(await Role.findByPk(req.body.roleId))

    await admin.save();

    res.send(_.pick(admin, ["id", "firstName", "lastName", "email", "phoneNumber"]));
});

router.put('/:id', async (req, res) => {
    const {error} = adminUpdateValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let admin = await Admin.findByPk(req.params.id);
    if(!admin) return res.status(400).send("admin doesn't exist")

    for(const key in _.omit(req.body, ['roleId']))
        admin[key] = req.body[key];

    if(req.body.roleId) {
        const role = await Role.findByPk(req.body.roleId)
        if(role)
            await admin.removeRole(role);
        else
            await admin.addRole(role);
    }

    await admin.save();

    res.send(admin);
});

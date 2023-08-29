const express = require('express');
const router = express.Router();
const { Admin, adminCreateValidate, adminUpdateValidate } = require('../../models/admin');
const {Op} = require("sequelize");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {Role} = require("../../models/role");
const User = require('../../models/user');

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
    await admin.save();

    if(req.body.roleId)
        await admin.addRole(await Role.findByPk(req.body.roleId))

    res.send(_.pick(admin, ["id", "firstName", "lastName", "email", "phoneNumber"]));
});

router.put('/:id', async (req, res) => {
    const {error} = adminUpdateValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let admin = await Admin.findByPk(req.params.id);
    if(!admin) return res.status(400).send("admin doesn't exist");

    for(const key in _.omit(req.body, ['roleId', 'password']))
        admin[key] = req.body[key];

    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(req.body.password, salt);
    }

    if(req.body.roleId){
        if(req.body.roleId !== -1) {
            const role = await Role.findByPk(req.body.roleId)
            if(!role)
                return res.status(400).send("role doesn't exist.");
            const adminRole = await admin.getRoles()[0];
            if(adminRole.id === req.body.roleId)
                return res.status(400).send("admin already has the role.");
            else
                await admin.addRole(req.body.roleId);
        }
        else {
            const adminRole = await admin.getRoles()[0];
            if(!adminRole)
                return res.status(400).send("admin doesn't have role.");
            await admin.removeRole(adminRole);
        }
    }

    await admin.save();
    res.send(admin);
});

router.delete('/:id', async (req, res) => {
    const admin = await Admin.findByPk(req.params.id);
    if(!admin) return res.status(400).send("admin doesn't exist.");

    const user = await User.findByPk(admin.userId);
    await user.destroy();

    res.send('deleted successfully.')
});

module.exports = router;

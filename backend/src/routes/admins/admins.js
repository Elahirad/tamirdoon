const express = require('express');
const router = express.Router();
const { Admin, adminCreateValidate, adminUpdateValidate,
    adminSignInValidate, adminSearchValidate} = require('../../models/admin');
const {Role} = require("../../models/role");
const User = require('../../models/user');
const adminAuth = require('../../middlewares/adminAuth');
const {Op} = require("sequelize");
const _ = require("lodash");
const bcrypt = require("bcrypt");


router.get('/', adminAuth('ADMIN_READ'), async (req, res) => {
    const {error} = adminSearchValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const page = parseInt(req.body.page) || 1;
    const perPage = parseInt(req.body.perPage) || 10;

    const searchConditions = {};
    for(let property in req.body.query){
        if(req.body.query[property]){
            searchConditions[property] = req.body.query[property]
        }
    }

    const { count, rows } = await Admin.findAndCountAll({
        where: searchConditions,
        limit: perPage,
        offset: (page - 1) * perPage
    });

    res.json({
        totalAdmins: count,
        totalPages: Math.ceil(count / perPage),
        currentPage: page,
        adminsPerPage: perPage,
        admins: rows,
    });
});

router.post('/create', adminAuth('ADMIN_CREATE'),async (req, res)=> {
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

    if(req.body.roleId){
        const role = await Role.findByPk(req.body.roleId);
        if(!role) return res.status(400).send("role doesn't exist.");
        await admin.addRole(role);
    }

    res.send(_.pick(admin, ["id", "firstName", "lastName", "email", "phoneNumber"]));
});

router.post('/sign-in',async (req, res) => {
    const {error} = adminSignInValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const admin = await Admin.findOne({
        where: {
            [Op.or]: [
                {email: req.body.username},
                {phoneNumber: req.body.username},
            ],
        },
    });

    if (!admin) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    admin.generateAuthToken(req, res);

    res.send(_.pick(admin, ["id", "firstName", "lastName", "email", "phoneNumber"]));
})

router.put('/:id', adminAuth('ADMIN_UPDATE'),async (req, res) => {
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
            const adminRoles = await admin.getRoles();
            const adminRole = adminRoles[0];
            if(adminRole)
                return res.status(400).send("admin already has a role.");
            // if(adminRole.id === req.body.roleId)
            //     return res.status(400).send("admin already has the role.");
            else
                await admin.addRole(req.body.roleId);
        }
        else {
            const adminRoles = await admin.getRoles();
            const adminRole = adminRoles[0];
            if(!adminRole)
                return res.status(400).send("admin doesn't have role.");
            await admin.removeRole(adminRole.id);
        }
    }
    await admin.save();
    res.send(admin);
});

router.delete('/:id', adminAuth('ADMIN_DELETE'), async (req, res) => {
    const admin = await Admin.findByPk(req.params.id);
    if(!admin) return res.status(400).send("admin doesn't exist.");

    const user = await User.findByPk(admin.userId);
    await user.destroy();

    res.send('deleted successfully.')
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Role, roleCreateValidate } = require('../models/role');

router.get('/', async (req, res) => {
    res.send(await Role.findAll());
});

router.post('/create', async (req, res) => { // needs middleware to do this
    const {error} = roleCreateValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let role = await Role.findOne({
        where: { name: req.body.name}
    });
    if (role) return res.status(400).send("Role already exists.");

    role = await Role.create({name: req.body.name});
    res.send(role);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const {Category, categoryValidate} = require('../models/category');

router.post('/', adminAuth('CATEGORY_CREATE'), async (req, res) => {
    const {error} = categoryValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = await Category.findOne({
        where: { name: req.body.name }
    });
    if (category) return res.status(400).send("Category already exists.");

    category = await Category.create({
        name: req.body.name
    });

    res.send(category);
})
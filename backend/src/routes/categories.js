const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const {Category, categoryValidate} = require('../models/category');

router.get('/', adminAuth('CATEGORY_READ'), async(req, res) => {
    const categories = await Category.findAll();

    res.send(categories);
});

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
});

router.put('/:id', adminAuth('CATEGORY_UPDATE'), async(req, res) => {
    const {error} = categoryValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = await Category.findByPk(req.params.id);
    if (!category) return res.status(400).send("Category doesn't exist.");

    category.name = req.body.name;

    await category.save();
    res.send(category);
});

router.delete('/:id', adminAuth('CATEGORY_DELETE'), async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(400).send("Category doesn't exist.");

    await category.destroy();
    res.send('deleted successfully!');
});

module.exports = router;
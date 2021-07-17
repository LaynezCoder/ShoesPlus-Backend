const { Category } = require('../models')

const createCategory = async (req, res) => {
    const { name, description } = req.body;
    const category = new Category({ name: name.toLowerCase(), description });

    await category.save();

    res.send({ ok: true, message: `Category ${category.name} saved`, category });
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(id, { name: name.toLowerCase(), description }, { new: true });

    res.send({ ok: true, message: `Category ${category.name} updated`, category });
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

    res.send({ ok: true, message: `Category ${category.name} deleted`, category });
}

const getCategories = async (req, res) => {
    const categories = await Category.find({ status: true });

    res.send({ ok: true, categories })
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    const finalCategory = category.status ? category : []

    res.send({ ok: true, category: finalCategory })
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategoryById
}
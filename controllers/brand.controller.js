const { Brand } = require('../models')
const { trim } = require('../helpers')

const createBrand = async(req, res) => {
    const { name } = req.body;
    const brand = new Brand({ name: trim(name) });

    await brand.save();

    res.send({ ok: true, message: `Brand ${brand.name} saved`, brand });
}

const updateBrand = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const find = await Brand.findOne({ name: trim(name) });

    if (find) {
        if (id != find._id) {
            return res.status(400).send({ message: `This name ${name} is already used` })
        }
    }

    const brand = await Brand.findByIdAndUpdate(id, { name: trim(name) }, { new: true });

    res.send({ ok: true, message: `Brand ${brand.name} updated`, brand });
}

const deleteBrand = async(req, res) => {
    const { id } = req.params;

    const brand = await Brand.findByIdAndUpdate(id, { status: false }, { new: true });

    res.send({ ok: true, message: `Brand ${brand.name} deleted`, brand });
}

const getBrands = async(req, res) => {
    const brands = await Brand.find({ status: true });

    res.send({ ok: true, brands })
}

const getBrandById = async(req, res) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);

    res.send({ ok: true, brand })
}



module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrands,
    getBrandById
}
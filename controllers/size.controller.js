const { Size } = require('../models')

const createSize = async (req, res) => {
    const { name } = req.body;
    const size = new Size({ name });

    await size.save();

    res.send({ ok: true, message: `Size ${size.name} saved`, size });
}

const updateSize = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const size = await Size.findByIdAndUpdate(id, { name: name }, { new: true });

    res.send({ ok: true, message: `Size ${size.name} updated`, size });
}

const deleteSize = async (req, res) => {
    const { id } = req.params;

    const size = await Size.findByIdAndUpdate(id, { status: false }, { new: true });

    res.send({ ok: true, message: `Size ${size.name} deleted`, size });
}

const getSizes = async (req, res) => {
    const sizes = await Size.find({});

    res.send({ ok: true, sizes })
}

const getSizeById = async (req, res) => {
    const { id } = req.params;
    const size = await Size.findById(id);

    res.send({ ok: true, size })
}



module.exports = {
    createSize,
    updateSize,
    deleteSize,
    getSizes,
    getSizeById
}
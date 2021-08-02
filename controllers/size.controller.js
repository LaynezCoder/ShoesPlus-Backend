const { Size, SizeDetail } = require('../models')

const createSize = async(req, res) => {
    const { name } = req.body;
    const size = new Size({ name });

    await size.save();

    res.send({ ok: true, message: `Size ${size.name} saved`, size });
}

const updateSize = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const size = await Size.findByIdAndUpdate(id, { name: name }, { new: true });

    res.send({ ok: true, message: `Size ${size.name} updated`, size });
}

const deleteSize = async(req, res) => {
    const { id } = req.params;

    const find = await SizeDetail.find({ size: id });

    if (find.length > 0) {
        return res.status(400).send({ message: `Can't delete this size` })
    }

    const size = await Size.findByIdAndUpdate(id, { status: false }, { new: true });

    res.send({ ok: true, message: `Size ${size.name} deleted`, size });
}

const getSizes = async(req, res) => {
    const sizes = await Size.find({ status: true });

    res.send({ ok: true, sizes })
}

const getSizeById = async(req, res) => {
    const { id } = req.params;
    const size = await Size.findById(id);

    res.send({ ok: true, size })
}

const checkStockOfSize = async(req, res) => {
    const { id } = req.params;

    const sizeDetail = await SizeDetail.findById(id);

    res.send({ ok: true, sizeDetail });
}

module.exports = {
    createSize,
    updateSize,
    deleteSize,
    getSizes,
    getSizeById,
    checkStockOfSize
}
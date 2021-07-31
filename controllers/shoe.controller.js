const { trim } = require('../helpers')
const { Shoe, SizeDetail, Collection } = require('../models')

const createShoe = async(req, res) => {
    const { idCol, idCat } = req.params;
    const { barcode, name, description, price, sizes } = req.body;

    const sizedetails = await SizeDetail.insertMany(sizes)

    const ids = sizedetails.map(s => s._id);

    const { brand } = await Collection.findById(idCol);

    const shoe = new Shoe({ barcode, name: trim(name), description, price, brand, collection_shoe: idCol, category: idCat, sizes: ids });

    await shoe.save();

    res.send({ ok: true, message: `Shoe ${shoe.name} saved`, shoe });
}

const updateShoe = async(req, res) => {
    const { id } = req.params;
    const { barcode, name, description, price } = req.body;

    const find = await Shoe.findOne({ name: trim(name) });

    if (find) {
        if (id != find._id) {
            return res.status(400).send({ message: `This name ${name} is already used` })
        }
    }

    const shoe = await Shoe.findByIdAndUpdate(id, { name: trim(name), barcode, description, price }, { new: true });

    res.send({ ok: true, message: `Shoe ${shoe.name} updated`, shoe });
}

const deleteShoe = async(req, res) => {
    const { id } = req.params;

    const shoe = await Shoe.findByIdAndUpdate(id, { status: false }, { new: true });

    res.send({ ok: true, message: `Shoe ${shoe.name} deleted`, shoe });
}

const searchShoes = async(req, res) => {
    const { value } = req.params;

    let replace = value.replace(/[^a-z0-9]/gi, '');
    const regex = new RegExp(replace, 'i')
    const shoes = await Shoe.find({ name: regex, status: true }).populate('collection_shoe').populate('brand');

    res.send({ ok: true, shoes });
}

const getShoes = async(req, res) => {
    const shoes = await Shoe.find({ status: true }).populate('collection_shoe').populate('brand');
    res.send({ ok: true, shoes })
}

const getSaleShoes = async(req, res) => {
    const shoes = await Shoe.find({ sale: true }).populate('collection_shoe').populate('brand');
    res.send({ ok: true, shoes })
}

const getShoesByReference = async(req, res) => {
    const { id } = req.params;

    const shoes = await Shoe.find({ $or: [{ brand: id }, { collection_shoe: id }, { category: id }] })
        .populate('collection_shoe').populate('brand').populate('category');

    res.send({ ok: true, shoes });
}

const getShoeById = async(req, res) => {
    const { id } = req.params;
    const shoe = await Shoe.findById(id).populate('sizes').populate('brand');

    const ids = shoe.sizes.map(s => s.id);
    const sizeDetails = await SizeDetail.find({ _id: { $in: ids } }).populate('size');

    res.send({ ok: true, shoe, sizeDetails })
}

const deleteSizes = async(req, res) => {
    const { id } = req.params;
    const { sizes } = req.body;

    await SizeDetail.deleteMany({ _id: { $in: sizes } })

    const sizesdeleted = await Shoe.findByIdAndUpdate(id, { $pull: { sizes: { $in: sizes } } })

    res.send({ ok: true, message: `Sizes  deleted`, sizesdeleted });
}

const sale = async(req, res) => {
    const { id } = req.params;
    const { new_price } = req.body;

    const { price } = await Shoe.findById(id);

    if (new_price > price) {
        return res.status(400).send({ message: 'The new price is higher than the original price!' })
    }

    const { name } = await Shoe.findByIdAndUpdate(id, { new_price, sale: true }, { new: true })

    res.send({ ok: true, message: `This ${name} is now in sale!` })
}

const updateImageShoe = async(req, res) => {
    const { id } = req.params;
    const { images } = req.body;

    await Shoe.findByIdAndUpdate(id, { images }, { new: true })

    res.send({ ok: true, message: 'The images were added' })
}

module.exports = {
    createShoe,
    updateShoe,
    deleteShoe,
    getShoes,
    getSaleShoes,
    getShoesByReference,
    getShoeById,
    deleteSizes,
    sale,
    updateImageShoe,
    searchShoes
}
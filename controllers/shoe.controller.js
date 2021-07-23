const { trim } = require('../helpers')
const { Shoe, Category, Size, SizeDetail } = require('../models')

const createShoe = async (req, res) => {
    const { idCol, idCat } = req.params;
    const { barcode, name, description, price, sizes } = req.body;


    const sizedetails = await SizeDetail.insertMany(sizes)

    const ids = sizedetails.map(s => s._id);

    const shoe = new Shoe({ barcode, name: trim(name), description, price, collection_shoe: idCol, category: idCat, sizes: ids });

    await shoe.save();

    res.send({ ok: true, message: `Shoe ${shoe.name} saved`, shoe });
}

const updateShoe = async (req, res) => {
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

const deleteShoe = async (req, res) => {
    const { id } = req.params;

    const shoe = await Shoe.findByIdAndUpdate(id, { status: false }, { new: true });

    res.send({ ok: true, message: `Shoe ${shoe.name} deleted`, shoe });
}

const getShoes = async (req, res) => {
    const shoes = await Shoe.find({});

    res.send({ ok: true, shoes })
}

const getShoeById = async (req, res) => {
    const { id } = req.params;
    const shoe = await Shoe.findById(id);

    res.send({ ok: true, shoe })
}

const deleteSizes = async (req, res) => {
    const { id } = req.params;
    const { sizes } = req.body;
    console.log(sizes);
    const sizedetails = await SizeDetail.deleteMany({ _id: { $in: sizes } })

    const sizesdeleted = await Shoe.findByIdAndUpdate(id, { $pull: { sizes: { $in: sizes } } })

    res.send({ ok: true, message: `Sizes  deleted`, sizesdeleted });
}

const sale = async (req, res) => {
    const { id } = req.params;
    const { new_price } = req.body;

    const { price } = await Shoe.findById(id);

    if (new_price > price) {
        return res.status(400).send({ message: 'The new price is higher than the original price!' })
    }

    const { name } = await Shoe.findByIdAndUpdate(id, { new_price, sale: true }, { new: true })

    res.send({ ok: true, message: `This ${name} is now in sale!` })
}

const updateImageShoe = async (req, res) => {
    const { id } = req.params;
    const { images } = req.body;

    const shoe = await Shoe.findByIdAndUpdate(id, { images }, { new: true })

    res.send({ ok: true, message: 'The images were added' })
}

module.exports = {
    createShoe,
    updateShoe,
    deleteShoe,
    getShoes,
    getShoeById,
    deleteSizes,
    sale,
    updateImageShoe
}
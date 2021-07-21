const { Shoe, Category, Size, SizeDetail } = require('../models')

const createShoe = async (req, res) => {
    const { idCol, idCat } = req.params;
    const { barcode, name, description, price, sizes } = req.body;


    const sizedetails = await SizeDetail.insertMany(sizes)

    const ids = sizedetails.map(s => s._id);

    const shoe = new Shoe({ barcode, name: name.toLowerCase(), description, price, collection_shoe: idCol, category: idCat, sizes: ids });

    await shoe.save();

    res.send({ ok: true, message: `Shoe ${shoe.name} saved`, shoe });
}

const updateShoe = async (req, res) => {
    const { id } = req.params;
    const { barcode, name, description, price } = req.body;

    const shoe = await Shoe.findByIdAndUpdate(id, { name: name.toLowerCase(), barcode, description, price }, { new: true });

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



module.exports = {
    createShoe,
    updateShoe,
    deleteShoe,
    getShoes,
    getShoeById
}
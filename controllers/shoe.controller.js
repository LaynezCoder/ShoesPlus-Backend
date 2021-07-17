const Shoe = require('../models/shoe.model')
const Size = require('../models/size.model')

const test = async (req, res) => {
    const data = {
        barcode: 023203,
        name: 'Adidas',
        description: 'Test descripcion',
        price: 200,
        collection_shoe: '602f29013e3e4704f8411c56',
        category: '602f29013e3e4704f8411c56',
        sizes: [
            {
                size: '60f320973515f63490023a4c',
                quantity: 15
            }
        ]

    }

    const shoe = new Shoe(data);
    await shoe.save();
    res.send({ shoe })
}

const getShoes = async (req, res) => {
    const shoe = await Shoe.findOne({ name: 'Adidas' }).populate('sizes.size');
    res.send({ shoe })
}

const createSize = async (req, res) => {
    const size = new Size({ name: 8 });

    await size.save();
    res.send({ size })
}

module.exports = {
    test,
    getShoes,
    createSize,
}
const { Shoe, Category, Size } = require('../models')

/* FOR TEST
const test = async(req, res) => {
    const data = {
        barcode: 023203,
        name: 'Adidas',
        description: 'Test descripcion',
        price: 200,
        collection_shoe: '602f29013e3e4704f8411c56',
        category: '602f29013e3e4704f8411c56',
        sizes: [{
                size: '60f32d525ece3d1a40e746d2',
                quantity: 15
            },
            {
                size: '60f32d6dc705752c28bce94c',
                quantity: 15
            }
        ]

    }

    const shoe = new Shoe(data);
    await shoe.save();
    res.send({ shoe })
}

const getShoes = async(req, res) => {
    const shoe = await Shoe.findOne({ name: 'Adidas' }).populate('sizes.size');
    res.send({ shoe })
}

const createSize = async(req, res) => {
    const size = new Size({ name: 5 });

    await size.save();
    res.send({ size })
} */

const createShoe = async (req, res) => {
    const { idC, idCA, idS } = req.params;
    const { barcode, name, description, price, quantity } = req.body;
    const collection = Collection.findById({ idC });
    const category = Category.findById({ idCA });
    const size = Size.findById({ idS });
    const shoe = new Collection({ barcode, name, description, price, collection, category, size, quantity });

    await shoe.save();

    res.send({ ok: true, message: `Shoe ${shoe.name} saved`, shoe });
}




module.exports = {
    createShoe
}
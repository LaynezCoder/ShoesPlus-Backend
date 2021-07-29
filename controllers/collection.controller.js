const { trim } = require('../helpers')
const { Collection, Brand } = require('../models')

const createCollection = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const collection = new Collection({ name: trim(name), brand: id });

    await collection.save();

    res.send({ ok: true, message: `Collection ${collection.name} saved`, collection });
}

const updateCollection = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const find = await Collection.findOne({ name: trim(name) });

    if (find) {
        if (id != find._id) {
            return res.status(400).send({ message: `This name ${name} is already used` })
        }
    }

    const collection = await Collection.findByIdAndUpdate(id, { name: trim(name) }, { new: true });

    res.send({ ok: true, message: `Collection ${collection.name} updated`, collection });
}

const deleteCollection = async(req, res) => {
    const { id } = req.params;

    const collection = await Collection.findByIdAndUpdate(id, { status: false }, { new: true });

    res.send({ ok: true, message: `Collection ${collection.name} deleted`, collection });
}

const getCollections = async(req, res) => {
    const collections = await Collection.find({});

    res.send({ ok: true, collections })
}

const getCollectionById = async(req, res) => {
    const { id } = req.params;
    const collection = await Collection.findById(id);

    res.send({ ok: true, size: collection })
}





module.exports = {
    createCollection,
    updateCollection,
    deleteCollection,
    getCollections,
    getCollectionById,
}
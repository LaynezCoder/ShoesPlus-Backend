const { Collection, Brand } = require('../models')

const createCollection = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const collection = new Collection({ name: name.toLowerCase(), brand: id });

    await collection.save();

    res.send({ ok: true, message: `Collection ${collection.name} saved`, collection });
}

const updateCollection = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const collection = await Collection.findByIdAndUpdate(id, { name: name.toLowerCase() }, { new: true });

    res.send({ ok: true, message: `Collection ${collection.name} updated`, collection });
}

const deleteCollection = async (req, res) => {
    const { id } = req.params;

    const collection = await Collection.findByIdAndUpdate(id, { status: false }, { new: true });

    res.send({ ok: true, message: `Collection ${collection.name} deleted`, collection });
}

const getCollections = async (req, res) => {
    const sizes = await Size.find({});

    res.send({ ok: true, sizes })
}

const getCollectionById = async (req, res) => {
    const { id } = req.params;
    const size = await Size.findById(id);

    res.send({ ok: true, size })
}





module.exports = {
    createCollection,
    updateCollection,
    deleteCollection,
    getCollections,
    getCollectionById,
}
const { ObjectId } = require('mongoose').Types;

const { User, Category, Brand, Size, Collection, Shoe } = require('../models');

const { trim } = require('./string-utils');

const isExistsCategory = async (name) => {
    const isExistsCategory = await Category.findOne({ name: name.toLowerCase() });
    if (isExistsCategory) {
        throw new Error(`This ${isExistsCategory.name} already exists`);
    }
}

const isExistsCategoryById = async (id) => {
    const isExistsCategory = await Category.findById(id);
    if (!isExistsCategory) {
        throw new Error(`This ${id} doesn't exists`);
    }
}

const isExistsUsername = async (username) => {
    const user = await User.findOne({ username: trim(username) });
    if (user) {
        throw new Error(`This username ${username} exists`);
    }
}
const isExistsBrand = async (name) => {
    const isExistsBrand = await Brand.findOne({ name: name.toLowerCase() });
    if (isExistsBrand) {
        throw new Error(`This ${isExistsBrand.name} already exists`);
    }
}

const isExistsBrandById = async (id) => {
    const isExistsBrand = await Brand.findById(id);
    if (!isExistsBrand) {
        throw new Error(`This ${id} doesn't exists`);
    }
}

const isExistsSize = async (name) => {
    const isExistsSize = await Size.findOne({ name: name.toLowerCase() });
    if (isExistsSize) {
        throw new Error(`This ${isExistsSize.name} already exists`);
    }
}

const isExistsSizeById = async (id) => {
    const isExistsSize = await Size.findById(id);
    if (!isExistsSize) {
        throw new Error(`This ${id} doesn't exists`);
    }
}

const isExistsCollection = async (name) => {
    const isExistsCollection = await Collection.findOne({ name: name.toLowerCase() });
    if (isExistsCollection) {
        throw new Error(`This ${isExistsCollection.name} already exists`);
    }
}

const isExistsCollectionById = async (id) => {
    const isExistsCollection = await Collection.findById(id);
    if (!isExistsCollection) {
        throw new Error(`This ${id} doesn't exists`);
    }
}


const isExistsUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`This id ${id} doesn't exists`);
    }
}

const isExistsShoe = async (name) => {
    const isExistsShoe = await Shoe.findOne({ name: name.toLowerCase() });
    if (isExistsShoe) {
        throw new Error(`This ${isExistsShoe.name} already exists`);
    }
}

const isExistsShoeById = async (id) => {
    const isExistsShoe = await Shoe.findById(id);
    if (!isExistsShoe) {
        throw new Error(`This ${id} doesn't exists`);
    }
}

const isExistsBarcode = async (barcode) => {
    const isExistsBarcode = await Shoe.findOne({ barcode });
    if (isExistsBarcode) {
        throw new Error(`This barcode ${isExistsBarcode.barcode} already exists`);
    }
}

const validateIds = (sizes) => {
    sizes.forEach(s => {
        if (!ObjectId.isValid(s.size)) {
            throw new Error(`This size ${s.size} is not valid`);
        }
    })

    return true;
}

const validateQuantity = (sizes) => {
    sizes.forEach(s => {
        if (!isNumeric(s.quantity)) {
            throw new Error(`This quantity ${s.quantity} is not a number`);
        }
    })

    return true;
}

const isNumeric = (n) => {
    return /^\d+$/.test(n);
}

const isExistSizes = async (sizes = []) => {
    const ids = sizes.map(s => s.size);
    const findSizes = await Size.find({ _id: { $in: ids } });

    if (sizes.length === findSizes.length) {
        return true;
    }

    throw new Error('Some sizes were not found');
}

const validateManyIds = (sizes) => {
    sizes.forEach(size => {
        if (!ObjectId.isValid(size)) {
            throw new Error(`This size ${size} is not valid`);
        }
    })

    return true;
}

module.exports = {
    isExistsCategory,
    isExistsCategoryById,
    isExistsUsername,
    isExistsUserById,
    isExistsBrand,
    isExistsBrandById,
    isExistsSize,
    isExistsSizeById,
    isExistsCollection,
    isExistsCollectionById,
    isExistsShoe,
    isExistsShoeById,
    validateIds,
    validateQuantity,
    isExistsBarcode,
    isExistSizes,
    validateManyIds
}
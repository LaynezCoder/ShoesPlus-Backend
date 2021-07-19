const { User, Category } = require('../models');

const { trim } = require('./string-utils');

const isExistsCategory = async(name) => {
    const isExistsCategory = await Category.findOne({ name: name.toLowerCase() });
    if (isExistsCategory) {
        throw new Error(`This ${isExistsCategory.name} already exists`);
    }
}

const isExistsCategoryById = async(id) => {
    const isExistsCategory = await Category.findById(id);
    if (!isExistsCategory) {
        throw new Error(`This ${id} doesn't exists`);
    }
}

const isExistsUsername = async(username) => {
    const user = await User.findOne({ username: trim(username) });
    if (user) {
        throw new Error(`This username ${username} exists`);
    }
}

const isExistsUserById = async(id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`This id ${id} doesn't exists`);
    }
}

module.exports = {
    isExistsCategory,
    isExistsCategoryById,
    isExistsUsername,
    isExistsUserById
}
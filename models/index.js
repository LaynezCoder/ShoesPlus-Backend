const Server = require('./server');
const User = require('./user.model');
const Category = require('./category.model');
const Brand = require('./brand.model');
const Size = require('./size.model');
const Collection = require('./collection.model');
const Shoe = require('./shoe.model');
const Order = require('./order.model');
const SizeDetail = require('./size-detail.model')

module.exports = {
    Server,
    User,
    Category,
    Brand,
    Size,
    Collection,
    Shoe,
    Order,
    SizeDetail
}
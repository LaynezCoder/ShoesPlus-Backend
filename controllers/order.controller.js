const { Order, ItemDetail, Shoe, User, SizeDetail } = require('../models');
const { mergeItems } = require('../helpers');

const createOrder = async(req, res) => {
    const { id } = req.user;

    const { firstname, lastname, phone, nit, address, reference_address, city, region, zip, express, reason, items } = req.body;

    const itemDetails = await ItemDetail.insertMany(items);
    const ids = itemDetails.map(i => i._id);

    const total = await getAmount(itemDetails, express);

    const data = { firstname, lastname, phone, nit, address, reference_address, city, region, zip, express, reason, items: ids, total };
    const order = new Order(data);

    await order.save();

    await User.findByIdAndUpdate(id, { $push: { orders: order.id } });

    await discountShoes(items)

    res.send({ ok: true, message: `Order successfully created, order id: ${order.id}`, order });
}

const getAmount = async(items = [], express) => {
    let total = 0;
    for (let item of items) {
        let find = await Shoe.findById(item.shoe);
        total += find.price * item.quantity;
    }

    if (express) {
        total += 250;
    }

    return total;
}

const discountShoes = async(items = []) => {
    const result = mergeItems(items);

    for (let i = 0; i < result.length; i++) {
        const id = result[i].size_detail;
        const subtract = result[i].quantity;

        await SizeDetail.findByIdAndUpdate(id, { $inc: { quantity: -subtract } });
    }
}

const cancelOrder = async(req, res) => {
    const { id: idUser } = req.user;
    const { id: idOrder } = req.params;

    const { id, status } = await Order.findById(idOrder);

    if (status === 'SUCCESS') {
        return res.status(400).send({ message: `The order with id ${id} has already been completed` })
    }

    if (status === 'CANCEL') {
        return res.status(400).send({ message: `The order with id ${id} has already been canceled previously` })
    }

    await returnShoes(idOrder);

    const order = await Order.findByIdAndUpdate(idOrder, { status: 'CANCEL' });

    await User.findByIdAndUpdate(idUser, { $pull: { orders: order.id } });

    res.send({ ok: true, message: `The order with id ${order.id} has been canceled` })
}

const returnShoes = async(idOrder) => {
    const { items } = await Order.findById(idOrder).populate('items');

    for (let i = 0; i < items.length; i++) {
        const id = items[i].size_detail;
        const add = items[i].quantity;

        await SizeDetail.findByIdAndUpdate(id, { $inc: { quantity: +add } });
    }
}

const deliverOrder = async(req, res) => {
    const { id } = req.params;

    const { status } = await Order.findById(id);

    if (status === 'SUCCESS') {
        return res.status(400).send({ message: `The order with id ${id} has already been completed` })
    }

    if (status === 'CANCEL') {
        return res.status(400).send({ message: `The order with id ${id} could not be completed` })
    }

    await Order.findByIdAndUpdate(id, { status: 'SUCCESS' })
    res.send({ ok: true, message: `The order with id ${id} has been delivered successfully` })
}

const getCompletedOrders = async(req, res) => {
    const orders = await Order.find({ status: 'SUCCESS' });
    res.send({ ok: true, total: orders.length, orders })
}

const getOnHoldOrders = async(req, res) => {
    const orders = await Order.find({ status: 'ON_HOLD' });
    res.send({ ok: true, total: orders.length, orders })
}

const getCanceledOrders = async(req, res) => {
    const orders = await Order.find({ status: 'CANCEL' });
    res.send({ ok: true, total: orders.length, orders })
}

const getItemsDetails = async(req, res) => {
    const { items } = req.body;

    const idShoes = items.map(i => i.shoe);
    const idSizeDetails = items.map(i => i.size_detail);

    const shoesFind = await SizeDetail.find({
        $and: [
            { _id: { $in: idSizeDetails } },
            { shoe: { $in: idShoes } }
        ]
    }).populate('shoe').populate('size');

    const shoes = shoesFind.map(sd => (sd.shoe));

    const sizeDetails = await SizeDetail.find({ _id: { $in: idSizeDetails } })
        .populate('size');

    res.send({ ok: true, shoes, sizeDetails })
}

module.exports = {
    createOrder,
    cancelOrder,
    deliverOrder,
    getItemsDetails,
    getCompletedOrders,
    getOnHoldOrders,
    getCanceledOrders
}
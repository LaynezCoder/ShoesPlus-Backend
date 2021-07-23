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

const getOrders = async(req, res) => {

}

module.exports = {
    createOrder,
    cancelOrder
}
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

    await User.findByIdAndUpdate(id, { $push: { orders: order.id } }, { new: true });

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
        const substract = result[i].quantity;

        await SizeDetail.findByIdAndUpdate(id, { $inc: { quantity: -substract } }, { new: true });
    }
}

module.exports = {
    createOrder,
}
const { Order, Shoe } = require('../models');

const createOrder = async(req, res) => {
    const {
        firstname,
        lastname,
        phone,
        nit,
        address,
        reference_address,
        city,
        region,
        zip,
        express,
        status,
        reason,
        items
    } = req.body;

    const find = await Shoe.find({ 'sizes': { $in: items } });
    console.log(find)
    console.log('Items: ', items)

    const data = { firstname, lastname, phone, nit, address, reference_address, city, region, zip, express, status, reason, items };
    const order = new Order(data);

    await order.save();

    res.send({ ok: true, message: 'Order created', order });
}

const test = (req, res) => {
    const one = [{ id: 1, quantity: 6 }, { id: 2, quantity: 5 }, { id: 3, quantity: 1 }]
    const two = [{ id: 1, quantity: 6 }, { id: 2, quantity: 5 }, { id: 3, quantity: 1 }]

    console.log('Comparing', JSON.stringify(one) === JSON.stringify(two));

    res.send({ ok: true });
}

module.exports = {
    createOrder,
    test
}
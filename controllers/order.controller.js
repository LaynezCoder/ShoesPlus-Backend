const { Order, ItemDetail, Shoe } = require('../models');

const createOrder = async(req, res) => {
    const { firstname, lastname, phone, nit, address, reference_address, city, region, zip, express, reason, items } = req.body;

    const itemDetails = await ItemDetail.insertMany(items);
    const ids = itemDetails.map(i => i._id);

    const total = await getAmount(itemDetails, express);

    const data = { firstname, lastname, phone, nit, address, reference_address, city, region, zip, express, reason, items: ids, total };
    const order = new Order(data);

    await order.save();

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

const findTest = async(req, res) => {
    const cart = [{
        shoe: '60f88b1d0ce2212c7c6be7ee',
        size: '60f88afb0ce2212c7c6be7e7',
        quantity: 15
    }]

    const find = await ItemDetail.find({ $or: cart });

    res.send({ find })
}

const test = (req, res) => {
    const one = [{ id: 1, quantity: 6 }, { id: 2, quantity: 5 }, { id: 3, quantity: 1 }]
    const two = [{ id: 1, quantity: 6 }, { id: 2, quantity: 5 }, { id: 3, quantity: 1 }]

    console.log('Comparing', JSON.stringify(one) === JSON.stringify(two));

    res.send({ ok: true });
}


module.exports = {
    createOrder,
    test,
    findTest
}
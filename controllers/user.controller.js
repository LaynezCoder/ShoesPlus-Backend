const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const { generateJWT, trim } = require('../helpers');

const createAdmin = async() => {
    const admin = 'admin';

    const find = await User.findOne({});

    if (find) return;

    const salt = bcryptjs.genSaltSync(10);
    const password = bcryptjs.hashSync(admin, salt);

    const data = { firstname: admin, lastname: admin, username: admin, password, email: 'admin@shoesplus.com', role: 'ADMIN' }
    const user = new User(data);

    await user.save();

    console.log('Admin created')
}

const signUp = async(req, res) => {
    const { firstname, lastname, username, password, email } = req.body;

    const user = new User({ firstname, lastname, username: trim(username), password, email, role: 'USER' });

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id);

    res.send({ ok: true, message: `User ${user.username} saved`, user, token });
}

const login = async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: trim(username), status: true })
        if (!user) {
            return res.status(400).send({ message: 'Wrong user and password' })
        }

        const validatePassword = bcryptjs.compareSync(password, user.password)

        if (!validatePassword) {
            return res.status(400).send({ message: 'Wrong user and password' })
        }

        const token = await generateJWT(user.id)

        res.send({ ok: true, user, token })

    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' })
    }
}

const updateProfile = async(req, res) => {
    const { id } = req.user;

    const { firstname, lastname, username, password, email } = req.body;

    const find = await User.findOne({ username });

    if (find) {
        if (id != find.id) {
            return res.status(400).send({ message: `The username ${username} already exists` });
        }
    }

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    const user = await User.findByIdAndUpdate(id, { firstname, lastname, username: trim(username), password: hash, email }, { new: true });

    res.send({ ok: true, message: 'Updated profile', user })
}

const deleteProfile = async(req, res) => {
    const { id } = req.user;
    const { password } = req.body;

    const find = await User.findById(id);

    if (find.role === 'ADMIN') {
        return res.status(400).send({ message: 'You can not do this' })
    }

    const validatePassword = bcryptjs.compareSync(password, find.password)

    if (!validatePassword) {
        return res.status(400).send({ message: 'Wrong user and password' })
    }

    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

    res.send({ ok: true, user });
}

module.exports = {
    createAdmin,
    signUp,
    login,
    updateProfile,
    deleteProfile
}
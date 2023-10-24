import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (decoded.id === req.params.id) {
                next();
            } else {
                res.status(400).json('Token inválido, não autorizado.');
            }
        } catch (error) {
            res.status(400).json('Token inválido, não autorizado.');
        }
    } else {
        res.status(400).json('Token não fornecido ou em formato inválido.');
    }
};

export default protect;

import mongoose from 'mongoose';

const userSaldoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    saldo: Number,
});

const UserSaldo = mongoose.model('UserSaldo', userSaldoSchema);

export default UserSaldo;

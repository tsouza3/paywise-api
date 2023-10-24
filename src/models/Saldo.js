import mongoose from 'mongoose';

const saldoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    saldo: String,
    descricao: String,
    valor: Number,
})

const Saldo = mongoose.model('Saldo', saldoSchema);

export default Saldo;
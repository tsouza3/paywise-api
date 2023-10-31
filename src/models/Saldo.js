import mongoose from 'mongoose';

const saldoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    descricao: String,
    valor: Number,
    categoria: String
})

const Saldo = mongoose.model('Saldo', saldoSchema);

export default Saldo;
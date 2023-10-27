import UserSaldo from '../models/userSaldo.js';
import Saldo from '../models/Saldo.js';

export async function addEntrada(req, res) {
    try {
        const { descricao, valor } = req.body;
        const userId = req.user._id;

        const novaEntrada = new Saldo({
            user: userId,
            descricao,
            valor,
        });

        const entradaSalva = await novaEntrada.save();

        const userSaldo = await UserSaldo.findOne({ user: userId });
        if (userSaldo) {
            userSaldo.saldo += valor;
            await userSaldo.save();
        }

        res.status(201).json(entradaSalva);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar nova entrada' });
    }
}

export async function addDespesa(req, res) {
    try {
        const { descricao, valor } = req.body;
        const userId = req.user._id;

        const novaDespesa = new Saldo({
            user: userId,
            descricao,
            valor: -valor, 
        });

        const despesaSalva = await novaDespesa.save();

        const userSaldo = await UserSaldo.findOne({ user: userId });
        if (userSaldo) {
            userSaldo.saldo -= valor; 
            await userSaldo.save();
        }

        res.status(201).json(despesaSalva);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar nova despesa' });
    }
}

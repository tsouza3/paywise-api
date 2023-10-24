import Saldo from '../models/Saldo.js';

export async function addEntrada(req, res) {
    try {
        const { descricao, valor } = req.body;
        const userId = req.user._id;

        const novoSaldo = new Saldo({
            user: userId,
            descricao,
            valor,
        });

        const saldoSalvo = await novoSaldo.save();

        res.status(201).json(saldoSalvo);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar nova entrada' });
    }
}

export async function addDespesa(req, res) {
    try {
        const { descricao, valor } = req.body;
        const userId = req.user._id;

        const novoSaldo = new Saldo({
            user: userId,
            descricao,
            valor: -valor, 
        });

        const saldoSalvo = await novoSaldo.save();

        res.status(201).json(saldoSalvo);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar nova despesa' });
    }
}

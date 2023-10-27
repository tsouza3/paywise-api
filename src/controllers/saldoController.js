import UserSaldo from '../models/userSaldo.js';

export async function getSaldoUsuario(req, res) {
    try {
        const userId = req.user._id;

        const userSaldo = await UserSaldo.findOne({ user: userId });

        if (!userSaldo) {
            return res.status(404).json({ error: 'Saldo do usuário não encontrado' });
        }

        res.status(200).json({ saldo: userSaldo.saldo });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o saldo do usuário' });
    }
}

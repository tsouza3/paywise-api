import UserSaldo from "../models/userSaldo.js";
import Saldo from "../models/Saldo.js";

const categorias = [
  "alimentacao",
  "lazer",
  "saude",
  "moradia",
  "vestuario",
  "transporte",
  "educacao",
  "poupanca",
  "entretenimento",
];

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
    res.status(400).json({ error: "Erro ao adicionar nova entrada" });
  }
}

export async function addDespesa(req, res) {
  try {
    const { descricao, valor, categoria } = req.body;
    const userId = req.user._id;

    if (!categorias.includes(categoria)) {
      return res.status(400).json({ error: "Classificação inválida" });
    }

    const novaDespesa = new Saldo({
      user: userId,
      descricao,
      valor: -valor,
      categoria,
    });

    const despesaSalva = await novaDespesa.save();

    const userSaldo = await UserSaldo.findOne({ user: userId });
    if (userSaldo) {
      userSaldo.saldo -= valor;
      await userSaldo.save();
    }

    res.status(201).json(despesaSalva);
  } catch (error) {
    res.status(400).json({ error: "Erro ao adicionar nova despesa" });
  }
}

export async function gastosPorCategoria(req, res) {
  try {
    const { categoria } = req.params;
    const userId = req.user.id;
    const { dias } = req.query;

    if (!categoria || !userId) {
      return res.status(400).json({ error: "Categoria ou ID inválidos" });
    }

    let filtroData = {};
    if (dias) {
      const dataLimite = new Date();
      dataLimite.setDate(dataLimite.getDate() - parseInt(dias, 10));
      filtroData = { createdAt: { $gte: dataLimite } };

      console.log(dias)
    }

    const entradas = await Saldo.find({ user: userId, categoria, ...filtroData });

    const valorTotalGasto = entradas.reduce((total, entrada) => {
      return total + entrada.valor;
    }, 0);

    res.status(200).json({ entradas, valorTotalGasto });
  } catch (error) {
    console.error("Erro ao buscar gastos por categoria:", error);
    res.status(500).json({ error: "Erro ao buscar gastos por categoria" });
  }
}

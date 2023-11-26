import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import UserSaldo from "../models/userSaldo.js";

export async function create(req, res) {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ error: "Usuário já existe." });
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    await UserSaldo.create({ user: user._id, saldo: 0 });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar o usuário." });
  }
}

export async function update(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    const updateUser = await user.save();
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "E-mail ou senha inválidos" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

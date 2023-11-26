import express from "express";

import { create } from "../controllers/User.js";
import { login } from "../controllers/User.js";
import { update } from "../controllers/User.js";

import protect from "../middlewares/auth.js";

import { addEntrada } from "../controllers/Saldo.js";
import { addDespesa } from "../controllers/Saldo.js";
import { entradasPorCategoria } from "../controllers/Saldo.js";
import { gastosPorCategoria } from "../controllers/Saldo.js";

import { getSaldoUsuario } from "../controllers/saldoController.js";

const router = express.Router();

router.route("/").post(create);
router.route("/login").post(login);
router.route("/:id").put(protect, update);

router.route("/add/entrada/").post(protect, addEntrada);
router.route("/add/gasto/").post(protect, addDespesa);

router.route("/entrada/:categoria/:id").get(protect, entradasPorCategoria);
router.route("/gasto/:categoria/:id").get(protect, gastosPorCategoria);

router.route("/saldo").get(protect, getSaldoUsuario);

export default router;

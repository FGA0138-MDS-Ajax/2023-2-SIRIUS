"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/Rodadas/RodadaController.ts
var RodadaController_exports = {};
__export(RodadaController_exports, {
  RodadaController: () => RodadaController
});
module.exports = __toCommonJS(RodadaController_exports);

// client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var client_default = prisma;

// src/controllers/Rodadas/RodadaController.ts
var RodadaController = class {
  async create({ torneioID, numeroRodada }) {
    if (!torneioID) {
      return null;
    }
    const newRodadas = await client_default.rodada.create({
      data: { torneioID, numeroRodada }
    });
    if (!newRodadas) {
      return null;
    }
    return newRodadas;
  }
  // Método para Deleção dos Rodadas na DataBase.
  async delete(id) {
    if (!id) {
      return null;
    }
    const rodada = await client_default.rodada.findUnique({ where: { id } });
    if (!rodada) {
      return null;
    }
    const deletedRodada = await client_default.rodada.delete({ where: { id } });
    return deletedRodada;
  }
  async getRodadas(req, res) {
    const rodadas = await client_default.rodada.findMany();
    if (!rodadas) {
      return res.status(400).send("Nenhuma rodada encontrado!");
    }
    return res.status(200).json(rodadas);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RodadaController
});

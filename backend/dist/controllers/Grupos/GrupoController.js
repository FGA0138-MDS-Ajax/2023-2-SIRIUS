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

// src/controllers/Grupos/GrupoController.ts
var GrupoController_exports = {};
__export(GrupoController_exports, {
  GrupoController: () => GrupoController
});
module.exports = __toCommonJS(GrupoController_exports);

// client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var client_default = prisma;

// src/controllers/Grupos/GrupoController.ts
var GrupoController = class {
  async create(rodadaID) {
    if (!rodadaID) {
      return null;
    }
    const newGrupo = await client_default.grupo.create({
      data: { rodadaID }
    });
    if (!newGrupo) {
      return null;
    }
    return newGrupo;
  }
  calcularQuantidadeGrupos(Num_checkin) {
    if (Num_checkin < 16) {
      throw new Error("Erro ao calcular a quantidade de grupos.");
    }
    switch (Num_checkin) {
      case 17:
        return { jogadoresPorGrupo: [6, 6, 5] };
      case 18:
        return { jogadoresPorGrupo: [6, 6, 6] };
      case 19:
        return { jogadoresPorGrupo: [7, 6, 6] };
      case 20:
        return { jogadoresPorGrupo: [7, 7, 6] };
      case 21:
        return { jogadoresPorGrupo: [7, 7, 7] };
      case 25:
        return { jogadoresPorGrupo: [7, 6, 6, 6] };
      case 26:
        return { jogadoresPorGrupo: [7, 7, 6, 6] };
      case 27:
        return { jogadoresPorGrupo: [7, 7, 7, 6] };
      case 28:
        return { jogadoresPorGrupo: [7, 7, 7, 7] };
      case 33:
        return { jogadoresPorGrupo: [7, 7, 7, 6, 6] };
      case 34:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 6] };
      case 35:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 7] };
      case 41:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 6, 6] };
      case 42:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 7, 7] };
      case 49:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 7, 7, 7] };
      default:
        if (Num_checkin % 8 === 0) {
          const quantidade = Num_checkin / 8;
          return { jogadoresPorGrupo: Array(quantidade).fill(8) };
        } else {
          const gruposCom7 = 8 - Num_checkin % 8;
          const gruposTotais = (Num_checkin + gruposCom7) / 8;
          let gruposCom8 = gruposTotais - gruposCom7;
          const jogadoresPorGrupo = Array(gruposCom7).fill(7);
          while (gruposCom8--) {
            jogadoresPorGrupo.push(8);
          }
          return { jogadoresPorGrupo };
        }
    }
  }
  calcularQuantidadeGruposHandler(req, res) {
    const { Num_checkin } = req.params;
    try {
      const { jogadoresPorGrupo } = this.calcularQuantidadeGrupos(+Num_checkin);
      res.status(200).json({ jogadoresPorGrupo });
    } catch (error) {
      res.status(400).json({ error: "Erro ao calcular a quantidade de grupos." });
    }
  }
  async getGrupos(req, res) {
    const grupo = await client_default.grupo.findMany();
    if (!grupo) {
      return res.status(400).send("Nenhum grupo encontrado!");
    }
    return res.status(200).json(grupo);
  }
  async searchByID(id) {
    try {
      const grupo = await client_default.grupo.findUnique({ where: { id } });
      if (!grupo) {
        return null;
      }
      return grupo;
    } catch (error) {
      console.error("Error searching grupo:", error);
      return null;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GrupoController
});

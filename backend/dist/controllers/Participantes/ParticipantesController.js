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

// src/controllers/Participantes/ParticipantesController.ts
var ParticipantesController_exports = {};
__export(ParticipantesController_exports, {
  ParticipantesController: () => ParticipantesController
});
module.exports = __toCommonJS(ParticipantesController_exports);

// client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var client_default = prisma;

// src/controllers/Participantes/ParticipantesController.ts
var ParticipantesController = class {
  async create(participantesData) {
    try {
      const createdParticipantes = await client_default.participante.createMany({
        data: participantesData,
        skipDuplicates: true
      });
      if (!createdParticipantes || createdParticipantes.count === 0) {
        return null;
      }
      return createdParticipantes;
    } catch (error) {
      console.error("Error creating participants:", error);
      return null;
    }
  }
  async searchByInGameName(inGameName) {
    try {
      const participante = await client_default.participante.findUnique({ where: { inGameName } });
      if (!participante) {
        return null;
      }
      return participante;
    } catch (error) {
      console.error("Error searching participante:", error);
      return null;
    }
  }
  async getParticipantes(req, res) {
    const participantes = await client_default.participante.findMany();
    if (!participantes) {
      return res.status(400).send("Nenhum participante encontrado!");
    }
    return res.status(200).json(participantes);
  }
  async searchByID(id) {
    try {
      const participante = await client_default.participante.findUnique({ where: { id } });
      if (!participante) {
        return null;
      }
      return participante;
    } catch (error) {
      console.error("Error searching participante:", error);
      return null;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ParticipantesController
});

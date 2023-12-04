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

// src/controllers/ParticipanteEmGrupo/ParticipanteEmGrupoController.ts
var ParticipanteEmGrupoController_exports = {};
__export(ParticipanteEmGrupoController_exports, {
  ParticipanteEmGrupoController: () => ParticipanteEmGrupoController
});
module.exports = __toCommonJS(ParticipanteEmGrupoController_exports);

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

// src/controllers/Torneio/TorneioController.ts
var TorneioController = class {
  async create(nome, participantesData) {
    console.log(nome, participantesData.length);
    const TorneioNameExists = await client_default.torneio.findUnique({ where: { nome } });
    if (TorneioNameExists) {
      return null;
    }
    const newTorneio = await client_default.torneio.create({
      data: { nome }
    });
    console.log("criou torneio", newTorneio);
    if (!newTorneio) {
      return null;
    }
    const rodadaController = new RodadaController();
    const newRodada = await rodadaController.create({ torneioID: newTorneio.id, numeroRodada: "UM" /* UM */ });
    console.log("criou rodada", newRodada);
    if (!newRodada) {
      return null;
    }
    const grupoController = new GrupoController();
    for (let i = 0; i < participantesData.length; i++) {
      const newGrupo = await grupoController.create(newRodada.id);
      console.log("criou grupo", newGrupo);
      if (!newGrupo) {
        return null;
      }
      const participantesCriado = await new ParticipantesController().create(participantesData[i]);
      console.log("criou participantes", participantesCriado);
      if (!participantesCriado) {
        return null;
      }
      const participantes = participantesData[i].map((participante) => {
        return {
          participanteID: participante.id,
          numeroRodada: "UM" /* UM */,
          grupoID: newGrupo.id,
          torneioID: newTorneio.id
        };
      });
      console.log("criou vetor de participantes", participantes.length);
      const participantesEmGrupoCriado = await new ParticipanteEmGrupoController().create(participantes);
      console.log("criou participantes em grupo", participantesEmGrupoCriado);
      if (!participantesEmGrupoCriado) {
        return null;
      }
    }
    return newTorneio;
  }
  async searchByName(nome) {
    try {
      if (!nome) {
        return null;
      }
      const torneio = await client_default.torneio.findUnique({ where: { nome } });
      if (!torneio) {
        return null;
      }
      return torneio;
    } catch (error) {
      console.error("Error searching torneio:", error);
      return null;
    }
  }
  async getTorneios(req, res) {
    const torneios = await client_default.torneio.findMany(req.body);
    if (!torneios.length) {
      return res.status(400).send("Nenhum torneio encontrado!");
    }
    return res.status(200).json(torneios);
  }
};

// src/controllers/ParticipanteEmGrupo/ParticipanteEmGrupoController.ts
var ParticipanteEmGrupoController = class {
  async create(participantesEmGrupoData) {
    try {
      if (!participantesEmGrupoData) {
        return null;
      }
      const createdParticipantes = await client_default.participanteEmGrupo.createMany({
        data: participantesEmGrupoData,
        skipDuplicates: true
      });
      if (!createdParticipantes || createdParticipantes.count === 0) {
        return null;
      }
      return createdParticipantes;
    } catch (error) {
      return null;
    }
  }
  async searchGruposDeParticipante(participantesEmGrupoData) {
    const torneioController = new TorneioController();
    const participantesController = new ParticipantesController();
    const torneio = await torneioController.searchByName(participantesEmGrupoData.nomeTorneio);
    if (!torneio) {
      return null;
    }
    const participantes = await participantesController.searchByInGameName(participantesEmGrupoData.inGameName);
    if (!participantes) {
      return null;
    }
    const grupos = await client_default.participanteEmGrupo.findMany({
      where: {
        torneioID: torneio.id,
        participanteID: participantes.id,
        numeroRodada: participantesEmGrupoData.numeroRodada
      }
    });
    if (!grupos) {
      return null;
    }
    const grupoID = grupos[0].grupoID;
    return await client_default.participanteEmGrupo.findMany({
      where: {
        grupoID
      }
    });
  }
  async getParticipantesEmGrupo(req, res) {
    const participantesEmGrupo = await client_default.participanteEmGrupo.findMany();
    if (!participantesEmGrupo) {
      return res.status(400).send("Nenhum participante encontrado!");
    }
    return res.status(200).json(participantesEmGrupo);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ParticipanteEmGrupoController
});

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

// src/controllers/CSV/CSVController.ts
var CSVController_exports = {};
__export(CSVController_exports, {
  CSVController: () => CSVController
});
module.exports = __toCommonJS(CSVController_exports);
var CSVController = class {
  /**
   * Método para Trabalhar o Arquivo .CSV e retornar um JSON para o FrontEnd.
   */
  async importCSV(req, res) {
    try {
      const { fileContents } = req.body;
      if (!fileContents) {
        return res.status(400).send("CSV Vazio");
      }
      const csvContents = this.parseCSV(fileContents);
      if (!csvContents) {
        return res.status(400).send("CSV Inv\xE1lido");
      }
      const arrord = this.fillArray(csvContents);
      const csvRandom = this.arrayToCSV(arrord);
      const chaves = this.extractKeys(csvRandom);
      const jsonRetorno = this.generateJSONData(csvRandom, chaves);
      return res.json(jsonRetorno);
    } catch (error) {
      return res.status(500).send("Erro no Processamento do CSV");
    }
  }
  parseCSV(fileContents) {
    try {
      if (!fileContents) {
        return null;
      }
      return fileContents.replaceAll('"', "").split("\n");
    } catch (error) {
      return null;
    }
  }
  extractKeys(csvContents) {
    if (csvContents.length > 0) {
      return csvContents.shift().split(",").map((chave) => {
        if (chave.includes("userID"))
          return "id";
        if (chave.includes("ID Discord"))
          return "discordID";
        if (chave.includes("Email"))
          return "email";
        return chave;
      });
    }
    return [];
  }
  fillArray(csvContents) {
    const arrayord = [];
    csvContents.forEach((linha) => {
      const colunas = linha.split(",");
      arrayord.push(colunas);
    });
    this.shuffleArray(arrayord);
    return arrayord;
  }
  shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
  }
  arrayToCSV(array) {
    const csvRows = [];
    this.moveSubarrayToFirstPosition(array, ["teamName", "inGameName", "checkedInAt", "userID", "ID Discord (Exemplo#1234)", "Email de Contato"]);
    for (const row of array) {
      const csvRow = row.map((value) => `${value}`).join(",");
      csvRows.push(csvRow);
    }
    return csvRows;
  }
  moveSubarrayToFirstPosition(array, subarrayToMove) {
    const index = array.findIndex((subarray) => {
      return subarray.every((value, i) => value === subarrayToMove[i]);
    });
    if (index > -1) {
      const removedSubarray = array.splice(index, 1)[0];
      array.unshift(removedSubarray);
    }
    return array;
  }
  generateJSONData(csvContents, chaves) {
    return csvContents.map((linha) => {
      const valores = linha.split(",");
      const dados = {};
      chaves.forEach((chave, i) => {
        dados[chave] = valores[i];
      });
      return dados;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CSVController
});

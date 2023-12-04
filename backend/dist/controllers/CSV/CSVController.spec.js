"use strict";

// src/controllers/CSV/CSVController.ts
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

// src/controllers/CSV/CSVController.spec.ts
describe("Testes unit\xE1rios para o CSV Controller", () => {
  let csvController;
  let req;
  let res;
  beforeEach(() => {
    csvController = new CSVController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
  });
  describe("importCSV", () => {
    it("should return 400 if fileContents is not provided", async () => {
      req.body = { fileContents: "" };
      await csvController.importCSV(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("CSV Vazio");
    });
    it("should return 400 if csvContents is invalid", async () => {
      req.body = { fileContents: 1 };
      await csvController.importCSV(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("CSV Inv\xE1lido");
    });
    it("should return JSON data if csvContents is valid", async () => {
      req.body = { fileContents: "valid csv" };
      const expectedJSON = [
        { key1: "value1", key2: "value2" },
        { key1: "value3", key2: "value4" }
        // Adicione mais objetos conforme necessário
      ];
      jest.spyOn(csvController, "parseCSV").mockReturnValue(["valid csv"]);
      jest.spyOn(csvController, "extractKeys").mockReturnValue(["key1", "key2"]);
      jest.spyOn(csvController, "generateJSONData").mockReturnValue(expectedJSON);
      await csvController.importCSV(req, res);
      expect(res.json).toHaveBeenCalledWith(expectedJSON);
    });
    it("should return 500 if an error occurs", async () => {
      req.body = { fileContents: "valid csv" };
      jest.spyOn(csvController, "parseCSV").mockImplementation(() => {
        throw new Error("parse error");
      });
      await csvController.importCSV(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Erro no Processamento do CSV");
    });
  });
});

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.3.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://github.com/motdotla/dotenv?sponsor=1",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        throw new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        throw new Error("INVALID_DOTENV_KEY: Missing key part");
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        throw new Error("INVALID_DOTENV_KEY: Missing environment part");
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      if (options && options.path && options.path.length > 0) {
        dotenvPath = options.path;
      }
      return dotenvPath.endsWith(".vault") ? dotenvPath : `${dotenvPath}.vault`;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        let processEnv = process.env;
        if (options && options.processEnv != null) {
          processEnv = options.processEnv;
        }
        DotenvModule.populate(processEnv, parsed, options);
        return { parsed };
      } catch (e) {
        if (debug) {
          _debug(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    function config(options) {
      const vaultPath = _vaultPath(options);
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      if (!fs.existsSync(vaultPath)) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.slice(0, 12);
      const authTag = ciphertext.slice(-16);
      ciphertext = ciphertext.slice(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const msg = "INVALID_DOTENV_KEY: It must be 64 characters long (or more)";
          throw new Error(msg);
        } else if (decryptionFailed) {
          const msg = "DECRYPTION_FAILED: Please check your DOTENV_KEY";
          throw new Error(msg);
        } else {
          console.error("Error: ", error.code);
          console.error("Error: ", error.message);
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module2) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module2.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module2) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;
    module2.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// src/index.ts
var import_express2 = __toESM(require("express"));
var import_client11 = require("@prisma/client");

// src/routes.ts
var import_express = require("express");

// src/controllers/Users/UsersController.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var client_default = prisma;

// src/controllers/Users/UsersController.ts
var UserController = class {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userExists = await client_default.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).send("E-mail j\xE1 existe");
    }
    const hashPassword = await import_bcrypt.default.hash(password, 10);
    const newUser = await client_default.user.create({
      data: {
        name,
        email,
        password: hashPassword
      }
    });
    const { password: _, ...user } = newUser || {};
    return res.status(201).json(user);
  }
  async login(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await client_default.user.findUnique({ where: { email } });
    const varios = await client_default.user.findMany();
    console.log(user);
    console.log(varios);
    if (!user) {
      return res.status(400).send("E-mail ou senha inv\xE1lidos");
    }
    const verifyPass = await import_bcrypt.default.compare(password, user.password);
    console.log(verifyPass);
    if (!verifyPass) {
      return res.status(400).send("E-mail ou senha inv\xE1lidos");
    }
    const token = import_jsonwebtoken.default.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "7d"
    });
    const { password: _, ...userLogin } = user;
    return res.json({
      user: userLogin,
      token
    });
  }
  async getProfile(req, res) {
    return res.status(200).json(req.user);
  }
  async delete(req, res) {
    const { id } = req.params;
    const user = await client_default.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(400).send("Usu\xE1rio n\xE3o encontrado");
    }
    await client_default.user.delete({ where: { id } });
    return res.status(200).send("Usu\xE1rio deletado com sucesso");
  }
};

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

// src/controllers/VencedorGrupo/VencedorGrupoController.ts
var VencedorGrupoController = class {
  async create(dadosVencedor) {
    const { grupoID, participanteID, posicao } = dadosVencedor;
    const grupoExiste = await new GrupoController().searchByID(grupoID);
    if (!grupoExiste)
      return null;
    const participanteExiste = await new ParticipantesController().searchByID(participanteID);
    if (!participanteExiste)
      return null;
    const newVencedorGrupo = await client_default.vencedorGrupo.create({
      data: { grupoID, participanteID, posicao }
    });
    if (!newVencedorGrupo) {
      return null;
    }
    return newVencedorGrupo;
  }
  async createVariosVencedores(dadosVencedores) {
    try {
      const createdVencedores = await client_default.vencedorGrupo.createMany({
        data: dadosVencedores,
        skipDuplicates: true
      });
      return createdVencedores;
    } catch (error) {
      console.error("Erro ao definir vencedores:", error);
      return null;
    }
  }
  async getVencedoresByGrupoID(grupoID) {
    const vencedores = await client_default.vencedorGrupo.findMany({
      where: {
        grupoID
      }
    });
    return vencedores;
  }
};

// src/controllers/VencedorTorneio/VencedorTorneioController.ts
var VencedorTorneioController = class {
  async createVariosVencedores(dadosVencedores) {
    try {
      const createdVencedores = await client_default.vencedorTorneio.createMany({
        data: dadosVencedores,
        skipDuplicates: true
      });
      return createdVencedores;
    } catch (error) {
      console.error("Erro ao definir vencedores do torneio:", error);
      return null;
    }
  }
  async getVencedoresByTorneioID(torneioID) {
    const vencedores = await client_default.vencedorTorneio.findMany({
      where: {
        torneioID
      }
    });
    return vencedores;
  }
};

// src/middlewares/authMiddleware.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_client10 = require("@prisma/client");
var prisma2 = new import_client10.PrismaClient();
var authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Token not authorized" });
  }
  const token = authorization.split(" ")[1];
  const { id } = import_jsonwebtoken2.default.verify(token, process.env.JWT_PASS ?? "");
  const user = await prisma2.user.findUnique({ where: { id } });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  const { password: _, ...loggedUser } = user;
  req.user = loggedUser;
  next();
};

// src/routes.ts
var routes = (0, import_express.Router)();
routes.get("/", (req, res) => {
  res.send("Hello World! Voc\xEA est\xE1 na raiz da API!");
});
routes.post("/participantesEmGrupo/search", async (req, res) => {
  const participanteEmGrupoController = new ParticipanteEmGrupoController();
  const playerEmGrupo = req.body;
  const participantesEmGrupo = await participanteEmGrupoController.searchGruposDeParticipante(playerEmGrupo);
  if (!participantesEmGrupo) {
    return res.status(400).send("Erro ao buscar participantes de um grupo");
  }
  return res.status(200).json(participantesEmGrupo);
});
routes.post("/users/create", new UserController().create);
routes.post("/login", new UserController().login);
routes.use(authMiddleware);
routes.get("/profile", new UserController().getProfile);
routes.post("/csv", (req, res) => {
  const csvController = new CSVController();
  return csvController.importCSV(req, res);
});
routes.post("/torneios/create", async (req, res) => {
  const torneioController = new TorneioController();
  const nome = req.body.nome;
  const grupos = req.body.grupos;
  const newTorneio = await torneioController.create(nome, grupos);
  if (!newTorneio) {
    return res.status(400).send("Erro ao criar torneio");
  }
  return res.status(200).json(newTorneio);
});
routes.post("/torneios/search", async (req, res) => {
  const torneioController = new TorneioController();
  const nome = req.body.nome;
  const torneio = await torneioController.searchByName(nome);
  if (!torneio) {
    return res.status(400).send("Erro ao buscar torneio");
  }
  return res.status(200).json(torneio);
});
routes.get("/torneios", new TorneioController().getTorneios);
routes.post("/rodadas/create", async (req, res) => {
  const rodadaController = new RodadaController();
  const torneioID = req.body.torneioID;
  const numeroRodada = req.body.numeroRodada;
  const newRodada = await rodadaController.create({ torneioID, numeroRodada });
  if (!newRodada) {
    return res.status(400).send("Erro ao criar rodada");
  }
  return res.status(200).json(newRodada);
});
routes.get("/rodadas", new RodadaController().getRodadas);
routes.get("/grupos/quantidade/:Num_checkin", (req, res) => {
  const grupoController = new GrupoController();
  return grupoController.calcularQuantidadeGruposHandler(req, res);
});
routes.post("/grupos/create", async (req, res) => {
  const grupoController = new GrupoController();
  const rodadaID = req.body.rodadaID;
  const newGrupo = await grupoController.create(rodadaID);
  if (!newGrupo) {
    return res.status(400).send("Erro ao criar grupo");
  }
  return res.status(200).json(newGrupo);
});
routes.get("/grupos", new GrupoController().getGrupos);
routes.post("/participantes/create", async (req, res) => {
  const participantesController = new ParticipantesController();
  const participantes = req.body.participantes;
  const newParticipantes = await participantesController.create(participantes);
  if (!newParticipantes) {
    return res.status(400).send("Erro ao criar participantes");
  }
  return res.status(200).json(newParticipantes);
});
routes.post("/participantes/search", async (req, res) => {
  const participantesController = new ParticipantesController();
  const inGameName = req.body.inGameName;
  const participante = await participantesController.searchByInGameName(inGameName);
  if (!participante) {
    return res.status(400).send("Erro ao buscar participante");
  }
  return res.status(200).json(participante);
});
routes.get("/participantes", new ParticipantesController().getParticipantes);
routes.post("/participantesEmGrupo/create", async (req, res) => {
  const participanteEmGrupoController = new ParticipanteEmGrupoController();
  const participantesEmGrupo = req.body.participanteEmGrupo;
  const newParticipantesEmGrupo = await participanteEmGrupoController.create(participantesEmGrupo);
  if (!newParticipantesEmGrupo) {
    return res.status(400).send("Erro ao criar participantes");
  }
  return res.status(200).json(newParticipantesEmGrupo);
});
routes.get("/participantesEmGrupo", new ParticipanteEmGrupoController().getParticipantesEmGrupo);
routes.post("/vencedores/grupo", async (req, res) => {
  const vencedorGrupoController = new VencedorGrupoController();
  const vencedoresGrupo = req.body.vencedores;
  const newVencedor = await vencedorGrupoController.createVariosVencedores(vencedoresGrupo);
  if (!newVencedor) {
    return res.status(400).send("Erro ao definir vencedores de grupo");
  }
  return res.status(200).json(newVencedor);
});
routes.post("/vencedores/torneio", async (req, res) => {
  const vencedorTorneioController = new VencedorTorneioController();
  const vencedoresTorneio = req.body.vencedores;
  const newVencedor = await vencedorTorneioController.createVariosVencedores(vencedoresTorneio);
  if (!newVencedor) {
    return res.status(400).send("Erro ao definir vencedores de torneio");
  }
  return res.status(200).json(newVencedor);
});
routes.get("/vencedores/torneio/:torneioID", async (req, res) => {
  const vencedorTorneioController = new VencedorTorneioController();
  const torneioID = req.params.torneioID;
  const vencedores = await vencedorTorneioController.getVencedoresByTorneioID(torneioID);
  if (!vencedores) {
    return res.status(400).send("Erro ao buscar vencedores de torneio");
  }
  return res.status(200).json(vencedores);
});
routes.get("/vencedores/grupo/:grupoID", async (req, res) => {
  const vencedorGrupoController = new VencedorGrupoController();
  const grupoID = req.params.grupoID;
  const vencedores = await vencedorGrupoController.getVencedoresByGrupoID(grupoID);
  if (!vencedores) {
    return res.status(400).send("Erro ao buscar vencedores de grupo");
  }
  return res.status(200).json(vencedores);
});

// node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/index.ts
var import_cors = __toESM(require("cors"));
var prisma3 = new import_client11.PrismaClient();
var startServer = async () => {
  const app = (0, import_express2.default)();
  app.use((0, import_cors.default)());
  app.use(import_express2.default.json());
  app.use(routes);
  app.listen(process.env.PORT ? Number(process.env.PORT) : 3e3, () => {
    console.log(`HTTP Server Running in PORT:${process.env.PORT ? Number(process.env.PORT) : 3e3}`);
  });
};
startServer().catch((error) => console.log(error)).finally(async () => {
  await prisma3.$disconnect();
});

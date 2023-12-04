"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/Users/UsersController.ts
var UsersController_exports = {};
__export(UsersController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(UsersController_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});

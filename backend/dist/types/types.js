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

// src/types/types.ts
var types_exports = {};
__export(types_exports, {
  EnumRodada: () => EnumRodada,
  EnumVencedorPosicao: () => EnumVencedorPosicao
});
module.exports = __toCommonJS(types_exports);
var EnumRodada = /* @__PURE__ */ ((EnumRodada2) => {
  EnumRodada2["UM"] = "UM";
  EnumRodada2["DOIS"] = "DOIS";
  EnumRodada2["TRES"] = "TRES";
  EnumRodada2["SEMIFINAL"] = "SEMIFINAL";
  EnumRodada2["FINAL"] = "FINAL";
  return EnumRodada2;
})(EnumRodada || {});
var EnumVencedorPosicao = /* @__PURE__ */ ((EnumVencedorPosicao2) => {
  EnumVencedorPosicao2["PRIMEIRO"] = "PRIMEIRO";
  EnumVencedorPosicao2["SEGUNDO"] = "SEGUNDO";
  EnumVencedorPosicao2["TERCEIRO"] = "TERCEIRO";
  EnumVencedorPosicao2["QUARTO"] = "QUARTO";
  return EnumVencedorPosicao2;
})(EnumVencedorPosicao || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EnumRodada,
  EnumVencedorPosicao
});

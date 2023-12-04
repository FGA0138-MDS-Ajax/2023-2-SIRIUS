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

// node_modules/jest-mock-extended/lib/Matchers.js
var require_Matchers = __commonJS({
  "node_modules/jest-mock-extended/lib/Matchers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matches = exports.captor = exports.notEmpty = exports.notUndefined = exports.notNull = exports.objectContainsValue = exports.objectContainsKey = exports.mapHas = exports.setHas = exports.arrayIncludes = exports.isA = exports.anySet = exports.anyMap = exports.anyArray = exports.anyObject = exports.anySymbol = exports.anyFunction = exports.anyString = exports.anyNumber = exports.anyBoolean = exports.any = exports.CaptorMatcher = exports.Matcher = void 0;
    var Matcher = class {
      constructor(asymmetricMatch, description) {
        this.asymmetricMatch = asymmetricMatch;
        this.description = description;
        this.$$typeof = Symbol.for("jest.asymmetricMatcher");
      }
      toString() {
        return this.description;
      }
      toAsymmetricMatcher() {
        return this.description;
      }
      getExpectedType() {
        return "undefined";
      }
    };
    exports.Matcher = Matcher;
    var CaptorMatcher = class {
      constructor() {
        this.values = [];
        this.$$typeof = Symbol.for("jest.asymmetricMatcher");
        this.asymmetricMatch = (actualValue) => {
          this.value = actualValue;
          this.values.push(actualValue);
          return true;
        };
      }
      getExpectedType() {
        return "Object";
      }
      toString() {
        return "captor";
      }
      toAsymmetricMatcher() {
        return "captor";
      }
    };
    exports.CaptorMatcher = CaptorMatcher;
    var any = () => new Matcher(() => true, "any()");
    exports.any = any;
    var anyBoolean = () => new Matcher((actualValue) => typeof actualValue === "boolean", "anyBoolean()");
    exports.anyBoolean = anyBoolean;
    var anyNumber = () => new Matcher((actualValue) => typeof actualValue === "number" && !isNaN(actualValue), "anyNumber()");
    exports.anyNumber = anyNumber;
    var anyString = () => new Matcher((actualValue) => typeof actualValue === "string", "anyString()");
    exports.anyString = anyString;
    var anyFunction = () => new Matcher((actualValue) => typeof actualValue === "function", "anyFunction()");
    exports.anyFunction = anyFunction;
    var anySymbol = () => new Matcher((actualValue) => typeof actualValue === "symbol", "anySymbol()");
    exports.anySymbol = anySymbol;
    var anyObject = () => new Matcher((actualValue) => typeof actualValue === "object" && actualValue !== null, "anyObject()");
    exports.anyObject = anyObject;
    var anyArray = () => new Matcher((actualValue) => Array.isArray(actualValue), "anyArray()");
    exports.anyArray = anyArray;
    var anyMap = () => new Matcher((actualValue) => actualValue instanceof Map, "anyMap()");
    exports.anyMap = anyMap;
    var anySet = () => new Matcher((actualValue) => actualValue instanceof Set, "anySet()");
    exports.anySet = anySet;
    var isA = (clazz) => new Matcher((actualValue) => actualValue instanceof clazz, "isA()");
    exports.isA = isA;
    var arrayIncludes = (arrayVal) => new Matcher((actualValue) => Array.isArray(actualValue) && actualValue.includes(arrayVal), "arrayIncludes()");
    exports.arrayIncludes = arrayIncludes;
    var setHas = (arrayVal) => new Matcher((actualValue) => (0, exports.anySet)().asymmetricMatch(actualValue) && actualValue.has(arrayVal), "setHas()");
    exports.setHas = setHas;
    var mapHas = (mapVal) => new Matcher((actualValue) => (0, exports.anyMap)().asymmetricMatch(actualValue) && actualValue.has(mapVal), "mapHas()");
    exports.mapHas = mapHas;
    var objectContainsKey = (key) => new Matcher((actualValue) => (0, exports.anyObject)().asymmetricMatch(actualValue) && actualValue[key] !== void 0, "objectContainsKey()");
    exports.objectContainsKey = objectContainsKey;
    var objectContainsValue = (value) => new Matcher((actualValue) => (0, exports.anyObject)().asymmetricMatch(actualValue) && Object.values(actualValue).includes(value), "objectContainsValue()");
    exports.objectContainsValue = objectContainsValue;
    var notNull = () => new Matcher((actualValue) => actualValue !== null, "notNull()");
    exports.notNull = notNull;
    var notUndefined = () => new Matcher((actualValue) => actualValue !== void 0, "notUndefined()");
    exports.notUndefined = notUndefined;
    var notEmpty = () => new Matcher((actualValue) => actualValue !== null && actualValue !== void 0 && actualValue !== "", "notEmpty()");
    exports.notEmpty = notEmpty;
    var captor = () => new CaptorMatcher();
    exports.captor = captor;
    var matches = (matcher) => new Matcher(matcher, "matches()");
    exports.matches = matches;
  }
});

// node_modules/jest-mock-extended/lib/CalledWithFn.js
var require_CalledWithFn = __commonJS({
  "node_modules/jest-mock-extended/lib/CalledWithFn.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.calledWithFn = void 0;
    var Matchers_1 = require_Matchers();
    function isJestAsymmetricMatcher(obj) {
      return !!obj && typeof obj === "object" && "asymmetricMatch" in obj && typeof obj.asymmetricMatch === "function";
    }
    var checkCalledWith = (calledWithStack, actualArgs, fallbackMockImplementation) => {
      const calledWithInstance = calledWithStack.find((instance) => instance.args.every((matcher, i) => {
        if (matcher instanceof Matchers_1.Matcher) {
          return matcher.asymmetricMatch(actualArgs[i]);
        }
        if (isJestAsymmetricMatcher(matcher)) {
          return matcher.asymmetricMatch(actualArgs[i]);
        }
        return actualArgs[i] === matcher;
      }));
      return calledWithInstance ? calledWithInstance.calledWithFn(...actualArgs) : fallbackMockImplementation && fallbackMockImplementation(...actualArgs);
    };
    var calledWithFn = ({ fallbackMockImplementation } = {}) => {
      const fn = jest.fn(fallbackMockImplementation);
      let calledWithStack = [];
      fn.calledWith = (...args) => {
        const calledWithFn2 = jest.fn(fallbackMockImplementation);
        const mockImplementation = fn.getMockImplementation();
        if (!mockImplementation || mockImplementation === fallbackMockImplementation) {
          fn.mockImplementation((...args2) => checkCalledWith(calledWithStack, args2, fallbackMockImplementation));
          calledWithStack = [];
        }
        calledWithStack.unshift({ args, calledWithFn: calledWithFn2 });
        return calledWithFn2;
      };
      return fn;
    };
    exports.calledWithFn = calledWithFn;
    exports.default = exports.calledWithFn;
  }
});

// node_modules/jest-mock-extended/lib/Mock.js
var require_Mock = __commonJS({
  "node_modules/jest-mock-extended/lib/Mock.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stub = exports.mockFn = exports.mockDeep = exports.mockReset = exports.mockClear = exports.JestMockExtended = void 0;
    var CalledWithFn_1 = __importDefault(require_CalledWithFn());
    var DEFAULT_CONFIG = {
      ignoreProps: ["then"]
    };
    var GLOBAL_CONFIG = DEFAULT_CONFIG;
    exports.JestMockExtended = {
      DEFAULT_CONFIG,
      configure: (config) => {
        GLOBAL_CONFIG = Object.assign(Object.assign({}, DEFAULT_CONFIG), config);
      },
      resetConfig: () => {
        GLOBAL_CONFIG = DEFAULT_CONFIG;
      }
    };
    var mockClear = (mock2) => {
      for (let key of Object.keys(mock2)) {
        if (mock2[key] === null || mock2[key] === void 0) {
          continue;
        }
        if (mock2[key]._isMockObject) {
          (0, exports.mockClear)(mock2[key]);
        }
        if (mock2[key]._isMockFunction) {
          mock2[key].mockClear();
        }
      }
      if (!mock2._isMockObject) {
        return mock2.mockClear();
      }
    };
    exports.mockClear = mockClear;
    var mockReset2 = (mock2) => {
      for (let key of Object.keys(mock2)) {
        if (mock2[key] === null || mock2[key] === void 0) {
          continue;
        }
        if (mock2[key]._isMockObject) {
          (0, exports.mockReset)(mock2[key]);
        }
        if (mock2[key]._isMockFunction) {
          mock2[key].mockReset();
        }
      }
      if (!mock2._isMockObject) {
        return mock2.mockReset();
      }
    };
    exports.mockReset = mockReset2;
    function mockDeep2(arg1, arg2) {
      const [opts, mockImplementation] = typeof arg1 === "object" && (typeof arg1.fallbackMockImplementation === "function" || arg1.funcPropSupport === true) ? [arg1, arg2] : [{}, arg1];
      return mock(mockImplementation, { deep: true, fallbackMockImplementation: opts.fallbackMockImplementation });
    }
    exports.mockDeep = mockDeep2;
    var overrideMockImp = (obj, opts) => {
      const proxy = new Proxy(obj, handler(opts));
      for (let name of Object.keys(obj)) {
        if (typeof obj[name] === "object" && obj[name] !== null) {
          proxy[name] = overrideMockImp(obj[name], opts);
        } else {
          proxy[name] = obj[name];
        }
      }
      return proxy;
    };
    var handler = (opts) => ({
      ownKeys(target) {
        return Reflect.ownKeys(target);
      },
      set: (obj, property, value) => {
        obj[property] = value;
        return true;
      },
      get: (obj, property) => {
        var _a;
        let fn = (0, CalledWithFn_1.default)({ fallbackMockImplementation: opts === null || opts === void 0 ? void 0 : opts.fallbackMockImplementation });
        if (!(property in obj)) {
          if ((_a = GLOBAL_CONFIG.ignoreProps) === null || _a === void 0 ? void 0 : _a.includes(property)) {
            return void 0;
          }
          if (property === Symbol.iterator) {
            return obj[property];
          }
          if ((opts === null || opts === void 0 ? void 0 : opts.deep) && property !== "calls") {
            obj[property] = new Proxy(fn, handler(opts));
            obj[property]._isMockObject = true;
          } else {
            obj[property] = (0, CalledWithFn_1.default)({ fallbackMockImplementation: opts === null || opts === void 0 ? void 0 : opts.fallbackMockImplementation });
          }
        }
        if (obj instanceof Date && typeof obj[property] === "function") {
          return obj[property].bind(obj);
        }
        return obj[property];
      }
    });
    var mock = (mockImplementation = {}, opts) => {
      mockImplementation._isMockObject = true;
      return overrideMockImp(mockImplementation, opts);
    };
    var mockFn = () => {
      return (0, CalledWithFn_1.default)();
    };
    exports.mockFn = mockFn;
    var stub = () => {
      return new Proxy({}, {
        get: (obj, property) => {
          if (property in obj) {
            return obj[property];
          }
          return jest.fn();
        }
      });
    };
    exports.stub = stub;
    exports.default = mock;
  }
});

// node_modules/jest-mock-extended/lib/index.js
var require_lib = __commonJS({
  "node_modules/jest-mock-extended/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.calledWithFn = exports.mock = exports.stub = exports.mockFn = exports.mockReset = exports.mockClear = exports.mockDeep = exports.JestMockExtended = void 0;
    var Mock_1 = require_Mock();
    Object.defineProperty(exports, "JestMockExtended", { enumerable: true, get: function() {
      return Mock_1.JestMockExtended;
    } });
    Object.defineProperty(exports, "mockDeep", { enumerable: true, get: function() {
      return Mock_1.mockDeep;
    } });
    Object.defineProperty(exports, "mockClear", { enumerable: true, get: function() {
      return Mock_1.mockClear;
    } });
    Object.defineProperty(exports, "mockReset", { enumerable: true, get: function() {
      return Mock_1.mockReset;
    } });
    Object.defineProperty(exports, "mockFn", { enumerable: true, get: function() {
      return Mock_1.mockFn;
    } });
    Object.defineProperty(exports, "stub", { enumerable: true, get: function() {
      return Mock_1.stub;
    } });
    var Mock_2 = __importDefault(require_Mock());
    exports.mock = Mock_2.default;
    var CalledWithFn_1 = __importDefault(require_CalledWithFn());
    exports.calledWithFn = CalledWithFn_1.default;
    __exportStar(require_Matchers(), exports);
  }
});

// singleton.ts
var import_jest_mock_extended = __toESM(require_lib());

// client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var client_default = prisma;

// singleton.ts
jest.mock("./client", () => ({
  __esModule: true,
  default: (0, import_jest_mock_extended.mockDeep)()
}));
beforeEach(() => {
  (0, import_jest_mock_extended.mockReset)(prismaMock);
});
var prismaMock = client_default;

// src/controllers/Users/UsersController.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
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

// src/controllers/Users/UserController.spec.ts
describe("Testes unit\xE1rios para Controle de Dados na Tabela ParticipanteEmGrupoController", () => {
  let userController;
  let req;
  let res;
  beforeEach(() => {
    userController = new UserController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
  });
  describe("create", () => {
    it('should return null if "data" is invalid', async () => {
      const createdUsers = [
        {
          name: "1",
          email: "1",
          password: "1"
        },
        {
          name: "2",
          email: "2",
          password: "2"
        }
      ];
      const newcreateUsers = await userController.create(createdUsers[0]);
      expect(newcreateUsers).toEqual({ "token": null, "user": {} });
    });
    it('should return "createdUsers" if create was a success', async () => {
      const usersData = [
        {
          name: "1",
          email: "1",
          password: "1"
        },
        {
          name: "2",
          email: "2",
          password: "2"
        }
      ];
      jest.spyOn(prismaMock.user, "createMany").mockResolvedValueOnce({
        count: 2
      });
      const createdUsers = await userController.create(usersData[0]);
      expect(createdUsers).toEqual({ "count": 2 });
    });
  });
  describe("login", () => {
    it('should return null if "data" is invalid', async () => {
      const createdUsers = [];
      const newcreateUsers = await userController.login(createdUsers[0]);
      expect(newcreateUsers).toEqual(null);
    });
    it('should return "createdUsers" if create was a success', async () => {
      const usersData = [
        {
          name: "1",
          email: "1",
          password: "1"
        },
        {
          name: "2",
          email: "2",
          password: "2"
        }
      ];
      jest.spyOn(prismaMock.user, "findUnique").mockResolvedValueOnce({
        id: 1,
        name: "1",
        email: "1",
        password: "1"
      });
      const createdUsers = await userController.login(usersData[0]);
      expect(createdUsers).toEqual({ "id": "1", "email": "1", "password": "1" });
    });
  });
  describe("getProfile", () => {
    it('should return null if "data" is invalid', async () => {
      const createdUsers = [];
      const newcreateUsers = await userController.getProfile(req, res);
      expect(newcreateUsers).toEqual(null);
    });
    it('should return "createdUsers" if create was a success', async () => {
      const usersData = [
        {
          name: "1",
          email: "1",
          password: "1"
        },
        {
          name: "2",
          email: "2",
          password: "2"
        }
      ];
      jest.spyOn(prismaMock.user, "findUnique").mockResolvedValueOnce({
        id: 1,
        name: "1",
        email: "1",
        password: "1"
      });
      const createdUsers = await userController.getProfile(req, res);
      expect(createdUsers).toEqual({ "id": "1", "email": "1", "password": "1" });
    });
  });
});

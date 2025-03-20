"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = require("./config/index.js");
const app_1 = __importDefault(require("./app"));
const PORT_NUMBER = _config_1.PORT || 4000;
app_1.default.listen(PORT_NUMBER, () => {
    console.log(`
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃   Server listening on port: ${PORT_NUMBER}    ┃
  ┃  http://localhost:${PORT_NUMBER}/service/api  ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  `);
});

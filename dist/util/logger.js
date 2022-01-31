"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const headless_manager_client_1 = __importDefault(require("headless-manager-client"));
const axios_1 = __importDefault(require("axios"));
const logger = new headless_manager_client_1.default({
    appId: process.env.HM_APP_ID || "",
    apiUrl: process.env.HM_API_URL || "",
    submitEnabled: process.env.NODE_ENV !== "development",
    fetchInstance: axios_1.default,
});
exports.default = logger;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./util/logger"));
const ig = require("instagram-scraping");
const LRU = require("lru-cache");
const app = (0, express_1.default)();
const options = {
    max: 100,
    // length: function (n, key) { return n * 2 + key.length },
    // dispose: function (key, n) { n.close() },
    maxAge: 1000 * 60 * 60,
};
const tagCache = new LRU(options);
const userCache = new LRU(options);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/tag/:tag", async (req, res) => {
    const { tag } = req.params;
    try {
        const inCache = tagCache.get(tag);
        if (inCache)
            return res.send(inCache);
        logger_1.default.info(`/tag/:tag`, `Requesting`, tag);
        const result = await ig.scrapeTag(tag);
        tagCache.set(tag, result);
        res.send(result);
    }
    catch (e) {
        const errorMessage = typeof e === 'string' ? e : JSON.stringify(e);
        logger_1.default.error(`/tag/:tag`, tag, errorMessage);
        res.send("Error!");
    }
});
app.get("/user/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const inCache = userCache.get(username);
        if (inCache)
            return res.send(inCache);
        logger_1.default.info(`/user/:username`, `Requesting`, username);
        const result = await ig.scrapeUserPage(username);
        tagCache.set(username, result);
        res.send(result);
    }
    catch (e) {
        const errorMessage = typeof e === 'string' ? e : JSON.stringify(e);
        logger_1.default.error(`/user/:username`, username, errorMessage);
        res.send("Error!");
    }
});
app.listen(3000, () => console.log(`App is listening on port 3000!`));

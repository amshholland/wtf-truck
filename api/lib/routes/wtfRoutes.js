"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const mongodb_1 = require("mongodb");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
// Get food trucks
app.get("/", async (req, res) => {
    try {
        const client = await db_1.getClient();
        const results = await client.db().collection('trucks').find().toArray();
        res.json(results); // send JSON results
    }
    catch (err) {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// List favorites
app.get("/favorites", async (req, res) => {
    const userId = String(req.query.userId || '');
    console.log('HI');
    console.log(userId);
    try {
        const client = await db_1.getClient();
        const results = await client.db().collection('favorites').find({ userId: userId }).toArray();
        res.json(results);
    }
    catch (err) {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Add new favorite
app.post("/", async (req, res) => {
    const newFavorite = req.body;
    console.log(newFavorite);
    try {
        const client = await db_1.getClient();
        const results = await client.db().collection('favorites').insertOne(newFavorite);
        res.json(results);
    }
    catch (err) {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Delete favorite
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const client = await db_1.getClient();
        const result = await client.db().collection('favorites').deleteOne({ _id: new mongodb_1.ObjectId(id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Not Found" });
        }
        else {
            res.status(204).end();
        }
    }
    catch (err) {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = functions.https.onRequest(app);
//# sourceMappingURL=wtfRoutes.js.map
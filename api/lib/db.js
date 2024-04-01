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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const functions = __importStar(require("firebase-functions"));
const mongodb_1 = require("mongodb");
const uri = functions.config().mongodb.uri;
if (!uri) {
    console.error("ERROR: Missing environment variable mongodb.uri.");
}
let client;
async function getClient() {
    // Check if connection exists, if not, reconnect
    if (!client || !client.isConnected()) {
        // Establish a connection to the database
        client = await mongodb_1.MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.debug("DB CLIENT RECONNECTED");
    }
    return client;
}
exports.getClient = getClient;
//# sourceMappingURL=db.js.map
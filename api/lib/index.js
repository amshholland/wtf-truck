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
const functions = __importStar(require("firebase-functions"));
const db_1 = require("./db");
const dual_service_1 = require("./service/dual-service");
var wtfRoutes_1 = require("./routes/wtfRoutes");
Object.defineProperty(exports, "trucks", { enumerable: true, get: function () { return wtfRoutes_1.default; } });
exports.updateTrucksScheduled = functions.pubsub.schedule('every 120 minutes').onRun(async (context) => {
    try {
        await updateTrucks();
        console.log("done");
    }
    catch (err) {
        console.error(err);
    }
    return null;
});
exports.updateTrucksTest = functions.https.onRequest(async (req, res) => {
    try {
        await updateTrucks();
        res.send("done");
    }
    catch (err) {
        console.log(err);
        res.send("failed");
    }
});
async function updateTrucks() {
    // console.log( 'This will be run every 30 minutes!' );
    // Get trucks from database that need to be updated
    // Connecting to MongoDB
    const client = await db_1.getClient();
    const collection = client.db().collection('trucks');
    const trucksFromDb = await collection.find().sort({ lastRefresh: 1 }).limit(10).toArray();
    // Iterate through each truck
    for (let dbTruck of trucksFromDb) {
        // Use trucks from DB to search 3rd party API by IG handle
        const apiTruck = await dual_service_1.readTruck(dbTruck.instagramHandle);
        // Filter our results first to omit posts with no location
        const locationHistory = apiTruck.feed.data.filter(function (apiPost, apikey) {
            if (apiPost.location === undefined) {
                return false;
            }
            return true;
        }).map(apiPost => {
            var _a;
            // Determine whether post is a carousel of images or a single image
            let postPhoto = '';
            if (apiPost.carousel_media === undefined) {
                postPhoto = apiPost.image_versions2.candidates[1].url;
            }
            else {
                (_a = apiPost.carousel_media) === null || _a === void 0 ? void 0 : _a.map(media => {
                    // Check to see if media type is different than a photo
                    // If so, do not include in results
                    if (media.media_type !== 1) {
                        return false;
                    }
                    postPhoto = media.image_versions2.candidates[1].url;
                    return true;
                });
            }
            ;
            const truckLocation = {
                locationName: apiPost.location.name || '',
                photo: postPhoto,
                timestamp: apiPost.taken_at,
                lat: apiPost.location.lat || 0,
                lng: apiPost.location.lng || 0,
                address: apiPost.location.address || '',
                city: apiPost.location.city || '',
                caption: apiPost.caption || undefined
            };
            return truckLocation;
        });
        dbTruck.iGId = apiTruck.pk;
        dbTruck.name = apiTruck.full_name;
        dbTruck.profilePhoto = apiTruck.profile_pic_url;
        dbTruck.profileDescription = apiTruck.biography;
        dbTruck.instagramHandle = dbTruck.instagramHandle;
        dbTruck.lastRefresh = Date.now();
        dbTruck.lastLocation = locationHistory[0];
        dbTruck.locationHistory = locationHistory;
        // In replaceOne: {_id: dbTruck._id} acts as a filter 
        // dbTruck acts as the replacement
        await collection.replaceOne({ _id: dbTruck._id }, dbTruck);
    }
}
//# sourceMappingURL=index.js.map
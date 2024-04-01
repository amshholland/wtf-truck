import * as functions from "firebase-functions";

import IGTruckProfile from "../model/apiModel";
import axios from "axios";

// const key = functions.config().RapidAPI.key;
const host = "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/bulk_profile";

export function readTruck( handle: string ): Promise<IGTruckProfile> {
  return axios.get( host, {
    params: { ig: handle, corsEnabled: "true" },
    headers: { "X-RapidApi-Key": functions.config().rapidapi.key }
  } ).then( res => res.data[ 0 ] );
}
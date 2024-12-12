import config from "./convict.js";
import { ElevenLabsClient } from "elevenlabs";

let client = null;

function createInstance() {
    const api_key = config.get("api_key");
    return new ElevenLabsClient({ apiKey: api_key });
}

/**
 * @returns {ElevenLabsClient} The ElevenLabs client instance.
 */
function getElevenLabs() {
    try {
        if (client !== null) return client;
        client = createInstance();
        return client;
    } catch (err) {
        console.log("something went wrong while creating elevenlabs instance");
    }
}

export default getElevenLabs;
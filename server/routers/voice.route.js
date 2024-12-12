import express from "express";
import config from "../common/convict.js";
import getElevenLabs from "../common/elevenlabs.js";
import { PassThrough } from 'stream';

const app = express();
const model_id = config.get("model_id");

app.get('/voices', async (req, res) => {
    try {
        const client = getElevenLabs();
        const response = await client.voices.getAll();
        res.json(response);
    } catch (error) {
        console.error('Error fetching voices:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch voices' });
    }
});

// API to convert text to speech
app.post('/synthesize', async (req, res) => {
    const { text, voiceId } = req.body;
    try {
        const client = getElevenLabs();
        const response = await client.textToSpeech.convert(voiceId, {
            model_id,
            text,
        });
        const passThrough = new PassThrough();
        response.pipe(passThrough);
        passThrough.pipe(res);
    } catch (error) {
        console.error('Error during TTS conversion:', error);
        res.status(500).json({ error: 'Failed to convert text to speech' });
    }
});

export default app;
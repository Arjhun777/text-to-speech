import convict from "convict";
import dotenv from "dotenv";
dotenv.config();

const config = convict({
  base_url: {
    doc: 'App base URL',
    format: String,
    default: "http://localhost",
    env: 'BASE_URL'
  },
  port: {
    doc: 'App port',
    format: Number,
    default: 5000,
    env: 'PORT'
  },
  api_key: {
    doc: 'API key',
    format: String,
    default: process.env.API_KEY,
    env: 'API_KEY'
  },
  model_id: {
    doc: 'Model ID to used',
    format: String,
    default: "eleven_multilingual_v2",
    env: 'MODEL_ID'
  }
});

config.validate({ allowed: 'strict' });

export default config;
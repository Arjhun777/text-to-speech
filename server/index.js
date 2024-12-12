import express from "express";
import voiceRouter from "./routers/voice.route.js";
import config from "./common/convict.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());

const port = config.get("port");
const base_url = config.get("base_url");
// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", voiceRouter);

const buildPath = path.join(__dirname, "..", "build");

app.use(express.static(buildPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running at ${base_url}:${port}`);
});

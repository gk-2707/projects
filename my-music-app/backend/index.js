const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load songs from JSON file
const songs = JSON.parse(fs.readFileSync("songs.json", "utf-8"));

// API Routes
app.get("/api/songs", (req, res) => {
    res.json(songs);
});

app.get("/api/songs/:id", (req, res) => {
    const song = songs.find(s => s.id === parseInt(req.params.id));
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Load your dataset (simplified for demo)
import fs from "fs";
const dialogue = JSON.parse(fs.readFileSync("./dataset/unified_dialogue.jsonl", "utf-8").split("\n").filter(Boolean).map(l => l)[0]); // just first line demo

// POST /api/chat
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  // Dummy bot: reply with fixed dataset line (replace with real logic later)
  const reply = `Bot reply to: "${message}" → Example: ${dialogue.instruction || "Hello!"}`;

  res.json({ reply });
});

app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));

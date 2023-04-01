const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/snippet-saver-db";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

const snippetSchema = new mongoose.Schema({
  text: String,
  surroundingText: String,
  metadata: {
    url: String,
    title: String,
    dateSaved: String,
  },
});

const Snippet = mongoose.model("Snippet", snippetSchema);

app.get("/snippets", async (req, res) => {
  const snippets = await Snippet.find({});
  res.json(snippets);
});

app.post("/snippets", async (req, res) => {
  const snippet = new Snippet(req.body);
  await snippet.save();
  res.status(201).json(snippet);
});

app.get("/snippets/search", async (req, res) => {
  const query = req.query.q;
  const snippets = await Snippet.find({
    text: { $regex: query, $options: "i" },
  });
  res.json(snippets);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

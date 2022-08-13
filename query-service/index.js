import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(`processando evento ${event.type}`);

  if (event.type === "PostCreated") {
    const postId = event.data.id;
    const post = event.data;
    posts[postId] = post;
  }

  console.log(`evento ${event.type} processado!`);

  res.json({});
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/", (req, res) => {
  res.json({ status: "ok!" });
});

app.listen(4002, () => {
  console.log("query server running on http://localhost:4002");
});

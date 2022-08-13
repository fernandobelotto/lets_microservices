const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());

const comments = {
  asdf: [{ content: "asdf", id: "1234", postId: "asdf" }],
};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  res.json(comments[postId]);
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;

  const content = req.body.content;
  const commentId = (Math.random() * 10000).toFixed().toString();

  const commentsArray = comments[req.params.id] || [];

  const comment = { id: commentId, content, postId };
  commentsArray.push(comment);

  comments[postId] = commentsArray;

  await axios
    .post("http://localhost:4005", {
      type: "CommentCreated",
      data: comment,
    })
    .then(() => console.log("Evento commentCreated enviado"))
    .catch(() => console.log("erro ao enviar evento CommentCreated"));

  res.status(201).json({});
});

app.get("/comments", (req, res) => {
  res.json(comments);
});
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/events", (req, res) => {
  const eventType = req.body.type;   

  console.log(`evento ${eventType} recebido`);

  res.json({});
});

app.listen(4001, () => {
  console.log("comments service running at http://localhost:4001");
});

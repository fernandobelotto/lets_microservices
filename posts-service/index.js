const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {
  asdf: {
    id: "asdf",
    title: "Meu Primeiro Post",
    comments: [],
  },
};

app.get("/posts", (_req, res) => {
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const postId = (Math.random() * 10000).toFixed().toString();
  req.body.id = postId;
  req.body.comments = [];

  posts[postId] = req.body;

  await axios
    .post("http://localhost:4005/events", {
      type: "PostCreated",
      data: req.body,
    })
    .then(() => console.log("evento PostCreated enviado"))
    .catch(() => console.log("erro ao enviar evento PostCreated"));

  res.json(req.body);
});




app.get("/", (_req, res) => {
  res.json({ status: "tudo ok!" });
});

app.post("/events", (req, res) => {
  const eventType = req.body.type;

  console.log(`evento ${eventType} recebido`);

  res.json({});
});

app.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});

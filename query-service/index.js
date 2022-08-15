import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

function handleEvents(event) {
  if (event.type === "PostCreated") {
    const postId = event.data.id;
    const post = event.data;
    posts[postId] = post;
  }

  if (event.type === "CommentCreated") {
    const postId = event.data.postId;
    const comment = event.data;
    posts[postId].comments.push(comment);
  }
}

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(`processando evento ${event.type}`);

  handleEvents(event);

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
  axios
    .get("http://localhost:4005/events")
    .then((events) => {
      for (let event of events.data) {
        console.log(`Processing event of type ${event.type}`);
        handleEvents(event);
      }
    })
    .catch(() => {
      console.log('error getting events from event-bus!')
    })
    .finally(() =>
      console.log("query server running on http://localhost:4002")
    );
});

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/posts", async (req, res) => {
  try {
    const resultadoAxios = await axios.post(
      "http://localhost:4000/posts", // chama o post-service!
      req.body
    );
    res.send(resultadoAxios.data);
  } catch (e) {
    console.log(e);
    res.json({ status: "error" });
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = req.params.id;
  try {
    const resultadoAxios = await axios.post(
      `http://localhost:4001/posts/${id}/comments`, // chama o comment-service
      req.body
    )
    res.send(resultadoAxios.data);

  } catch (e) {
    console.log(e);
    res.json({ status: "error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const resultadoAxios = await axios.get("http://localhost:4002/posts"); // chama o query-service!!!
    res.send(resultadoAxios.data);
  } catch (e) {
    console.log(e);
    res.json({ status: "error" });
  }
});

app.listen(5000, () => {
  console.log("running gateway 5000");
});

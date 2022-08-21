const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/events", (req, res) => {
  const eventType = req.body.type;
  const eventData = req.body.data;
  console.log(req.body.data)
  if (eventType === "CommentCreated") {
    // fazer moderação
    setTimeout(async () => {
      if (eventData.content.includes("ventilador")) {
        eventData.status = "rejected";
      } else {
        eventData.status = "approved";
      }

      await axios
        .post("http://localhost:4005/events", {
          type: "CommentModerated",
          data: eventData,
        })
        .then(() => {
          console.log("evento CommenteModerated enviado ao bus");
        })
        .catch(() => {
          console.log("erro ao enviar CommenteModerated para o bus");
        });
    }, 3000);

    res.json({});
    // disparar evento de comentário moderado
  }
});

app.listen(4003, () => {
  console.log("moderation service running at http://localhost:4003");
});

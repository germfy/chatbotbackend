const express = require("express");
const router = express.Router();
const wdc = require("watson-developer-cloud");

const AssistantV2 = require("watson-developer-cloud/assistant/v2");

const assistant = new AssistantV2({
  version: "2019-02-28",
  iam_apikey: `${process.env.ASSISTANT_APIKEY}`,
  url: `${process.env.ASSISTANT_APIKEY}`
});

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
  res.status(200).json({ message: "Todo OK" });
});

router.post("/conversation", (req, res, next) => {
  console.log(req.cookies.sessionId);
  if (req.cookies.sessionId === undefined) {
    assistant.createSession(process.env.ASSISTANT_ID, data =>
      console.log(data)
    );
  }
});

router.get("/privacy-notice", (req, res, next) => {
  res.json({ message: "Aviso de privacidad" });
});

module.exports = router;

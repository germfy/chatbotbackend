require("dotenv").config();
const express = require("express");
const router = express.Router();
const conversationHelper = require("../helpers/conversation_helpers")
const databaseHelper = require("../helpers/database_helpers")
let sessionid = ''

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
  res.status(200).json({ message: "Todo OK" });
});

router.post("/conversation",  async (req, res, next) => {
  if (req.cookies.sessionId === undefined) {
    const sesion = await conversationHelper.crearSesion()
    const tempsessionid = await sesion.json()
    sessionid = tempsessionid["session_id"]
    res.cookie("sessionId", sessionid)
  }else{
    sessionid = req.cookies.sessionId
  }

  const mensaje = await conversationHelper.enviarMensaje(req.body.texto, sessionid)
  const jsonObj = await mensaje.json()
  jsonObj["usuario_input"] = {fecha: new Date().toLocaleString(), texto: req.body.texto}
  jsonObj["sesion"] = sessionid

  try{
    databaseHelper.guardar_registro(jsonObj)
    res.json(jsonObj.output)
    next()
  }catch(err){
    res.status(500).json({message: err.message})
    next()
  }


});

router.get("/privacy-notice", (req, res, next) => {
  res.json({ message: "Aviso de privacidad" });
});

module.exports = router;

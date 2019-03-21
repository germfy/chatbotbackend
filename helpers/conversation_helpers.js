"use strict";
require("dotenv").config();
const fetch = require("node-fetch")

module.exports = {
  crearSesion : () =>{
    const metaauth = Buffer.from(`apikey:${process.env.ASSISTANT_APIKEY}`).toString('base64')

    const metaheader = {
      'Authorization': `Basic ${metaauth}`,

    }
    const encabezados = new fetch.Headers(metaheader)

    const options = {
      headers:encabezados,
      method: "POST",
    }
    const respuesta = fetch(`${process.env.ASSISTANT_URL}/v2/assistants/${process.env.ASSISTANT_ID}/sessions?version=2019-02-28`, options)
      .then(res => res)
      .catch(err => {
        throw new Error(err.response.message)
      })

    return respuesta
  },
  enviarMensaje: (texto, sessionid) =>{

    const metaauth = Buffer.from(`apikey:${process.env.ASSISTANT_APIKEY}`).toString('base64')

    const metaheader = {
      'Authorization': `Basic ${metaauth}`,
      'Content-Type': 'application/json',
    }
    const encabezados = new fetch.Headers(metaheader)
    const datosCuerpo = JSON.stringify({input: {text: texto}})
    const options = {
      headers:encabezados,
      method: "POST",
      body: datosCuerpo,
    }
    const respuesta = fetch(`${process.env.ASSISTANT_URL}/v2/assistants/${process.env.ASSISTANT_ID}/sessions/${sessionid}/message?version=2019-02-28`, options)
      .then(res => res)
      .catch(err => {
        console.log(err)
        throw new Error(err.response.message)
      })

    return respuesta

  }
}

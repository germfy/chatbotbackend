"use strict";
require("dotenv").config();

//const log = require('cf-nodejs-logging-support')
const fetch = require('node-fetch')


module.exports = {
  guardar_registro: (registro)=> {
    const options = {
      method: 'POST',
      body: JSON.stringify(registro),
      headers: {"Content-Type": "application/json"}
    }
    fetch(process.env.CLOUDANT_URL, options)
      .then(res => {return res})
      .catch(err => {
        //console.log(err)
        throw new Error(err.response.message)
      })
  },
  obtener_registros:   (semana, ano) => {
    const params = {
      "selector": {
        "semana": semana.toString(),
        "ano": ano.toString()
      },
      "sort": [{"ano": "asc"}, {"semana": "asc"}]
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {"Content-Type": "application/json", "Accept":"application/json"},
      compress: false,
    }
    const urlBuscar = `${process.env.CLOUDANT_URL}/_find`
    const respuesta = fetch(urlBuscar, options).then(responseFromDB => {
      return responseFromDB
    })
    return respuesta
  },
}


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import conectarDB from "../../../../lib/dbConnect"
import Pelicula from "../../../../models/Pelicula"

export default async function handler(req, res) {
 //obtener el metodo
 const {method} = req
 await conectarDB()

 switch(method) {
  case "POST":
    try{
     await Pelicula.create(req.body)
     return res.json({success: true})
    }catch(error){ 
      console.log(error)
      res.status(400).json({success: false, error})
    }
  default:
    return res.status(500).json({success: false, error: 'fallo de servidor'})
 }
}

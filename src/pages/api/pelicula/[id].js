import conectarDB from "../../../../lib/dbConnect"
import Pelicula from "../../../../models/Pelicula"

export default async function handler(req, res) {
 //obtener el metodo y cuerpo
 const {method, query: {id}, body} = req
 await conectarDB()
 //se hara GET api/movie/:id

 switch(method) {
  case "PUT":
    try{
     const pelicula = await Pelicula.findByIdAndUpdate(id, body, {new:true,runValidators:true})
     if(!pelicula){
        return res.status(404).json({success: false, error: 'pelicula no encontrada'})
     }
     return res.json({success: true, data: pelicula})
    }catch(error){ 
      return res.status(404).json({success: false, error})
    }
  case "DELETE":
    try{
     const pelicula = await Pelicula.findByIdAndDelete(id)
     if(!pelicula){
        return res.status(404).json({success: false, error: 'pelicula no encontrada'})
     }
     return res.json({success: true, data: pelicula})
    }catch(error){ 
      return res.status(404).json({success: false})
    }
  case "GET":
    try{
     const pelicula = await Pelicula.findById(id)
     if(!pelicula){
        return res.status(404).json({success: false, error: 'pelicula no encontrada'})
     }
     return res.json({success: true, data: pelicula})
    }catch(error){ 
      return res.status(404).json({success: false})
    }
  default:
    return res.status(500).json({success: false, error: 'fallo de servidor'})
 }
}
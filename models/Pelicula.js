import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

//crear esquema
const peliculaShema = new Schema({
    title: {
        type: String,
        required: [true, "ingrese titulo"]
    },
    descripcion: {
        type: String,
        required: [true, "ingrese titulo"]
    }
}, {collection: 'peliculas'})

//crear modelo
//const Pelicula = mongoose.model ('Pelicula', peliculaShema)
//exportar modelo
export default mongoose.models.Pelicula || mongoose.model ('Pelicula', peliculaShema)
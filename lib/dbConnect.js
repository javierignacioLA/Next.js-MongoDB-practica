import mongoose from "mongoose";

const mongoURL = process.env.URL

const conectarDB = async () => {
    try{
        await mongoose.connect(mongoURL)
        console.log('estamos contactados pa')
    }catch(error){
        console.log(error)
        //para que se salga
        process.exit(1)
    }
}
export default conectarDB
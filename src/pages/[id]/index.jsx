
import Link from 'next/link'
import conectarDB from '../../../lib/dbConnect'
import Pelicula from '../../../models/Pelicula'
import { useRouter } from 'next/router'
const PaginaPeliculas = ({success, pelicula, error}) => {
  const router = useRouter()

    const handleDelete = async (id) =>{
      try{
        await fetch(`/api/pelicula/${id}`, {
          method: 'DELETE'
        })
        router.push('/')
      }catch(error){
        console.log(error)
      }
    }

  return (
    <div>
        {success? 
        <div className='container'>
            <h1> Detalle peliculas</h1>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>
                        {pelicula.title}
                    </h5>
                    <p className='card-text'>
                        {pelicula.descripcion}
                    </p>
                    <Link href='/' className='btn btn-primary me-2'>
                        Volver a las peliculas
                    </Link>
                    <Link href={`/${pelicula._id}/editar`} className='btn btn-warning me-2'>
                        Editar
                    </Link>
                    <button className='btn btn-danger me-2' onClick={() => handleDelete(pelicula._id)}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>:
        <>
        <h1>{error}</h1>
        <Link href='/' className='btn btn-warning w-100 mt-2'>
        volver al inicio
        </Link>
        </>

    }
    </div>
  )
}

export default PaginaPeliculas

export async function getServerSideProps ({params}){
    try{
      await conectarDB()
      const pelicula = await Pelicula.findById(params.id).lean()
        console.log(pelicula)
        if(!pelicula){
            return {props:{success: false, error: 'pelicula no encontrada'}}
        }
        pelicula._id = pelicula._id.toString()
      return {props:{success: true, pelicula}}
    }catch(error){
      console.log(error)
      return {props:{success: false, error: 'id no valido'}}
    }
  }
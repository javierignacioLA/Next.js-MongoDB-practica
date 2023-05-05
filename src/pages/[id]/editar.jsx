import React from 'react'
import Form from '../../../components/Form'
import useSWR from "swr";
import { useRouter } from 'next/router';

const fetcher = async (url) => {
  const res = await fetch (url)
  if(!res.ok){
    const error = new Error ('no se pudo encontrar')
    throw error
  }
  const {data} = await res.json()
  
  return data
}

const EditarPelicula = () => {
  const router = useRouter()
  const {id} = router.query
 
  
  const {data: pelicula, error} = useSWR(id?`/api/pelicula/${id}`: null, fetcher)

  
  if(error){
    return <p className='alert alert-danger'> fallo en la carga</p>
  }
  if (!pelicula) return <p className="container my-3">Cargando...</p>;
 
  const peliculaForm = {
    title: pelicula.title,
    descripcion: pelicula.descripcion
  }
  
  return (
    <div className='container'>   
      {
        pelicula? 
        <div>
          <h1>Editar Pelicula</h1>
          <Form formNewMovie={false} peliculaForm={peliculaForm}></Form>
        </div>:
       <div>
        <p className='alert alert-danger'></p>
       </div>
      }
    </div>
  )
}

export default EditarPelicula
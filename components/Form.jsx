import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Form = ({formNewMovie = true, peliculaForm }) => {
    const [form, setForm] = useState({
        title: peliculaForm ? peliculaForm.title : '',
        descripcion: peliculaForm ? peliculaForm.descripcion : ''
    })
    const [message, setMessage] = useState('')
    const router = useRouter()

    //manejar cambio
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setForm ({
            ...form, [name]: value
        })
        
    }
    //manejar envio
    const handleSubmit = (e) => {
        e.preventDefault()
        formNewMovie? postData(form): putData(form)
        
    }

    const postData = async (form) => {
        try{
            const res = await fetch('/api/pelicula',{
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(form)
            })
            if(!res.ok){
                throw new Error(res.status)
            }else{
                setMessage('')
                router.push('/')
            }
            
        }catch(error){
            setMessage('fallo en crear pelicula')
           
        }
    }

    const putData = async (form) => {
        const {id} = router.query
        try{
            const res = await fetch(`/api/pelicula/${id}`,{
                method: 'PUT',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(form)
            })
            if(!res.ok){
                throw new Error(res.status)
            }else{
                setMessage('')
                router.push('/')
            }
            
        }catch(error){
            setMessage('fallo en actualizar pelicula')
        }
    }
  return (
    <form onSubmit={handleSubmit}>
            <input
             type="text" 
             className='form-control my-2'
             placeholder='titulo'
             name='title'
             value={form.title}
             onChange={handleChange}
             />
             <input
             type="text" 
             className='form-control my-2'
             placeholder='descripcion'
             name='descripcion'
             value={form.descripcion}
             onChange={handleChange}
             />
             <button className='btn btn-primary w-100' type='submit'>{formNewMovie? 'Agregar': 'Editar'}</button>
            <Link href='/' className='btn btn-warning w-100 mt-2'>
                volver al inicio
            </Link>
            <div className={message? 'alert alert-danger': ''}>
            <span >{message}</span>
            </div>
            
        </form> 
  )
}

export default Form
import React, {useState} from 'react'
import PropTypes from 'prop-types';

//Generacion de ID unico 
import uuid from 'react-uuid';



const Formulario = ({crearCita})=>{

    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });


    const [error, setError] = useState(false);

    //Funcion que se ejecuta cunado el usuario escribe
    const handleChange = (e)=>{
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer Valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;


    //Cuando usuario presiona agregar cita
    const submitCita = (e)=>{
        
        e.preventDefault();

        //Validar formulario 
        if(mascota.trim()==='' || propietario.trim()==='' || 
        fecha.trim()===''|| hora.trim()===''||sintomas.trim()===''){
            
            setError(true);
            return;
        }
        //Eliminar mensaje previo de error
        setError(false);


        //Asignar ID
        cita.id = uuid();

        //Crear Cita
        
        crearCita(cita);

        //Reset Form

        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }



    return (
        <>
            <h2>Crear Cita</h2>

            {error? <p className='alerta-error'>Todos los campos 
            Son obligatorios</p> : null}

            <form
                onSubmit = {submitCita}
            >
                <label>Nombre Mascota</label>
                <input  
                    type = 'text'
                    name = 'mascota'
                    className = 'u-full-width'
                    placeholder = 'Nombre Mascota'
                    onChange = {handleChange}
                    value = {mascota}
                />


                <label>Nombre dueño</label>
                <input  
                    type = 'text'
                    name = 'propietario'
                    className = 'u-full-width'
                    placeholder = 'Nombre Dueño de la Mascota'
                    onChange = {handleChange}
                    value = {propietario}

                />

                <label>Fecha</label>
                <input  
                    type = 'date'
                    name = 'fecha'
                    className = 'u-full-width'
                    onChange = {handleChange}
                    value = {fecha}

                />


                <label>Hora</label>
                <input  
                    type = 'time'
                    name = 'hora'
                    className = 'u-full-width'
                    onChange = {handleChange}
                    value = {hora}

                />

                <label >Sintomas</label>
                <textarea  
                    className='u-full-width'
                    name='sintomas'
                    onChange = {handleChange}
                    value = {sintomas}

                ></textarea>


                <button
                    type='submit'
                    className='u-full-width button-primary'
                >Agregar Cita</button>
            </form>

        </>
    )
}

Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired
}

export default Formulario;
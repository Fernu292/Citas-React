import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


const App = ()=>{

  //Citas en local storage

  let citasIniciales = JSON.parse( localStorage.getItem('citas') );

  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas 
  const [citas, setCitas] = useState(citasIniciales);

  //useEffect para cambios en state
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }

  }, [citas, citasIniciales] );//Pasar arreglo vacio para evitar ciclico en recarga 
        //y analiza un state o componente para ver sus cambios 

  //Funcion que tome citas actuales y la nueva 

  const crearCita = cita => {

    setCitas( [...citas, cita] );

  }


  //Funcion que elimina cita por id

    const eliminarCita = id =>{
      const nuevasCitas = citas.filter( cita => cita.id !== id);

      setCitas(nuevasCitas);
    }


    //Mensaje condicional 
    const titulo = citas.length===0 ? 'No Hay citas' : 'Administra tus citas'; 

  return (
    <>
      <h1>Administrador de pacientes</h1>
      <div className = 'container'>
        
        <div className='row'>

          <div className='one-half column'>
              
              <Formulario crearCita = {crearCita} />

          </div>

          <div className='one-half column'>
              <h2> {titulo} </h2>


              {citas.map( cita => {
                return <Cita 
                key = {cita.id} 
                cita = {cita} 
                eliminarCita = {eliminarCita} />
              })}


          </div>


        </div>
      </div>
    
    </>
  )
}

export default App;

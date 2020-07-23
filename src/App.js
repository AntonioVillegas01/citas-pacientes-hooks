import React, {useState, useEffect}from 'react';
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";


function App() {

    //Citas en localStorage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if( !citasIniciales ){
        citasIniciales = [];
    }

    //Arreglo de todas las Citas
    const [citas, guardarCitas] = useState(citasIniciales);

    //useEffect para realizar operaciones cuando el state cambia
    useEffect(()=>{
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
       if(citasIniciales){
           localStorage.setItem('citas',JSON.stringify(citas));
       }else{
           localStorage.setItem('citas',JSON.stringify([]))
       }
    },[citas]);



    //Funcion que lea todas la citas y agregue la nueva
    const crearCita = cita => {
        //utilizamos la funcion que modifica el state
        guardarCitas([
            //Hacemos copia del state para que no elimine las citas nuevas
            ...citas,
            //agregamos la cita
            cita
        ]);
    }

    //Funcion que elimina una cita por su id
    const eliminarCita = id => {
        const nuevasCitas = citas.filter(cita => cita.id !== id );
        guardarCitas(nuevasCitas);
    }

    //Mensaje
    const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus Citas'

  return (
      <>
        <h1>Administrador de pacientes</h1>
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario
                  crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
                <h2>{titulo}</h2>
                {citas.map( (cita,i)=>(
                    <Cita
                        key={i}
                        cita={cita}
                        eliminarCita={eliminarCita}
                    />
                ))}
            </div>
          </div>
        </div>
      </>

  );
}

export default App;

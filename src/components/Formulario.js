import React, {useState} from 'react';
import { uuid } from 'uuidv4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //CREAR State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })
    const [error, actualizarError] = useState(false);


    //Funcion   que se ejecuta cada que el usuario escribe en un input
    const actualizarState = (e) => {
        actualizarCita({
            //Usar una copia del state
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Extraer los Valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Enviar Formulario
    const submitCita = e => {
        e.preventDefault();

        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        //Eliminar mensaje previo
        actualizarError(false);

        //Asignar un ID
        cita.id = uuid();

        //Crear la Cita
        crearCita(cita);

        //Reiniciar el Formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }


    return (
        <>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error"> Todos los campos son obligatorios</p> : null}
            <form
                onSubmit={submitCita}
            >
                <label >Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label >Propietario</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label >Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label >Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label >Sintomas</label>
                <textarea
                    name="sintomas"
                    cols="30" rows="10"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                />
                <button
                    type="submit"
                    className="button-primary u-full-width"
                >Agregar Cita</button>
            </form>
        </>
    );
};

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useQueryRandomPerro } from '../Queries/randomPerro';
import CardPerro from './Components/cardPerro';
import { Button, LinearProgress, Paper, styled } from '@mui/material';
import { useState } from 'react';
import './Components/style.css';
import { useEffect } from 'react';

export default function Home() {
  const [aceptado, setAceptado] = useState([]);
  const [rechazado, setRechazado] = useState([]);
  const [cambio, setCambio] = useState('');
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const {data: perrito, isLoading, isError} = useQueryRandomPerro(['cambio', cambio]);
  const handleButtonAceptado = () => {
    setAceptado([perrito, ...aceptado])
    setCambio(perrito.message)
  }
  const handleButtonRechazado = () => {
    setRechazado([perrito, ...rechazado])
    setCambio(perrito.message)
  }
  const handleButtonAceptadoArr = (valor) => {
    setAceptado(aceptado.filter(aceptado => aceptado != valor))
    setRechazado([valor, ...rechazado])
    console.log(valor)
  }
  const handleButtonRechazadoArr = (valor) => {
    setAceptado([valor, ...aceptado])
    setRechazado(rechazado.filter(rechazado => rechazado != valor))
  }

  const handleExpandCard = (index) => {
    if (expandedCardIndex === index) {
      setExpandedCardIndex(null); // Cerrar la tarjeta si ya está abierta
    } else {
      setExpandedCardIndex(index); // Abrir la tarjeta correspondiente
    }
  };

  useEffect(() => {
    // Este efecto se ejecutará cada vez que aceptado o rechazado cambie
    // Si cambias un perro de aceptado a rechazado (o viceversa), cierra la descripción
    setExpandedCardIndex(null);
  }, [aceptado, rechazado]);

  const buttonsAR =
    <>
      <Grid container item justifyContent="center">
        <Grid item xs={6}>
          <Button variant="contained" color="success" onClick={handleButtonAceptado} disabled={isLoading}>Aceptar</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="error" onClick={handleButtonRechazado} disabled={isLoading}>Rechazar</Button>
        </Grid>
      </Grid>
    </>
    
    const aceptadoCards = aceptado.map((valor, index) => (
      <div key={index}>
        <CardPerro
          url={valor.message}
          nombre={valor.nombre}
          buttons={generateButton("Rechazar", () => handleButtonAceptadoArr(valor))}
          expand={true}
          hidden={valor.descripcion}
          loading={false}
          expanded={expandedCardIndex === index}
          onExpand={() => handleExpandCard(index)}
        />
      </div>
    ));
  
    const rechazadoCards = rechazado.map((valor, index) => (
      <div key={index}>
        <CardPerro
          url={valor.message}
          nombre={valor.nombre}
          buttons={generateButton("Aceptar", () => handleButtonRechazadoArr(valor))}
          expand={true}
          hidden={valor.descripcion}
          loading={false}
          expanded={expandedCardIndex === (index + aceptado.length)}
          onExpand={() => handleExpandCard(index + aceptado.length)}
        />
      </div>
    ));
  
  function generateButton(label, onClickHandler) {
    return (
      <Button variant="contained" color="secondary" onClick={onClickHandler}>{`¿${label}?`}</Button>
    );
  }

  return (
    <>
      <Box sx={{width:'100%'}}>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          <Grid item xs>
            <CardPerro url={perrito?.message} error={isError} buttons={buttonsAR} nombre={perrito?.nombre} content={perrito?.descripcion} expand={false} loading={isLoading} />
          </Grid>
          <Grid item xs className='scroll'>
            {aceptadoCards}
          </Grid>
          <Grid item xs className='scroll'>
            {rechazadoCards}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
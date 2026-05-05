import React from 'react';
import SuperheroForm from '../components/Form';
import { useNavigate } from 'react-router-dom'; 

const CreateSuperheroPage = () => {
  const navigate = useNavigate(); 

  
  const handleSuperheroCreated = () => {
    alert("¡Superhéroe creado con éxito!"); 
    navigate('/'); 
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Crear Nuevo Superhéroe</h2>
      <SuperheroForm onSuperheroCreated={handleSuperheroCreated} />
    </div>
  );
};

export default CreateSuperheroPage;
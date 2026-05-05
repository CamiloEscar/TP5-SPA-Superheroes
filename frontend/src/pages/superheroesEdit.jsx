import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSuperheroById, updateSuperhero } from '../services/api'; 
import './superheroesEdit.css'

const EditSuperheroPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    name: '',
    real_name: '',
    year: 0, 
    house: '',
    bio: '',
    equipment: [], 
    images: [],    
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [originalName, setOriginalName] = useState('');
  const [originalHouse, setOriginalHouse] = useState('');

  
  useEffect(() => {
    const fetchSuperhero = async () => {
      try {
        const data = await getSuperheroById(id); 
        setFormData({
          name: data.name || '',
          real_name: data.real_name || '',
          year: data.year || 0,
          house: data.house || '',
          bio: data.bio || '',
          equipment: data.equipment || [],
          images: data.images || [],
        });
        setOriginalName(data.name);    
        setOriginalHouse(data.house);  
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSuperhero();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'equipment' || name === 'images') {
      
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map((item) => item.trim()).filter(Boolean),
      }));
    } else if (name === 'year') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10) || 0, 
       }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null);

    
    const dataToSend = {
        name: formData.name,
        real_name: formData.real_name,
        year: formData.year,
        house: formData.house,
        bio: formData.bio,
        equipment: formData.equipment,
        images: formData.images,
    };

    try {
        
        await updateSuperhero(originalName, originalHouse, dataToSend);
        alert('¡Superhéroe actualizado con éxito!');
        navigate(`/superheroes/${id}`); 
    } catch (err) {
        setError(err.message);
        alert(`Error al actualizar el superhéroe: ${err.message}`);
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
    return <div className="create-page-container">Cargando datos del superhéroe...</div>;
  }

  if (error) {
    return <div className="create-page-container" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="create-page-container">
      <h2>Editar Superhéroe: {originalName}</h2>
      <form onSubmit={handleSubmit} className="superhero-form">
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nombre Real:
          <input
            type="text"
            name="real_name"
            value={formData.real_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Año de Debut:
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </label>
        <label>
          Casa:
          <select name="house" value={formData.house} onChange={handleChange} required>
            <option value="">Selecciona una casa</option>
            <option value="marvel">Marvel</option>
            <option value="dc">DC</option>
            <option value="other">Otro</option>
          </select>
        </label>
        <label>
          Biografía:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Equipo (separado por comas):
          <input
            type="text"
            name="equipment"
            value={formData.equipment.join(', ')}
            onChange={handleChange}
          />
        </label>
        <label>
          Imágenes (URLs o nombres de archivo, separados por comas):
          <input
            type="text"
            name="images"
            value={formData.images.join(', ')}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Actualizando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default EditSuperheroPage;
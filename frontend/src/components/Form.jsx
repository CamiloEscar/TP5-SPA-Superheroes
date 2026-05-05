import React, { useState } from 'react';
import './form.css';

const SuperheroForm = ({ onSuperheroCreated }) => {
  
  const [name, setName] = useState('');
  const [real_name, setRealName] = useState('');
  const [year, setYear] = useState('');
  const [house, setHouse] = useState('');
  const [bio, setBio] = useState('');
  const [equipment, setEquipment] = useState('');
  const [images, setImages] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  
  const getHouseLogo = () => {
    const lowerCaseHouse = house.toLowerCase();
    if (lowerCaseHouse === 'marvel') {
      return '/images/marvel.jpg'; 
    }
    if (lowerCaseHouse === 'dc') {
      return '/images/dc.jpg';     
    }
    return null; 
  };

  
  const getSuperheroImagePreview = () => {
    const imageArray = images.split(',').map(item => item.trim()).filter(item => item !== '');
    if (imageArray.length > 0) {
      return `/images/${imageArray[0]}`; 
    }
    return '/images/placeholder.png'; 
  };

  const handleImagePreviewError = (e) => {
    e.target.src = '/images/placeholder.jpg'; 
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');
    setError('');

    const newSuperhero = {
      name,
      real_name,
      year: parseInt(year, 10),
      house,
      equipment: equipment.split(',').map(item => item.trim()).filter(item => item !== ''),
      images: images.split(',').map(item => item.trim()).filter(item => item !== ''),
      bio,
    };

    try {
      const response = await fetch('http://localhost:8000/superheroes/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSuperhero),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al crear el superhéroe');
      }

      const data = await response.json();
      setMessage(data.message);
      if (onSuperheroCreated) {
        onSuperheroCreated(); 
      }
      
      setName('');
      setRealName('');
      setYear('');
      setHouse('');
      setBio('');
      setEquipment('');
      setImages('');

    } catch (err) {
      setError(err.message);
      console.error("Error al crear superhéroe:", err);
    } finally {
      setLoading(false);
    }
  };

  const houseLogoSrc = getHouseLogo(); 

  return (
    <div className="superhero-form-wrapper"> 
      <div className="superhero-form-container">
        <form onSubmit={handleSubmit} className="superhero-form">
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="real_name">Nombre Real:</label>
            <input
              type="text"
              id="real_name"
              value={real_name}
              onChange={(e) => setRealName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Año de Debut:</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>

          
          <div className="form-group house-input-group">
            <label htmlFor="house">Casa (Marvel/DC):</label>
            <input
              type="text"
              id="house"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              required
            />
            {houseLogoSrc && (
              <img src={houseLogoSrc} alt={`${house} logo`} className="house-logo" />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biografía:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="5"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="equipment">Equipo (separado por comas):</label>
            <input
              type="text"
              id="equipment"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="ej: martillo, escudo, telarañas"
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Nombres de Imágenes (separado por comas):</label>
            <input
              type="text"
              id="images"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              placeholder="ej: spiderman1.png,spiderman2.png"
            />
            
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Superhéroe'}
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

     
      <div className="superhero-image-preview">
        <h3>Previsualización de Imagen</h3>
        <img
          src={getSuperheroImagePreview()}
          alt="Previsualización de la imagen del superhéroe"
          onError={handleImagePreviewError}
          className="preview-image"
        />
        <p>Imagen: {getSuperheroImagePreview().replace('/images/', '')}</p>
      </div>
    </div>
  );
};

export default SuperheroForm;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSuperheroById } from '../services/api'; 
import './superheroesDetail.css'; 

const SuperheroDetailPage = () => {
  const { id } = useParams(); 
  const [superhero, setSuperhero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  useEffect(() => {
    const fetchSuperhero = async () => {
      try {
        const data = await getSuperheroById(id);
        setSuperhero(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSuperhero();
  }, [id]); 

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Cargando información del superhéroe...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (!superhero) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Superhéroe no encontrado.</div>;
  }

  
  const images = superhero.images || [];
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageError = (e) => {
    e.target.src = '/images/placeholder.jpg'; 
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${superhero.name}? Esta acción es irreversible.`)) {
      try {
        await deleteSuperheroByName(superhero.name);
        alert(`¡${superhero.name} eliminado correctamente!`);
        navigate('/'); // Redirige a la lista después de eliminar
      } catch (err) {
        alert(`Error al eliminar a ${superhero.name}: ${err.message}`);
        console.error('Error deleting superhero:', err);
      }
    }
  };

  return (
    <div className="superhero-detail-page">      
      <button onClick={handleDelete} className="delete-button">
            Eliminar Superhéroe
      </button>
      <Link to={`/superheroes/edit/${id}`} className="edit-button">
            Editar Superhéroe
      </Link>

      <div className="detail-content">
        <div className="detail-carousel">
          {images.length > 0 ? (
            <>
              <img
                src={`/images/${images[currentImageIndex]}`}
                alt={`${superhero.name} imagen ${currentImageIndex + 1}`}
                onError={handleImageError}
              />
              {images.length > 1 && ( 
                <div className="carousel-controls">
                  <button onClick={handlePrev}>⬅️</button>
                  <button onClick={handleNext}>➡️</button>
                </div>
              )}
            </>
          ) : (
            <img src="/images/placeholder.jpg" alt="No image available" />
          )}
        </div>
        <div className="detail-info">
          <h1>{superhero.name}</h1>
          <p><strong>Nombre real:</strong> {superhero.real_name}</p>
          <p><strong>Año de debut:</strong> {superhero.year}</p>
          <p><strong>Casa:</strong> {superhero.house}</p>
          <p><strong>Biografía:</strong> {superhero.bio}</p>
          <p><strong>Equipo:</strong> {superhero.equipment && superhero.equipment.length > 0 ? superhero.equipment.join(', ') : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetailPage;
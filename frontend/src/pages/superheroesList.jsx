
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

import { getSuperheroes, getSuperheroesByHouse } from '../services/api';
import './superheroesList.css';


const SuperheroesListPage = ({ filterHouse, searchTerm }) => {
  const [superheroes, setSuperheroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (filterHouse === 'all') {
          data = await getSuperheroes();
        } else {
          data = await getSuperheroesByHouse(filterHouse);
        }
        setSuperheroes(data);
        
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = data.filter(hero =>
          (hero.name && hero.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (hero.house && hero.house.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (hero.powers && hero.powers.some(power => power.toLowerCase().includes(lowerCaseSearchTerm)))
        );
        setFilteredHeroes(results); 
      } catch (err) {
        setError(err.message || 'Error al cargar los superhéroes.');
        console.error("Error fetching superheroes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filterHouse, searchTerm]);

  if (loading) {
    return <p className="loading-message">Cargando superhéroes...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="superheroes-list-page">
            <h1 className="page-title">Lista de Superhéroes y Villanos</h1>

      {filteredHeroes.length === 0 && !loading && (
        <p className="no-results-message">No se encontraron superhéroes que coincidan con la búsqueda.</p>
      )}

      {filteredHeroes.length > 0 && (
        <div className="superheroes-grid">
          {filteredHeroes.map((hero) => (
            <Card key={hero._id} hero={hero} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SuperheroesListPage;
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import SuperheroesListPage from './pages/superheroesList';
import CreateSuperheroPage from './pages/superheroesCreate';
import SuperheroDetailPage from './pages/superheroesDetail';
import EditSuperheroPage from './pages/superheroesEdit';

import './App.css';

const App = () => {
  const [filterHouse, setFilterHouse] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleFilter = (house) => {
    setFilterHouse(house);
    setSearchTerm('');
    navigate('/');
  };

  return (
    <div className="app-container">

      <nav className="navbar">

        <div className="nav-left">
          <h2 className="logo">Superheroes</h2>

          <button className={filterHouse === 'all' ? 'active' : ''} onClick={() => handleFilter('all')}>
            Home
          </button>

          <button className={filterHouse === 'marvel' ? 'active marvel' : 'marvel-btn'} onClick={() => handleFilter('marvel')}>
            Marvel
          </button>

          <button className={filterHouse === 'dc' ? 'active dc' : 'dc-btn'} onClick={() => handleFilter('dc')}>
            DC
          </button>

          <Link to="/create" className="create-btn">
            Crear Heroe/Villano 
          </Link>
        </div>

        <div className="nav-right">
          <input
            className="search"
            type="text"
            placeholder="Buscar héroe..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              navigate('/');
            }}
          />
        </div>

      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={
            <SuperheroesListPage
              filterHouse={filterHouse}
              searchTerm={searchTerm}
            />
          } />
          <Route path="/create" element={<CreateSuperheroPage />} />
          <Route path="/superheroes/:id" element={<SuperheroDetailPage />} />
          <Route path="/superheroes/edit/:id" element={<EditSuperheroPage />} />
        </Routes>
      </main>

    </div>
  );
};

export default App;
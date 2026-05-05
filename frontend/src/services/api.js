const API_BASE_URL = 'http://localhost:8000';

export async function getSuperheroes() {
    const response = await fetch(`${API_BASE_URL}/superheroes`);

    if (!response.ok) {
        throw new Error("Error al cargar los superhéroes");
    }

    return await response.json();
}

export const getSuperheroById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/superheroes/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Superhéroe no encontrado.");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching superhero with ID ${id}:`, error);
    throw error;
  }
};


export const getSuperheroesByHouse = async (house) => {
  const response = await fetch (`${API_BASE_URL}/superheroes/house/${house.toLowerCase()}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const updateSuperhero = async (originalName, originalHouse, updatedData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/superheroes/update?name=${encodeURIComponent(originalName)}&house=${encodeURIComponent(originalHouse)}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Envía los datos actualizados en el cuerpo
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al actualizar el superhéroe.');
        }

        return await response.json(); // Devuelve el mensaje de éxito del backend
    } catch (error) {
        console.error('Error en updateSuperhero:', error);
        throw error;
    }
};


export const deleteSuperheroByName = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/superheroes/delete?name=${encodeURIComponent(name)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al eliminar el superhéroe.');
        }

        return await response.json(); 
         } catch (error) {
        console.error('Error en deleteSuperheroByName:', error);
        throw error; 
    }
  };

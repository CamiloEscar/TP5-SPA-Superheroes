import { Link } from 'react-router-dom';
import "./card.css";

const Card = ({ hero }) => {
  const { _id, name, images } = hero; 

  const handleImageError = (e) => {
    e.target.src = '/images/placeholder.jpg'; 
  };

  const imageUrl = (Array.isArray(images) && images.length > 0) 
                   ? `/images/${images[0]}` 
                   : '/images/placeholder.jpg';

  return (
    <Link to={`/superheroes/${_id}`} className="card-link">
      <div className="card">
        <div className="card-image-display"> 
          <img
          src={imageUrl}
          alt={`${name} imagen`}
          onError={handleImageError}
          />
        </div>

        <div className="card-info">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;
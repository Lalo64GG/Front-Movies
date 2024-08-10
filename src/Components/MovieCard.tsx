import { useState } from 'react';
import { Movie } from '../tools/types/typeMovie';
import Modal from './Modal';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);

  const handleOpen = () => SetIsOpen(true);

  const truncatedOverview = movie.overview.length > 150
    ? `${movie.overview.substring(0, 150)}...`
    : movie.overview;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full "
      />
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
        <p className="text-gray-600 mb-4">
          {isExpanded ? movie.overview : truncatedOverview}
          {movie.overview.length > 150 && (
            <button
              className="text-blue-500 underline ml-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Leer menos' : 'Leer más'}
            </button>
          )}
        </p>
        {movie.tagline && (
          <p><strong>Tagline:</strong> {movie.tagline}</p>
        )}
        {movie.homepage && (
          <a
            href={movie.homepage}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            More information
          </a>
        )}
      </div>
      <div className="p-4">
        <button onClick={handleOpen} className="bg-[#003366] rounded-md shadow-md p-2 text-white w-full  hover:bg-sky-600 text-lg font-bold  active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out lg:px-4">Invite</button>
      </div>
      <Modal isOpen={ isOpen } onClose={ () => SetIsOpen(false)} movieTitle={movie.title}/> 
    </div>
  );
};

export default MovieCard;

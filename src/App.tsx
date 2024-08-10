import { useState, useEffect } from 'react';
import MovieCard from './Components/MovieCard';
import { useGet } from './tools/hooks/useGet';
import { Movie } from './tools/types/typeMovie';
import { PagNavigation } from './Components/PagNavigation';
import Navbar from './Components/NavBard';
import WelcomeModal from './Components/ModalWelcome';
import { useDebounce } from './tools/hooks/useDebounce';
import {Loader} from './Components/Loader';
import { SkeletonCard } from './Components/SkeletonCard';

const App = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: movies, loading, error, totalPages } = useGet(page, debouncedSearchTerm);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsModalOpen(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page when search changes
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Navbar onSearchChange={handleSearchChange} />
    <WelcomeModal isOpen={isModalOpen} onClose={closeModal} />
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mt-22 mt-32">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : movies && movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <PagNavigation page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  </>
  );
};

export default App;

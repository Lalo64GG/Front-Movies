// src/tools/hooks/useGet.ts
import { useState, useEffect } from 'react';

const API_KEY = '70df5f1c4d6a58eb94fdb35f5fee646e';
const BASE_URL = 'https://api.themoviedb.org/3';

export const useGet = (page: number, searchTerm: string = '') => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = searchTerm
          ? `${BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}&page=${page}&api_key=${API_KEY}`
          : `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const result = await response.json();
        setData(result.results);
        setTotalPages(result.total_pages);
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchTerm]);

  return { data, loading, error, totalPages };
};

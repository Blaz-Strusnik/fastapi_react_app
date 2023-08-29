import React, { useState } from 'react';
import httpClient from '../utils/httpClient'



export function MovieSearch() {
  const [title, setTitle] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);
  const [error, setError] = useState(null);

  const fetchMovieInfo = async (movieTitle) => {
    try {
      const response = await httpClient(`/api/movie/${movieTitle}`, {});
      setMovieInfo(response.json);
      setError(null);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setError('An error occurred while fetching movie data.');
    }
  };
  const handleFetchClick = () => {
    fetchMovieInfo(title);
  };
  return  (
    <div>
      <input
        type="text"
        placeholder="Enter movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleFetchClick}>Fetch Movie Info</button>
      
      {error && <p>Error: {error}</p>}
      
      {movieInfo && (
        <div>
          <h2>Movie Information</h2>
          <p>Title: {movieInfo.Title}</p>
          <p>Director: {movieInfo.Director}</p>
          <p>Year: {movieInfo.Year}</p>
          <p>Rated: {movieInfo.Rated}</p>
          <p>Released: {movieInfo.Released}</p>
          <p>Runtime: {movieInfo.Runtime}</p>
          <p>Genre: {movieInfo.Genre}</p>
          <p>Director: {movieInfo.Director}</p>
          <p>Writer: {movieInfo.Writer}</p>
          <p>Actors: {movieInfo.Actors}</p>
          <p>Plot: {movieInfo.Plot}</p>
          <p>Language: {movieInfo.Language}</p>
          <p>Country: {movieInfo.Country}</p>
          <p>Awards: {movieInfo.Awards}</p>
          <p>Poster: <img src={movieInfo.Poster} alt="Movie Poster" /></p>
          <p>Metascore: {movieInfo.Metascore}</p>
          <p>imdbRating: {movieInfo.imdbRating}</p>
          <p>imdbVotes: {movieInfo.imdbVotes}</p>
          <p>imdbID: {movieInfo.imdbID}</p>
          <p>Type: {movieInfo.Type}</p>
          <p>DVD: {movieInfo.DVD}</p>
          <p>BoxOffice: {movieInfo.BoxOffice}</p>
          <p>Production: {movieInfo.Production}</p>
          <p>Website: {movieInfo.Website}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;

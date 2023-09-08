import React, { useState } from 'react';
import httpClient from '../utils/httpClient'
import { TextField, Button, Typography, Paper } from '@mui/material';

interface MovieInfo {
  Title: string;
  Director: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Poster: string;
}

export function MovieSearch() {
  const [title, setTitle] = useState('');
  const [movieInfo, setMovieInfo] = useState<MovieInfo>();
  const [error, setError] = useState<string | null>(null);

  const fetchMovieInfo = async (movieTitle: string) => {
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
    <TextField
      label="Enter movie title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      fullWidth
      variant="outlined"
      margin="normal"
    />
    <Button onClick={handleFetchClick} variant="contained" color="primary">
      Fetch Movie Info
    </Button>

    {error && <Typography color="error">Error: {error}</Typography>}

    {movieInfo && (
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6">Movie Information</Typography>
        <Typography>Title: {movieInfo.Title}</Typography>
        <Typography>Director: {movieInfo.Director}</Typography>
        <Typography>Year: {movieInfo.Year}</Typography>
        <Typography>Rated: {movieInfo.Rated}</Typography>
        <Typography>Released: {movieInfo.Released}</Typography>
        <Typography>Runtime: {movieInfo.Runtime}</Typography>
        <Typography>Genre: {movieInfo.Genre}</Typography>
        <Typography>Writer: {movieInfo.Writer}</Typography>
        <Typography>Actors: {movieInfo.Actors}</Typography>
        <Typography>Plot: {movieInfo.Plot}</Typography>
        <Typography>Language: {movieInfo.Language}</Typography>
        <Typography>Country: {movieInfo.Country}</Typography>
        <Typography>Awards: {movieInfo.Awards}</Typography>
        <Typography>Metascore: {movieInfo.Metascore}</Typography>
        <Typography>imdbRating: {movieInfo.imdbRating}</Typography>
        <Typography>imdbVotes: {movieInfo.imdbVotes}</Typography>
        <Typography>imdbID: {movieInfo.imdbID}</Typography>
        <Typography>Type: {movieInfo.Type}</Typography>
        <Typography>DVD: {movieInfo.DVD}</Typography>
        <Typography>BoxOffice: {movieInfo.BoxOffice}</Typography>
        <Typography>Production: {movieInfo.Production}</Typography>
        <Typography>Website: {movieInfo.Website}</Typography>
        <img src={movieInfo.Poster} alt="Movie Poster" style={{ marginTop: '10px' }} />
      </Paper>
    )}
  </div>
  );
}

export default MovieSearch;

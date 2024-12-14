import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [numRecommendations, setNumRecommendations] = useState(5); // Initial number of recommendations
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const fetchRecommendations = useCallback(async () => {
    const payload = {
      user_id: 122,
      watchedMovies: watchedMovies.map(movie => movie.id),
      num_recommendations: numRecommendations,
    };

    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setRecommendations(data.recommended_movie_details || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  }, [watchedMovies, numRecommendations]);

  const markAsWatched = useCallback((movie) => {
    setWatchedMovies(prev => [...prev, movie]);
    setRecommendations(prev => prev.filter(m => m.id !== movie.id));
    setNumRecommendations(prev => prev + 2); // Increment the counter by 2
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>Movie Recommendation System</Typography>
          <Button color="inherit" onClick={handleMenuOpen}>Genres</Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {["All", "Sci-Fi", "Action", "Drama", "Romance"].map(genre => (
              <MenuItem key={genre} onClick={() => setSelectedGenre(genre)}>
                {genre}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Recommendations{selectedGenre !== "All" ? ` - ${selectedGenre}` : ""}
        </Typography>
        <Grid container spacing={2}>
          {recommendations.filter(movie => selectedGenre === "All" || movie.genres.split('|').includes(selectedGenre)).map(movie => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2">{movie.genres.replace('|', ', ')}</Typography>
                  <Chip label={movie.releaseYear} style={{ margin: "5px 0" }} />
                  <Button variant="contained" color="primary" onClick={() => markAsWatched(movie)}>
                    Mark as Watched
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
          Watched Movies
        </Typography>
        <Grid container spacing={2}>
          {watchedMovies.map(movie => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2">{movie.genres.replace('|', ', ')}</Typography>
                  <Chip label={movie.releaseYear} style={{ margin: "5px 0" }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;

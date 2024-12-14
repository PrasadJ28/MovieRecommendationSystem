import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

function UserDashboard({ watchedMovies, likedMovies }) {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Dashboard
      </Typography>
      <Typography variant="h6">Movies Watched: {watchedMovies.length}</Typography>
      <Grid container spacing={2}>
        {watchedMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{movie.title}</Typography>
                <Typography variant="body2">{movie.genre}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Movies Liked: {likedMovies.length}
      </Typography>
      <Grid container spacing={2}>
        {likedMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{movie.title}</Typography>
                <Typography variant="body2">{movie.genre}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UserDashboard;

import React from "react";
import { Card, CardContent, Button, Typography, Chip } from "@mui/material";

function MovieCard({ movie, onToggleWatched, onToggleLiked, isWatched, isLiked }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{movie.title}</Typography>
        <Typography variant="body2">{movie.genre}</Typography>
        <Chip label={movie.releaseYear} style={{ margin: "5px 0" }} />
        <div>
          <Button
            variant="contained"
            color={isLiked ? "success" : "primary"}
            onClick={onToggleLiked}
          >
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button
            variant="outlined"
            color={isWatched ? "success" : "primary"}
            onClick={onToggleWatched}
            style={{ marginLeft: "10px" }}
          >
            {isWatched ? "Watched" : "Mark as Watched"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default MovieCard;

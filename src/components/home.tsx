import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Box, Button, Typography, TextField } from "@mui/material";

type PropType = {
  accessToken: string;
};

const LoggedIn: React.VFC<PropType> = ({ accessToken }) => {
  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(accessToken);

  return (
    <Box>
      <Typography>search</Typography>
      <TextField variant="standard"></TextField>
      <Button variant="contained">search</Button>
    </Box>
  );
};

export default LoggedIn;

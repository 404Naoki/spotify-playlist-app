import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Box, Button } from "@mui/material";

type PropType = {
  accessToken: string;
};

const SearchResult: React.VFC<PropType> = ({ accessToken }) => {
  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(accessToken);

  return <Box></Box>;
};

export default SearchResult;

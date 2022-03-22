import React, { useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Box, Button, Typography, TextField } from "@mui/material";
import SearchResult from "./searchResult";

type PropType = {
  accessToken: string;
};

const LoggedIn: React.VFC<PropType> = ({ accessToken }) => {
  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(accessToken);

  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>(null);

  const search = async () => {
    await spotify.searchTracks(searchText).then(
      (data) => {
        console.log("search success");
        setSearchResult(data.tracks);
      },
      (err: any) => {
        console.log("Something went wrong!", err);
      }
    );
  };

  const handleChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <Box>
      <Typography>search</Typography>
      <TextField
        variant="standard"
        value={searchText}
        onChange={handleChangeSearchText}
      ></TextField>
      <Button variant="contained" onClick={search}>
        search
      </Button>
      <SearchResult
        accessToken={accessToken}
        tracks={searchResult?.items}
      ></SearchResult>
    </Box>
  );
};

export default LoggedIn;

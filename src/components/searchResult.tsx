import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type TrackItem = {
  album: {
    href: string;
    name: string;
    images: { url: string; height: number }[];
  };
  artists: { href: string; name: string }[];
  href: string;
  id: string;
  name: string;
  uri: string;
  duration_ms: number;
};

type PropType = {
  accessToken: string;
  tracks: TrackItem[] | null;
};

const SearchResult: React.VFC<PropType> = ({ accessToken, tracks }) => {
  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(accessToken);
  console.log(tracks);

  const joinArtistName = (track: TrackItem) => {
    const artistList = track.artists.map((artist) => artist.name);
    return artistList.join(", ");
  };

  const createPlayList = (trackIdx: number) => {
    if (tracks) {
      const track = tracks[trackIdx];
      const trackSeed = track.id;
      spotify
        .getRecommendations({
          min_energy: 0.4,
          seed_tracks: [trackSeed],
          min_popularity: 50,
          market: "JP",
          limit: 30,
        })
        .then(
          (recommendationsData) => {
            const recommendations = recommendationsData.tracks;
            const recommendationsSeeds = recommendations.map((track) => {
              return `spotify:track:${track.id}`;
            });
            spotify.getMe().then((me) => {
              const userId = me.id;
              spotify
                .createPlaylist(userId, {
                  name: `${track.name} recommendations`,
                  description: `${track.name} recommendations`,
                  public: false,
                })
                .then(
                  (playListData) => {
                    const playListSeed = playListData.id;
                    spotify
                      .addTracksToPlaylist(playListSeed, recommendationsSeeds)
                      .then(
                        function (data) {
                          console.log("Added tracks to playlist!");
                        },
                        (err) => {
                          console.log("add track", err);
                        }
                      );
                  },
                  (err) => {
                    console.log("create playlist", err);
                  }
                );
            });
          },
          (err) => {
            console.log("Something went wrong!", err);
          }
        );
    }
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>cover</TableCell>
              <TableCell>title</TableCell>
              <TableCell>artist</TableCell>
              <TableCell>album</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks?.map((track, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>
                    <img
                      src={track.album.images[2].url}
                      alt={track.album.name}
                    />
                  </TableCell>
                  <TableCell>{track.name}</TableCell>
                  <TableCell>{joinArtistName(track)}</TableCell>
                  <TableCell>{track.album.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => createPlayList(idx)}
                    >
                      create playlist
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SearchResult;

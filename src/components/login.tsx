import React from "react";
import { accessUrl } from "../spotify";
import { Box, Button, Typography } from "@mui/material";

const Login: React.VFC = () => {
  return (
    <Box className="Login">
      <Typography>ログイン前です</Typography>
      <Button variant="contained" href={accessUrl}>
        spotifyへログイン
      </Button>
    </Box>
  );
};

export default Login;

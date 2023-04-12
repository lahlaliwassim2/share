import {Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
const fetch = require('node-fetch');

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [joke, setJoke] = useState("");

  useEffect(() => {
    getJoke();
  }, []);

  async function getJoke() {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
    setJoke(data);
  }

  return (

    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Blagues
        </Typography>
        <Typography color={medium}>{joke?.created_at}</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={"http://localhost:3001/assets/jokes-icon-3.jpg"}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>wassimJokes</Typography>
        <Typography color={medium}>wassimJokes.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {joke.value}
      </Typography>
      <Button
      borderRadius={25}
      onClick={getJoke}
      >Voir une autre</Button>
    </WidgetWrapper>
  );
};

export default AdvertWidget;

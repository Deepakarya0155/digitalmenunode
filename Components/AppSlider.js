import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function AppSilder({ count, setCount, step }) {
  return (
    <Box>
      <Slider
        aria-label="Temperature"
        defaultValue={0}
        // getAriaValueText={(v) => setCount(v)}
        valueLabelDisplay="auto"
        step={step}
        marks
        min={0}
        max={100}
        value={count}
        onChange={(event) => setCount(event.target.value)}
      />
    </Box>
  );
}

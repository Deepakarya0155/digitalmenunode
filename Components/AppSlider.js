import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function AppSilder({ count, setCount, step }) {
  const [max, setMax] = React.useState(5);
  const [c, setC] = React.useState(count);

  React.useEffect(() => {
    if (max <= c) {
      setMax(max + 5);
    }
  }, [c]);

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
        max={max}
        value={count}
        onChange={(event) => {
          setC(event.target.value);
          setCount(event.target.value);
        }}
      />
    </Box>
  );
}

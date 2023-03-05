import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Grid } from "@mui/material";

export default function VegNonVegSelector({ response }) {
  const onChange = (event) => {
    response(event.target.value);
  };
  return (
    <Grid
      container
      justifyContent={"end"}
      sx={{
        color: "white",
        fontFamily: "'Oswald', sans-serif",
        textTransform: "uppercase",
      }}
    >
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={onChange}
          defaultValue={"A"}
        >
          <FormControlLabel value="A" control={<Radio />} label="All" />
          <FormControlLabel value="V" control={<Radio />} label="Veg" />
          <FormControlLabel value="N" control={<Radio />} label="Non Veg" />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
}

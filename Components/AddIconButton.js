import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { IconButton } from "@mui/material";

export const AddIconButton = ({ onClickFunction }) => {
  const iconSX = { fontSize: 30, pt: 0 };
  return (
    <IconButton color="primary" onClick={onClickFunction}>
      <AddCircleOutlinedIcon sx={iconSX}></AddCircleOutlinedIcon>
    </IconButton>
  );
};

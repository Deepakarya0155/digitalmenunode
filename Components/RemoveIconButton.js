import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { IconButton } from "@mui/material";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";

export const RemoveIconButton = ({ onClickFunction }) => {
  const iconSX = { fontSize: 30, pt: 0 };
  return (
    <IconButton color="primary" onClick={onClickFunction}>
      <RemoveCircleOutlinedIcon sx={iconSX}></RemoveCircleOutlinedIcon>
    </IconButton>
  );
};

import { ListItem, styled } from "@mui/material";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
    borderRadius: 5,
    transition: "background-color .3s ease-in-out",
  },
}));

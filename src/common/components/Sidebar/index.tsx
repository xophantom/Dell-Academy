import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Routes } from "@/routes";
import { StyledLink } from "./Sidebar.styles";

export const Sidebar = () => {
  return (
    <div>
      <List>
        <StyledLink href={Routes.ConsultarTrechosModalidades}>
          <ListItem button key="Consultar Trechos x Modalidade">
            <ListItemIcon>
              <LocalShippingIcon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Consultar Trechos x Modalidade" />
          </ListItem>
        </StyledLink>
        <StyledLink href={Routes.CadastrarTransporte}>
          <ListItem button key="Cadastrar transporte">
            <ListItemIcon>
              <AssignmentIcon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Cadastrar transporte" />
          </ListItem>
        </StyledLink>
        <StyledLink href={Routes.DadosEstatisticos}>
          <ListItem button key="Dados estatísticos">
            <ListItemIcon>
              <BarChartIcon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Dados estatísticos" />
          </ListItem>
        </StyledLink>
      </List>
    </div>
  );
};

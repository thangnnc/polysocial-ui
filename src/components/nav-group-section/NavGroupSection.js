import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Badge, Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

NavGroupSection.propTypes = {
  data: PropTypes.array,
};

export default function NavGroupSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 0 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info, notiCount = 0 } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        fontWeight: "fontWeightBold",
        "&:hover": {
          bgcolor: "#ffddc7",
          borderColor: "#ff7b29",
        },
        "&.active": {
          bgcolor: "#ffddc7",
          borderColor: "#ff7b29",
        },
      }}
    >
      <Badge
        badgeContent={notiCount}
        color="error"
        overlap="circular"
        sx={{ mr: 2 }}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      </Badge>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}

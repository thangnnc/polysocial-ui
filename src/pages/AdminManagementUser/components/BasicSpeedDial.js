import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Iconify from "../../../components/iconify";

export default function BasicSpeedDial({ handleExport }) {
  const actions = [
    {
      icon: <Iconify icon="fa-solid:file-export" />,
      name: "Export",
      onClick: handleExport,
    },
  ];

  return (
    <Box sx={{}}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            sx={{ width: 54, height: 54 }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

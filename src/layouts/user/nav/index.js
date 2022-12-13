import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NavUserSection from "../../../components/nav-user-section/NavUserSection";
import AvatarStatus from "../../../utils/AvatarStatus/AvatarStatus";
import useLogin from "../../../utils/Login/useLogin";
import navUserConfig from "./config";

export default function NavUser() {
  const { account } = useLogin();
  
  return (
    <Box sx={{width: "18%",position: "fixed"}}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          p: 3,
        }}
      >
        <Box sx={{ width: "25%" }}>
          <AvatarStatus
            alt="Avatar"
            isActive={true}
            src={account.avatar}
            sx={{ width: 54, height: 54 }}
          />
        </Box>
        <Box sx={{ width: "75%" }}>
          <Typography variant="subtitle2" noWrap fontSize={16}>
            {account.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>
      </Card>

      <Card
        sx={{
          alignItems: "center",
          textAlign: "left",
          mt: 2,
          p: 0
        }}
      >
        <NavUserSection data={navUserConfig} />
      </Card>
    </Box>
  );
}

import { Avatar, Badge, Box, styled } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme, isActive }) => ({
  "& .MuiBadge-badge": {
    width: 12,
    height: 12,
    borderRadius: "50%",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

export default function AvatarStatus({alt, src, sx = {width: 40, height: 40}, isActive}) {
    return (
        <Box>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{"& .MuiBadge-badge": {backgroundColor: isActive ? "#44b700" : "#a5a5a5"}}}
                >
                <Avatar
                    alt={alt}
                    src={src}
                    sx={{border: "2px solid #ff7f30", ...sx}}
                />
            </StyledBadge>
        </Box>
    );
}
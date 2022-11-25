import { Box, Typography } from "@mui/material";
import Iconify from "../iconify";


const Title = ({ children, icon }) => {
    return (
        <Box>
            <Typography sx={{
                fontSize: 32, 
                fontWeight: 'bold', 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4, pb: 1,
                color: '#252525',
                borderBottom: '3px solid #252525'
            }}>
                <Iconify icon={icon} sx={{ width: '30', height: '30', mr: 2, bottom: 0, color: '#ff7b29'}}/> {children}
            </Typography>
        </Box>
    )
}

export default Title;
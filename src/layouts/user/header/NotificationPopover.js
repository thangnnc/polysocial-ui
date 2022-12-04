import { useState } from 'react';
// @mui
import { Avatar, Popover, ListItem, ListItemAvatar, Badge, List, ListItemText, Divider, ListSubheader, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from '@mui/system';
// ----------------------------------------------------------------------

export default function NotificationPopover({ notifications }) {
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Badge 
        badgeContent={4} 
        color="error" 
        overlap="circular" 
        onClick={handleOpen}
      >
        <Avatar sx={{bgcolor: "#ffa36a"}}>
          <NotificationsIcon />
        </Avatar>
      </Badge>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
            maxHeight: "80vh",
          },
        }}
      >
        <Box 
          sx={{ 
            width: 500,
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            bgcolor: '#ffffff', 
            position: 'fixed',
            zIndex: 9999,
            borderBottom: "1px solid #ed6c02"
          }}
        >
          <ListSubheader component="div" id="nested-list-subheader" sx={{fontWeight: 700, fontSize: 18}}>
            Thông báo
          </ListSubheader>

          <Button color="warning" sx={{mr: 1}}>Đánh dấu đã đọc tất cả</Button>
        </Box>
        <List 
          sx={{maxWidth: 500, py: 0, top: 48}}
        >
          <Divider />
          {notifications.map(({ avatar, title, content, isSeen }, index) => (
            <ListItem button key={index} alignItems="flex-start" sx={!isSeen ? {bgcolor: "#ff61003b", borderBottom: "1px solid #ed6c02"} : {borderBottom: "1px solid #ed6c02"}}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={avatar} />
              </ListItemAvatar>
              <ListItemText primary={title} secondary={content}/>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

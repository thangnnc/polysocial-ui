import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Avatar, DialogContentText, Divider, Grid, InputAdornment, Typography } from '@mui/material';
import Iconify from '../../../components/iconify';

const styleInputFullField = {
  width: '100%',
  mb: 3
}

const styleAvatar = {
  width: 180,
  height: 180,
  mx: 'auto',
  mt: 6,
  mb: 4
}

const LayoutFormTwoField = ({children}) => {
  return (
    <Grid container spacing={2} sx={{width:'100%'}}>
      {children}
    </Grid>
  );
}

const genderList = [
  {title: 'Nam', value: true},
  {title: 'Nữ', value: false}
]

const marjorList = [
  {title: 'Ứng Dụng Phần Mềm', value: 'Ứng Dụng Phần Mềm'},
  {title: 'Phát Triển Phần Mềm', value: 'Phát Triển Phần Mềm'},
  {title: 'Lập Trình Di Động', value: 'Lập Trình Di Động'},
  {title: 'Thiết Kế WEB', value: 'Thiết Kế WEB'},
  {title: 'Thiết Kế Đồ Họa', value: 'Thiết Kế Đồ Họa'},
  {title: 'Tự Động Hóa', value: 'Tự Động Hóa'},
]

export const DialogEditUser = ({ open, setOpen, user }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth={1000}>
        <DialogTitle>Chỉnh Sửa Tài Khoản</DialogTitle>
        <Divider/>
        <DialogContent >
          <DialogContentText/>
          <Grid container spacing={2} sx={{width: 800}}>
            <Grid item xs={5}>
              <label for='avatar'>
                <Avatar sx={styleAvatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Typography width="100%" fontSize={24} textAlign="center">
                  Chọn ảnh đại diện
                </Typography>
              </label>
              <TextField 
                id='avatar'
                name="avatar" 
                label="File" 
                type="file"
                sx={{display: 'none'}}
              />
            </Grid>
            
            <Grid item xs={7}>
              <TextField 
                name="email" 
                label="Email" 
                value={user.email}
                variant="standard"
                placeholder="Nhập email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={'entypo:mail'} />
                    </InputAdornment>
                  ),
                }}
                autoComplete='none'
                sx={styleInputFullField}
              />
              <TextField 
                name="fullName" 
                label="Họ Và Tên"
                placeholder='Nhập Họ Và Tên'
                variant='standard'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={'icon-park-solid:edit-name'} />
                    </InputAdornment>
                  ),
                }}
                autoComplete='none'
                sx={styleInputFullField}
              />
              <LayoutFormTwoField>
                <Grid item xs={6}>
                  <TextField 
                    name="studentCode" 
                    label="Mã Sinh Viên"
                    placeholder='Nhập Mã Sinh Viên'
                    variant='standard'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon={'bxs:id-card'} />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete='none'
                    sx={styleInputFullField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    name="course" 
                    label="Khóa Học"
                    placeholder='Nhập Khóa Học'
                    variant='standard'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon={'bi:ticket-perforated-fill'} />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete='none'
                    sx={styleInputFullField}
                  />
                </Grid>
              </LayoutFormTwoField>
              <Autocomplete
                name="major"
                options={marjorList}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon={'bx:code-block'} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <React.Fragment>
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      )
                    }}
                    variant="standard"
                    label="Ngành Học"
                    placeholder="Chọn Ngành Học"
                    sx={styleInputFullField}
                  />
                )}
              />
              <LayoutFormTwoField>
                <Grid item xs={6}>
                  <TextField 
                    name="birthdate" 
                    label="Ngày Sinh"
                    type="date"
                    placeholder='Chọn Ngày Sinh'
                    variant='standard'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon={'material-symbols:date-range'} />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete='none'
                    sx={styleInputFullField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    name="course"
                    options={genderList}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Iconify icon={'ph:gender-intersex-bold'} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <React.Fragment>
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          )
                        }}
                        variant="standard"
                        label="Giới Tính"
                        placeholder="Chọn Giới Tính"
                        sx={styleInputFullField}
                      />
                    )}
                  />
                </Grid>
              </LayoutFormTwoField>
            </Grid>
            
          </Grid>
        </DialogContent>
        <DialogActions sx={{p: "0 24px 12px 24px"}}>
          <Button onClick={handleClose} variant='contained' className='btn-orange'>Tắt Hoạt Động</Button>
          <Button onClick={handleClose} variant='contained' className='btn-red'>Xóa</Button>
          <Button onClick={handleClose} variant='contained' className='btn-secondary'>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
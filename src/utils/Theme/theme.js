import { createTheme } from '@mui/material/styles';

const theme = createTheme({      
  typography: {
    button: {
      textTransform: 'none',
      backgroundColor: '#'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.className  === 'btn-orange' && {
            backgroundColor: '#f97c2e',
            '&:hover': {
              backgroundColor: '#ff6200',
            },
          })
          || (ownerState.className  === 'btn-red' && {
            backgroundColor: '#ff5f5f',
            '&:hover': {
              backgroundColor: '#ff4848',
            },
          })
          || (ownerState.className  === 'btn-secondary' && {
            backgroundColor: '#818181',
            '&:hover': {
              backgroundColor: '#696969',
            },
          })),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState && {
            '&:hover': {
              "& .MuiInputLabel-root": {
                  color: "#f97c2e",
              },
              "& .MuiInputBase-root": {
                "& > fieldset": {
                  borderColor: "#f97c2e",
                }
              }
            },
            "& .Mui-focused": {
              "&.MuiInputLabel-root": {
                color: "#f97c2e",
              },
              "&.MuiInputBase-root": {
                "& > fieldset": {
                  borderColor: "#f97c2e !important",
                }
              }
            },
            "&.rounded .MuiInputBase-root":{
              borderRadius: 50,
              paddingRight: 5
            },
            "&.input-24 input": {
              fontSize: "22px"
            }
          })
        )})
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px'
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:after": {
            borderColor: "#f97c2e",
          },
          "&:hover": {
            borderColor: "#f97c2e",
          }
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            borderBottom: "2px solid #f97c2e",
            color: "#f97c2e",
            zIndex: 9999
          }
        },
      },
    }
    // MuiAutocomplete: {
    //   styleOverrides: {
    //     root: {
    //       "&.MuiAutocomplete-root .MuiInput-root.MuiInputBase-sizeSmall .MuiInput-input": {
    //         padding: '4px 0 5px'
    //       }
    //     },
    //   },
    // }
  }
});

export default theme;
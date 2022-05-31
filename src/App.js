import MusicPlayer from './components/MusicPlayer/MusicPlayer';

import ArtistContext from './components/ArtistInfo/ArtistContext';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          color: '#e53170',
        },
        root: {
          color: '#ff8906',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          color: '#ff8906',
        },
        h5: {
          color: '#ff8906',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f0e17',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#ff8906',
          color: '#fffffe',
        },
        outlinedPrimary: {
          borderColor: '#ff8906',
          color: '#fffffe',
        },
      },
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ArtistContext>
          <Container maxWidth="md">
            <Paper elevation={3}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: '25px' }}
              >
                <Grid item>
                  <Typography variant="h4">JttC Music</Typography>
                </Grid>
                <Grid item>
                  <MusicPlayer />
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </ArtistContext>
      </ThemeProvider>
    </>
  );
}

export default App;

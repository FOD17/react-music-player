import React from 'react';

import ReactHowler from 'react-howler';
import raf from 'raf';

import { PlayList } from '../ArtistInfo/ArtistContext';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

export default function MusicPlayer() {
  let musicRef = React.useRef();
  const [duration, setDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [seek, setSeek] = React.useState(0);
  const [isSeeking, setIsSeeking] = React.useState(false);

  const playList = React.useContext(PlayList);
  const [trackIndex, setTrackIndex] = React.useState(0);

  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => setSeek(musicRef.current.seek()), 1000);

      return () => clearTimeout(timer);
    }
  }, [seek, isSeeking, isPlaying]);

  React.useEffect(() => {
    clearRaf();
  }, [seek, isSeeking]);

  const handleOnLoad = () => {
    setDuration(musicRef.current.duration());
    setIsPlaying(!isPlaying);
    musicRef.current.playing = true;
  };

  const handleOnPlay = () => {
    if (musicRef.current !== null) {
      setIsPlaying(true);
      musicRef.current.playing = true;
    }
  };

  const handleOnPause = () => {
    if (musicRef.current !== null) {
      setIsPlaying(false);
      musicRef.current.playing = false;
    }
  };

  const playPreviousSong = () => {
    const listingLength = playList.playlist.length;
    setIsPlaying(false);
    musicRef.current.stop();

    if (trackIndex - 1 < 0) {
      setTrackIndex(listingLength - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }

    setIsPlaying(true);
    musicRef.current.playing = true;
  };

  const playNextSong = () => {
    console.log('ass');
    const listingLength = playList.playlist.length;
    setIsPlaying(false);
    musicRef.current.stop();

    if (trackIndex + 1 >= listingLength - 1) {
      setTrackIndex(0);
    }

    if (trackIndex + 1 <= listingLength - 1) {
      setTrackIndex(trackIndex + 1);
    }

    setIsPlaying(true);
    musicRef.current.playing = true;
  };

  const handleSeekChange = (e) => {
    musicRef.current.seek(e.target.value);
    setSeek(parseFloat(e.target.value));
  };

  const handleMouseDownSeek = () => {
    setIsSeeking(true);
  };

  const handleMouseUpSeek = (e) => {
    setIsSeeking(false);
    musicRef.current.seek(e.target.value);
  };

  const clearRaf = () => {
    raf.cancel(raf);
  };

  return (
    <div className="audio-wrapper">
      <ReactHowler
        src={playList.playlist[trackIndex].music}
        playing={isPlaying}
        onPlay={() => handleOnPlay()}
        onLoad={() => handleOnLoad()}
        ref={musicRef}
      />
      <Box
        sx={{
          margin: '20px 0px',
          '& img': {
            height: '40%',
            width: '30%',
            margin: 'auto',
            display: 'block',
          },
        }}
      >
        <img src={playList.playlist[trackIndex].artwork} alt="cover art" />
      </Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h5">
            {playList.playlist[trackIndex].artist}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {playList.playlist[trackIndex].trackTitle}
          </Typography>
        </Grid>
      </Grid>

      {/* <label>
          Seek:
          <span className="slider-container">
            <input
              type="range"
              min="0"
              max={duration ? duration.toFixed(2) : 0}
              step=".01"
              value={seek}
              onChange={(e) => handleSeekChange(e)}
              onMouseDown={() => handleMouseDownSeek()}
              onMouseUp={(e) => handleMouseUpSeek(e)}
            />
          </span>
        </label> */}
      <Box
        sx={{
          width: '70%',
          margin: 'auto',
        }}
      >
        <Slider
          value={seek}
          min={0}
          max={duration ? parseInt(duration.toFixed(2)) : 0}
          step={0.01}
          onChange={(e) => handleSeekChange(e)}
          onMouseDown={() => handleMouseDownSeek()}
          onMouseUp={(e) => handleMouseUpSeek(e)}
          sx={{ width: '100%' }}
        />
      </Box>
      <Grid
        container
        direction={'row'}
        justifyContent={'center'}
        sx={{
          margin: '20px 0px',
          '& button': {
            margin: '0px 20px',
          },
        }}
      >
        <Button variant="outlined" onClick={() => playPreviousSong()}>
          Previous
        </Button>
        <Button variant="contained" onClick={() => handleOnPlay()}>
          Play
        </Button>
        <Button variant="contained" onClick={() => handleOnPause()}>
          Pause
        </Button>
        <Button variant="outlined" onClick={() => playNextSong()}>
          Next
        </Button>
      </Grid>
    </div>
  );
}

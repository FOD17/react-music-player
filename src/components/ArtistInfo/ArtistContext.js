import React from 'react';

import techno1 from '../../Assets/techno1.mp3';
import techno2 from '../../Assets/techno2.mp3';

import Bernie0 from '../../Assets/photos/bernie0.jpg';
import Bernie1 from '../../Assets/photos/bernie1.jpg';

export const PlayList = React.createContext(null);

const myPlayList = [
  {
    artist: 'Bernie',
    artwork: Bernie0,
    music: techno1,
    trackTitle: "Gettin' Treats",
    rating: 0,
  },
  {
    artist: 'Bernie',
    artwork: Bernie1,
    music: techno2,
    trackTitle: "Sniffin' Butts",
    rating: 0,
  },
];

export default function ArtistContext(props) {
  const [playlist, setPlaylist] = React.useState(myPlayList);
  const value = {
    playlist,
    setPlaylist,
  };
  return <PlayList.Provider value={value}>{props.children}</PlayList.Provider>;
}

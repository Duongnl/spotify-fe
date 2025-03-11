import Header from '../../components/track/header';
import MediaControls from '../../components/track/MediaControls'
import LyricsPage from '../../components/track/Lyrics'
import RecommendedSongs from '../../components/track/Recommended'
import PopularSong from '../../components/track/Popular'
import PopularReleases from '../../components/track/PopularAlbum'
export default function MusicPlayer() {
  return (
    <>
    <Header />
    <MediaControls/>
    <LyricsPage/>
    <RecommendedSongs/>
    <PopularSong/>
    <PopularReleases/>
    </>
  )
}


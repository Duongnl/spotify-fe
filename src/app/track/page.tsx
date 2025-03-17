import Header from '../../components/track/TrackHeader'
import MediaControls from '../../components/track/MediaControls'
import LyricsPage from '../../components/track/Lyrics'
import PopularSong from '../../components/track/Popular'
import PopularReleases from '../../components/track/PopularAlbum'
export default function MusicPlayer() {
  return (
    <>
    <Header />
    <MediaControls/>
    <LyricsPage/>
    <PopularSong/>
    <PopularReleases/>
    </>
  )
}


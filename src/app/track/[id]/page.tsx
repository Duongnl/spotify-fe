import TrackHeader from '../../../components/track/TrackHeader'
import MediaControls from '../../../components/track/MediaControls'
import LyricsPage from '../../../components/track/Lyrics'
import PopularSong from '../../../components/track/Popular'
import PopularReleases from '../../../components/track/PopularAlbum'
import API from "@/api/api";
import { getSessionId } from "@/utils/session-store";

export default async function MusicPlayer (props: any) {
  const { params } = props;
  
  const res = await fetch(API.TRACK.GET_TRACK(params.id), {
    method: "GET", // Đúng phương thức POST
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json", // Đặt Content-Type là JSON
      Authorization: `Bearer ${getSessionId()}`, // Set Authorization header
    },
  });


  const data = await res.json();

  console.log("data", data);

  return (
    <>
      <TrackHeader data = {data} />
      <MediaControls data = {data}/>
      <LyricsPage  data = {data} />
      <PopularSong />
      <PopularReleases />
    </>
  )
}
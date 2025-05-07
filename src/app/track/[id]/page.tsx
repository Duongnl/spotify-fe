import TrackHeader from '../../../components/track/TrackHeader'
import MediaControls from '../../../components/track/MediaControls'
import LyricsPage from '../../../components/track/Lyrics'
import PopularSong from '../../../components/track/Popular'
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


  const data  = await res.json();

  const artistIds = data.data.artists.map((artist: any) => artist.artist.id);

  // Lấy thông tin các artist và bài hát của họ
  const artistsData = await Promise.all(
    artistIds.map(async (id: string) => {
      const res = await fetch(API.ARTIST.GET_ARTIST(id), {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getSessionId()}`,
        },
      });
      return await res.json();
    })
  );

   // Gom tất cả bài hát từ các artist lại (loại bỏ bài hát hiện tại)
   const allTracks = artistsData.flatMap(artistData => 
    artistData.data.tracks
      .filter((trackItem: any) => trackItem.track.id !== params.id)
      .map((trackItem: any) => ({
        ...trackItem.track,
        artistName: artistData.data.name,
        artistImage: artistData.data.image_file
      }))
  );

  // console.log("data", data);

  return (
    <>
      <TrackHeader data = {data} />
      <MediaControls data = {data}/>
      <LyricsPage  data = {data} />
      <PopularSong tracks={allTracks} currentArtist={data.data.artists[0]?.artist}  />
    </>
  )
}
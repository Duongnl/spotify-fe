import API from '@/api/api';
import RowHomeContent from '@/components/home/RowHomeContent';
import { getSessionId } from '@/utils/session-store';

import { Button } from 'antd';
const HomePage = async () => {


  const resAlbum = await fetch(API.ALBUM.GET_ALBUMS, {
    method: "GET", // Đúng phương thức POST
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json", // Đặt Content-Type là JSON
      Authorization: `Bearer ${getSessionId()}`, // Set Authorization header
    },
  });
  const dataAlbum = await resAlbum.json();

  let rowHomeResponseAlbum: RowHomeResponse[] = []
  if (dataAlbum && dataAlbum.status === 200) {

    for (let i = 0; i < dataAlbum.data.length; i++) {
      const item: RowHomeResponse = {
        link: '/album/',
        id: dataAlbum.data[i].id,
        img: dataAlbum.data[i].imageUrl,
        title1: dataAlbum.data[i].title,
        title2: dataAlbum.data[i].artist.name
      }
      rowHomeResponseAlbum.push(item)
    }

  }



  const resArtits = await fetch(API.ARTIST.GET_ARTISTS, {
    method: "GET", // Đúng phương thức POST
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json", // Đặt Content-Type là JSON
      Authorization: `Bearer ${getSessionId()}`, // Set Authorization header
    },
  });
  const dataArtits = await resArtits.json();

  let rowHomeResponseArtist: RowHomeResponse[] = []
  if (dataArtits && dataArtits.status === 200) {
    for (let i = 0; i < dataArtits.data.length; i++) {
      const item: RowHomeResponse = {
        link: '/artist/',
        id: dataArtits.data[i].id,
        img: dataArtits.data[i].image_file,
        title1: dataArtits.data[i].name,
        title2: ''
      }
      rowHomeResponseArtist.push(item)
    }
  }


  const resTracks = await fetch(API.TRACK.GET_TRACKS, {
    method: "GET", // Đúng phương thức POST
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json", // Đặt Content-Type là JSON
      Authorization: `Bearer ${getSessionId()}`, // Set Authorization header
    },
  });
  const dataTracks = await resTracks.json();

  let rowHomeResponseTracks: RowHomeResponse[] = []
  if (dataTracks && dataTracks.status === 200) {
    for (let i = 0; i < dataTracks.data.length; i++) {
      const item: RowHomeResponse = {
        link: '/track/',
        id: dataTracks.data[i].id,
        img: dataTracks.data[i].image_file,
        title1: dataTracks.data[i].title,
        title2: dataTracks.data[i].artists.map((artist: any) => artist.artist.name).join(", ")
    
      }
      rowHomeResponseTracks.push(item)
    }
  }




  return (
    <>
      <RowHomeContent
        name={"Album đề xuất với bạn"}
        rowHomeResponse={rowHomeResponseAlbum}
      />

      <RowHomeContent
        name={"Nghệ sĩ đề xuất với bạn"}
        rowHomeResponse={rowHomeResponseArtist}
      />

      <RowHomeContent
        name={"Bài hát đề xuất với bạn"}
        rowHomeResponse={rowHomeResponseTracks}
      />


    </>
  )
}

export default HomePage
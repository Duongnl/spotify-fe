'use client'


import React, { useEffect, useState } from 'react'
import cookie from "js-cookie"
import RowHomeContent from '../home/RowHomeContent'
import SongItem from '../album/song_item'
import { useQueuebarContext } from '@/context/queuebar-context'




interface Props {
  search: any;
}

export default function SearchPage(props: Props) {
  const { search } = props
  console.log("search >>> ", search)
  const [tracks, setTracks] = useState<any>([])
  const [artists, setArtists] = useState<any>([])
  const decodedString = decodeURIComponent(search);

  // Chuyển đổi sang cấu trúc mới
  const tracksBaiHatConvert = tracks.map((track: any) => ({
    track: track
  }));

  console.log("1" + JSON.stringify(tracksBaiHatConvert, null, 2));

  const artistsByTrack: any[] = [];

  tracks.forEach((track: any) => {
    track.artists.forEach((artistData: any) => {
      const artist = artistData.artist;

      // Kiểm tra xem artist đã tồn tại chưa
      const exists = artistsByTrack.some((a) => a.id === artist.id);

      if (!exists) {
        artistsByTrack.push(artist);
      }
    });
  });

  console.log("artistsByTrack >>>", artistsByTrack);

  let rowHomeResponseAlbum: RowHomeResponse[] = []
  if (artistsByTrack) {

    for (let i = 0; i < artistsByTrack.length; i++) {
      const item: RowHomeResponse = {
        link: '/artist/',
        id: artistsByTrack[i].id,
        img: artistsByTrack[i].image_file,
        title1: "",
        title2: artistsByTrack[i].name
      }
      rowHomeResponseAlbum.push(item)
    }

  }
  console.log("row ab", rowHomeResponseAlbum)

  useEffect(() => {
    const fetchAPi = async () => {
      const res = await fetch(`http://127.0.0.1:8000/tracks/search/${search}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.get("session-id")}`,
        },
      });

      const data = await res.json();
      if (data && data.status === 200) {
        setTracks(data.data)
        console.log("data >>> ", data.data)
      }
    }
    fetchAPi()

  }, [search])

  useEffect(() => {
    const fetchAPi = async () => {
      const res = await fetch(`http://127.0.0.1:8000/artists`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.get("session-id")}`,
        },
      });

      const data = await res.json();
      if (data && data.status === 200) {
        setArtists(data.data)
        console.log("data at >>> ", data.data)
      }
    }
    fetchAPi()

  }, [])

      const {fetchGetQueueTracks, setIdTrackPlay } = useQueuebarContext()
  
      const setNewQueueTracks = (v:any) => {
          fetchGetQueueTracks([], v)
      }


  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-6">Kết quả cho: "{decodedString}"</h2>
      <div className="flex flex-col md:flex-row md:items-stretch gap-6 mb-10">
        <div className="md:w-full h-full">
          <h3 className="text-xl font-semibold mb-2">Bài hát</h3>
          <ul>
            {tracksBaiHatConvert.map((track: any, index: any) => (
              <>
              <SongItem
              name='search'
              track={track}
              setNewQueueTracks={setNewQueueTracks}
              />
              </>
            ))}
          </ul>
        </div>
      </div>

      {/* Có sự xuất hiện của */}
      <div>
        {/* <h3 className="text-xl font-semibold mb-2">Có sự xuất hiện của</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockArtists.map((artist, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg text-center">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <p className="text-sm">{artist.name}</p>
            </div>
          ))}
        </div> */}
        <RowHomeContent
          name={"Có sự xuất hiện của "}
          rowHomeResponse={rowHomeResponseAlbum}


        />
      </div>
    </div>
  )
}

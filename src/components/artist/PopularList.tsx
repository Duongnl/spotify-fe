'use client'
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play, Heart, Plus, Pause } from "lucide-react"
import { usePlaybarContext } from "@/context/playbar-context";
import Link from "next/link";
import { Dropdown, MenuProps } from "antd";
import { toast } from "react-toastify";
import API from "@/api/api";
import cookie from "js-cookie";
import { useSidebarContext } from "@/context/sidebar-context";
import { useQueuebarContext } from "@/context/queuebar-context";
interface PopularTracksListProps {
  data: any;
}

export default function PopularTracksList(props: PopularTracksListProps) {
  const { data } = props;

  const { currentAudioPlaying, isPlaying, playMusic,
  } = usePlaybarContext();

  // const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio element when component unmounts
  // useEffect(() => {
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //       audioRef.current = null;
  //     }
  //   };
  // }, []);

  // const handlePlayToggle = (trackId: string, trackFile: string) => {
  //   // If clicking on the currently playing track
  //   if (currentlyPlaying === trackId) {
  //     if (isPlaying) {
  //       // Pause the current track
  //       audioRef.current?.pause();
  //       setIsPlaying(false);
  //     } else {
  //       // Resume the current track
  //       audioRef.current?.play();
  //       setIsPlaying(true);
  //     }
  //   } else {
  //     // Play a new track

  //     // Stop any currently playing audio
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //     }

  //     // Create new audio element
  //     const audio = new Audio(`https://res.cloudinary.com/moment-images/${trackFile}`);
  //     audioRef.current = audio;

  //     // Set up ended event to reset state
  //     audio.addEventListener('ended', () => {
  //       setIsPlaying(false);
  //       setCurrentlyPlaying(null);
  //     });

  //     // Play the new track
  //     audio.play().then(() => {
  //       setIsPlaying(true);
  //       setCurrentlyPlaying(trackId);
  //     }).catch(error => {
  //       console.error("Error playing audio:", error);
  //     });
  //   }
  // };

  const handlePlayMusic = (e: string) => {
    setNewQueueTracks(e)
    playMusic(e)
  }



  const { playlists } = useSidebarContext();
  const [items, setItems] = useState<MenuProps['items']>([])
  useEffect(() => {
    const is: MenuProps['items'] = []
    for (const playlist of playlists) {
      const item = {
        key: playlist.id,
        label: (

          playlist.name

        ),
      }
      is.push(item)
    }
    setItems(is)
  }, [playlists])

  const handleAddToPlaylist = async (e: string, id: string) => {
    const request = {
      playlist_id: e,
      track_id: id,
      trackNumber: 1
    }

    const res = await fetch(API.PLAYLIST.PLAYLIST_TRACK, {
      method: "POST", // Đúng phương thức POST
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
        Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
      },
      body: JSON.stringify(request), // Gửi dữ liệu JSON
    });

    const data = await res.json();
    if (data && data.status === 200) {
      toast.success(`Đã thêm vào playlist`)
    } else {
      toast.error(`Đã tồn tại trong playlist`)
    }
  }

  const {fetchGetQueueTracks,setIdList } = useQueuebarContext()
  
  const setNewQueueTracks = (v: any) => {
    let dataTracks: any = []
    for (let i = 0; i < data.data.tracks.length; i++) {

      dataTracks.push(data.data.tracks[i].track)
    }
    // setIdTrackPlay(v)
    setIdList("")
    fetchGetQueueTracks(dataTracks, v)
  }

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Popular</h2>

      <div className="space-y-2">
        {data.data.tracks.map((item: any, index: any) => {
          const isCurrentTrack = currentAudioPlaying === item.track.id;

          return (
            <div
              key={item.id}
              className="flex items-center p-2 rounded-md group hover:bg-[#2a2a2a]"
            >
              <div className="w-8 text-center text-gray-400 group-hover:text-white">
                {/* Hiển thị số thứ tự, ẩn khi hover */}
                <span className="group-hover:hidden">{index + 1}</span>

                {/* Hiển thị nút Play khi hover */}
                <button
                  className="h-8 w-8 text-white hidden group-hover:flex items-center justify-center"
                  onClick={() => handlePlayMusic(item.track.id)}
                >
                  {isCurrentTrack && isPlaying ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} className="ml-0.5" />
                  )}

                </button>
              </div>

              <div className="flex items-center ml-2">
                <Image
                  src={`https://res.cloudinary.com/moment-images/${item.track.image_file}`}
                  alt={item.track.title}
                  width={40}
                  height={40}
                  className="rounded"
                />
              </div>

              <div className="ml-3 flex-grow">
                <div className="flex items-center">
                  <Link href={`/track/${item.track.id}`}

                    className={`font-medium block truncate max-w-[100px] sm:max-w-none ${isCurrentTrack && isPlaying ? "text-[#00c853]" : ""
                      }`}
                  >
                    {item.track.title}
                  </Link>
                </div>
              </div>

              {/* <div className="text-gray-400 text-sm mr-4">{item.track.playCount}</div> */}

              {/* Ẩn Plus/Pause và Heart trên mobile */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100"
                  onClick={() => handlePlayMusic(item.track.id)}
                >
                </button>

                <Dropdown menu={{
                  items,
                  onClick: (info) => {
                    handleAddToPlaylist(info.key, item.track.id); // key bạn đã đặt ở playlist.id
                  },

                }}
                  placement="bottomRight"
                  trigger={['click']}
                  overlayClassName="user-dropdown"

                >
                  <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100"
                  >
                    <Plus size={16} />
                  </button>
                </Dropdown>

          


                <div className="text-gray-400 text-sm w-10">
                  {Math.floor(item.track.duration / 60)}:
                  {(item.track.duration % 60).toString().padStart(2, '0')}
                </div>

                <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100">

                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button className="text-gray-400 hover:text-white mt-4 px-0">
        See more
      </button>
    </div>
  );
}
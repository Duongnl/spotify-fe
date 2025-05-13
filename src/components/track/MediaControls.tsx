"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Plus, Heart } from "lucide-react";
import { usePlaybarContext } from "@/context/playbar-context";
import { useSidebarContext } from "@/context/sidebar-context";
import { Dropdown, MenuProps } from "antd";
import API from "@/api/api";
import cookie from 'js-cookie';
import { toast } from "react-toastify";
import { useQueuebarContext } from "@/context/queuebar-context";
interface TrackMediaProps {
  data: any;
}

export default function MediaControls(props: TrackMediaProps) {
  const { data } = props;
  // const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentAudioPlaying, isPlaying, playMusic,
  } = usePlaybarContext();

  const { fetchGetQueueTracks, setIdList} = useQueuebarContext()


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


  const handlePlayMusic = () => {
    fetchGetQueueTracks([],data.data.id)
    setIdList("")
    playMusic(data.data.id)
  }


    const handleAddToPlaylist = async (e: string) => {
    const request:any = {
      playlist_id: e,
      track_id: data.data.id,
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

    const re = await res.json();
    if (re && re.status === 200) {
      toast.success(`Đã thêm vào playlist`)
    } else {
      toast.error(`Đã tồn tại trong playlist`)
    }
  }

  return (
    <div className="flex items-center gap-4 p-6 bg-[#0e0e0e] w-full">
      <button
        onClick={() => { handlePlayMusic() }}
        className="flex items-center justify-center w-14 h-14 bg-[#00e676] rounded-full text-black hover:bg-[#00c853] transition-colors ml-4"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {(isPlaying && currentAudioPlaying === data.data.id) ? (
          <Pause className="w-7 h-7 fill-current" />
        ) : (
          <Play className="w-7 h-7 fill-current" />
        )}
      </button>

      <Dropdown menu={{
        items,
        onClick: (info) => {
          handleAddToPlaylist(info.key); // key bạn đã đặt ở playlist.id
        },
      }}
        placement="bottomCenter"
        trigger={['click']}
        overlayClassName="user-dropdown"

      >

        <button
          className="flex items-center justify-center w-10 h-10 bg-transparent border border-gray-600 rounded-full text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
          aria-label="Add"
        >
          <Plus className="w-5 h-5" />
        </button>
      </Dropdown>


      <button
        className="flex items-center justify-center w-10 h-10 bg-transparent text-gray-400 hover:text-white transition-colors"
        aria-label="More options"
      >
        <Heart className="w-8 h-8" />
      </button>

      {/* Audio Element */}
      {/* <audio ref={audioRef} src={`https://res.cloudinary.com/moment-images/${data.data.track_file}`} /> */}
    </div>
  );
}

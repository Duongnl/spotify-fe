"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Plus, Heart, Download } from "lucide-react";
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
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log ("track file download: ", data.data.track_file);
  }
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
    const request: any = {
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

  // Hàm xử lý tải file trực tiếp
  const handleDownload = () => {
    try {
      const trackUrl = `https://res.cloudinary.com/moment-images/${data.data.track_file}`; // URL file âm thanh
      const a = document.createElement('a');
      a.href = trackUrl;
      a.download = `${data.data.name}.mp3`; // Tên file tải về (giả định định dạng mp3)
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success('Tải bài hát thành công!');
    } catch (error) {
      toast.error(`Lỗi khi tải bài hát: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

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
        className=" cursor-pointer"

      >
        <Plus ></Plus>
      </Dropdown>

{/* 
      <button
        className="flex items-center justify-center w-10 h-10 bg-transparent text-gray-400 hover:text-white transition-colors"
        aria-label="More options"
        onClick={handleClick}
      >
        <Heart
          className={`w-8 h-8 ${isClicked ? 'text-red-500' : 'text-gray-400'}`} // Thay đổi màu dựa trên trạng thái
          fill={isClicked ? 'red' : 'none'} // Điền màu đỏ khi click, nếu không thì không điền
          stroke={isClicked ? 'red' : 'currentColor'} // Đổi màu viền nếu cần
        />
      </button> */}
{/* 
      <button
        className="flex items-center justify-center w-10 h-10 bg-transparent text-gray-400 hover:text-white transition-colors"
        aria-label="Download"
        onClick={handleDownload}
      >
        <Download className="w-8 h-8 text-gray-400" />
      </button> */}

      {/* Audio Element */}
      {/* <audio ref={audioRef} src={`https://res.cloudinary.com/moment-images/${data.data.track_file}`} /> */}
    </div>
  );
}

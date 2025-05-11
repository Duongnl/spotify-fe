"use client"
import Image from "next/image"
import { Play, Heart, Plus, Pause, Delete } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { usePlaybarContext } from "@/context/playbar-context"
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import Link from "next/link"
import { useUserContext } from "@/context/user-context"
import { useSidebarContext } from "@/context/sidebar-context"
import API from "@/api/api"
import cookie from "js-cookie";
import { toast } from 'react-toastify';
interface Props {
    track: any
    name: string
    fetchAPi?: () => void
}

const SongItem = (props: Props) => {
    const { track, name, fetchAPi } = props

    const { currentAudioPlaying, setCurrentAudioPlaying, audioRef, isPlaying, setIsPlaying, playMusic,
    } = usePlaybarContext();




    const handlePlayMusic = () => {
        playMusic(track.track.id)
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

    const handleAddToPlaylist = async (e: string) => {
        const request = {
            playlist_id: e,
            track_id: track.track.id,
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

    const handleDeletePlaylist = async () => {

        const res = await fetch(`${API.PLAYLIST.PLAYLIST_TRACK}${track.id}/`, {
            method: "DELETE", // Đúng phương thức POST
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json", // Đặt Content-Type là JSON
                Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
            },
        });

        const data = await res.json();
        if (data && data.status === 200) {
            toast.success(`Đã xóa khỏi playlist`)
            if (fetchAPi) {
                fetchAPi();
            }
        } else {
            toast.error(`Đã lỗi xóa playlist`)
        }
    }



    return (
        <>
            <div
                // key={track.id}
                className="flex items-center p-2 rounded-md group hover:bg-[#2a2a2a]"
            >
                <div className="w-8 text-center text-gray-400 group-hover:text-white">
                    {/* Hiển thị ID mặc định, ẩn khi hover */}
                    {name != 'playlist' && <span className="group-hover:hidden">{track.trackNumber}</span>}


                    {/* Hiển thị nút Play khi hover */}
                    {(isPlaying && currentAudioPlaying === track.track.id) ? (
                        <>
                            <button className="h-8 w-8 hidden group-hover:flex items-center justify-center text-[#00c853]"
                                onClick={() => handlePlayMusic()}
                            >
                                <Pause size={16} className="ml-0.5" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="h-8 w-8 text-white hidden group-hover:flex items-center justify-center"
                                onClick={() => handlePlayMusic()}
                            >
                                <Play size={16} className="ml-0.5" />
                            </button>
                        </>
                    )}

                </div>

                <div className="flex items-center ml-2">
                    <Image
                        src={`https://res.cloudinary.com/moment-images/${track.track.image_file}`}
                        alt={"Đánh đổi"}
                        width={60}
                        height={60}
                        className="rounded"
                    />
                </div>

                <div className="ml-3 flex-grow">
                    <div className="flex items-center">
                        <Link href={`/track/${track.track.id}`} className={`font-medium block truncate max-w-[100px] sm:max-w-none ${(isPlaying && currentAudioPlaying === track.track.id) && `text-[#00c853]`}`}>
                            {track.track.title}
                        </Link>
                        {/* {track.explicit && <span className="ml-2 px-1 text-xs bg-gray-600 text-white rounded">E</span>} */}
                    </div>
                </div>

                <div className="text-gray-400 text-sm mr-4">{"25,854,267"}</div>

                {/* Ẩn Plus và Heart trên mobile */}
                <div className="hidden sm:flex items-center gap-2">

                    <Dropdown menu={{
                        items,
                        onClick: (info) => {
                            handleAddToPlaylist(info.key); // key bạn đã đặt ở playlist.id
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



                    <div className="text-gray-400 text-sm w-10">{"3:46"}</div>

                    {name == 'playlist' && (
                        <>
                            <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100"
                                onClick={() => { handleDeletePlaylist() }}
                            >
                                <Delete size={16} />
                            </button>
                        </>
                    )}


                </div>
            </div>
        </>
    )

}

export default SongItem
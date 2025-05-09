"use client"
import { GalleryHorizontalEnd, MoveRight, Plus } from "lucide-react"
import ArtistItem from "./artist_item"
import PlaylistItem from "./playlist_item"
import cookie from "js-cookie"
import { useSidebarContext } from "@/context/sidebar-context"
import { useUserContext } from "@/context/user-context"
import API from "@/api/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
interface IProps {
    isSidebarOpen: boolean,
    isSideBarMobile: boolean,
    setIsSidebarOpen: (v: boolean) => void
}

const Sidebar = (props: IProps) => {
    const { playlists } = useSidebarContext();
   

    const { user, fetchGetUser } = useUserContext();
    const { isSidebarOpen, setIsSidebarOpen, isSideBarMobile } = props
    const router = useRouter()

    const handleSetIsSidebarOpen = () => {
        if (!isSideBarMobile) {
            if (isSidebarOpen) {
                setIsSidebarOpen(false)
            } else {
                setIsSidebarOpen(true)
            }
        }

    }

    const handleCreatePlaylist = async () => {

        const request = {
            user_id: user.id,
            name: `Playlist của tôi #${playlists.length + 1}`,
            status: 1
        }

        const res = await fetch(API.PLAYLIST.PLAYLIST, {
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
            await fetchGetUser()
            router.push(`/playlist/${data.data.id}`)
        }
    }

    return (
        <>
            <div className={`bg-[#1f1f1f] p-4 rounded-xl h-full flex flex-col  ${isSidebarOpen ? 'w-[320px]' : 'w-[96px]'}`}>
                {/* Thanh tiêu đề */}
                <div className={`flex justify-between items-center ${!isSidebarOpen && `flex-col`} `} >
                    <div className="flex items-center">
                        <GalleryHorizontalEnd size={30} className="cursor-pointer"

                            onClick={() => { handleSetIsSidebarOpen() }}
                        />
                        {
                            isSidebarOpen && (
                                <>
                                    <p className="font-bold text-[16px] ml-2">Thư viện</p>
                                </>
                            )
                        }

                    </div>

                    {
                        isSidebarOpen && (
                            <>
                                <div className="flex items-center">
                                    <Plus size={25} className="cursor-pointer"
                                        onClick={() => { handleCreatePlaylist() }}
                                    />
                                </div>
                            </>
                        )
                    }


                </div>

                {/* Bộ lọc */}
                {
                    isSidebarOpen && (
                        <>
                            <div className="flex items-center mt-6">
                                <div className="bg-[#2a2a2a] rounded-full cursor-pointer p-2 mr-2">
                                    <p className="text-[14px]  text-center ">Tất cả</p>
                                </div>
                                {/* <div className="bg-[#2a2a2a] rounded-full cursor-pointer p-2 mr-2">
                                    <p className="text-[14px]  text-center">Danh sách phát</p>
                                </div>
                                <div className="bg-[#2a2a2a] rounded-full cursor-pointer p-2">
                                    <p className="text-[14px]  text-center">Nghệ sĩ</p>
                                </div> */}
                            </div>

                            {/* Ô tìm kiếm */}
                            {/* <div className="mt-8 bg-[#2a2a2a] rounded-full border border-transparent w-full focus-within:border-white flex items-center">
                                <i className="fa-solid fa-magnifying-glass text-[15px] m-2"></i>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="text-[15px] w-full rounded-tr-full rounded-br-full bg-[#2a2a2a] focus-visible:outline-none"
                                />
                            </div> */}
                        </>
                    )
                }

                {/* Phần danh sách cuộn riêng */}
                <div className="mt-4 flex-grow overflow-auto custom-scrollbar">

                    {/* <ArtistItem
                        isSidebarOpen={isSidebarOpen}
                    /> */}

                    {playlists?.map((playlist: any, index: any) => (

                        <PlaylistItem
                            isSidebarOpen={isSidebarOpen}
                            playlist={playlist}
                            user={user}

                        />
                    ))}




                </div>
            </div>

        </>
    )
}

export default Sidebar

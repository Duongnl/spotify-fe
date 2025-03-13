"use client"
import { GalleryHorizontalEnd, MoveRight, Plus } from "lucide-react"
import ArtistItem from "./artist_item"
import PlaylistItem from "./playlist_item"
interface IProps {
    isSidebarOpen: boolean,
    isSideBarMobile: boolean,
    setIsSidebarOpen: (v: boolean) => void
}

const Sidebar = (props: IProps) => {

    const { isSidebarOpen, setIsSidebarOpen, isSideBarMobile} = props

    const handleSetIsSidebarOpen = () => {
        if (!isSideBarMobile) {
            if (isSidebarOpen) {
                setIsSidebarOpen(false)
            } else {
                setIsSidebarOpen(true)
            }
        }

    }

    return (
        <>
            <div className="bg-[#1f1f1f] p-4 rounded-xl h-full flex flex-col">
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
                                    <Plus size={25} className="cursor-pointer" />
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
                                <div className="bg-[#2a2a2a] rounded-full cursor-pointer p-2 mr-2">
                                    <p className="text-[14px]  text-center">Danh sách phát</p>
                                </div>
                                <div className="bg-[#2a2a2a] rounded-full cursor-pointer p-2">
                                    <p className="text-[14px]  text-center">Nghệ sĩ</p>
                                </div>
                            </div>

                            {/* Ô tìm kiếm */}
                            <div className="mt-8 bg-[#2a2a2a] rounded-full border border-transparent w-full focus-within:border-white flex items-center">
                                <i className="fa-solid fa-magnifying-glass text-[15px] m-2"></i>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="text-[15px] w-full rounded-tr-full rounded-br-full bg-[#2a2a2a] focus-visible:outline-none"
                                />
                            </div>
                        </>
                    )
                }

                {/* Phần danh sách cuộn riêng */}
                <div className="mt-4 flex-grow overflow-auto custom-scrollbar">
                    <ArtistItem
                        isSidebarOpen={isSidebarOpen}
                    />
                    <PlaylistItem
                        isSidebarOpen={isSidebarOpen}
                    />
                    <PlaylistItem
                        isSidebarOpen={isSidebarOpen}
                    />


                </div>
            </div>

        </>
    )
}

export default Sidebar

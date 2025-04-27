"use client"
import Image from "next/image"
import { Play, Heart, Plus } from "lucide-react"
const SongItem = () => {

    return (
        <>
            <div
                // key={track.id}
                className="flex items-center p-2 rounded-md group hover:bg-[#2a2a2a]"
            >
                <div className="w-8 text-center text-gray-400 group-hover:text-white">
                    {/* Hiển thị ID mặc định, ẩn khi hover */}
                    <span className="group-hover:hidden">{"1"}</span>

                    {/* Hiển thị nút Play khi hover */}
                    <button className="h-8 w-8 text-white hidden group-hover:flex items-center justify-center">
                        <Play size={16} className="ml-0.5" />
                    </button>
                </div>

                <div className="flex items-center ml-2">
                    <Image
                        src={"/danhdoi.png"}
                        alt={"Đánh đổi"}
                        width={60}
                        height={60}
                        className="rounded"
                    />
                </div>

                <div className="ml-3 flex-grow">
                    <div className="flex items-center">
                        <span className="font-medium block truncate max-w-[100px] sm:max-w-none">
                            {"Đánh đổi"}
                        </span>

                        {/* {track.explicit && <span className="ml-2 px-1 text-xs bg-gray-600 text-white rounded">E</span>} */}
                    </div>
                </div>

                <div className="text-gray-400 text-sm mr-4">{"25,854,267"}</div>

                {/* Ẩn Plus và Heart trên mobile */}
                <div className="hidden sm:flex items-center gap-2">
                    <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100">
                        <Plus size={16} />
                    </button>

                    <div className="text-gray-400 text-sm w-10">{"3:46"}</div>

                    <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100">
                        <Heart size={16} />
                    </button>
                </div>
            </div>
        </>
    )

}

export default SongItem
"use client"
import Image from "next/image"
import { Play, Heart, Plus, Pause } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { usePlaybarContext } from "@/context/playbar-context"
import Link from "next/link"
interface Props {
    track: any
    name :string
}

const SongItem = (props: Props) => {
    const { track, name } = props

    const { currentAudioPlaying, setCurrentAudioPlaying, audioRef, isPlaying, setIsPlaying, playMusic, 
    } = usePlaybarContext();
        


    const handlePlayMusic = () => {
        playMusic(track.track.id)
    }

    return (
        <>
            <div
                // key={track.id}
                className="flex items-center p-2 rounded-md group hover:bg-[#2a2a2a]"
            >
                <div className="w-8 text-center text-gray-400 group-hover:text-white">
                    {/* Hiển thị ID mặc định, ẩn khi hover */}
                    <span className="group-hover:hidden">{track.trackNumber}</span>

                    {/* Hiển thị nút Play khi hover */}
                    {(isPlaying && currentAudioPlaying=== track.track.id) ? (
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
                        <Link href={`/track/${track.track.id}`} className={`font-medium block truncate max-w-[100px] sm:max-w-none ${(isPlaying && currentAudioPlaying=== track.track.id) && `text-[#00c853]`}`}>
                            {track.track.title}
                        </Link>
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
"use client"
import Image from 'next/image';
import SongItem from './song_item';
import { Play, Plus, Heart } from "lucide-react"
import RowHomeContent from '../home/RowHomeContent';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
    res: any
}


const AlbumTitle = (props: Props) => {
    const { res } = props
    const [currentAudioPlaying, setCurrentAudioPlaying] = useState<string>("")
    

    return (
        <>
            <div className="flex items-center bg-[#1a2a3a] text-white p-4 mt-4 ml-4 rounded-lg">
                <div className="flex flex-col md:flex-row  w-full mx-auto gap-6">
                    <div className="relative w-full md:w-80 h-60 shrink-0">
                        <Image
                            src={`https://res.cloudinary.com/moment-images/${res.data.imageUrl}`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt="Album cover"
                            fill
                            className="object-cover rounded-md"
                            priority
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="text-sm text-gray-300 mb-2">Album</div>

                        <h1 className="text-7xl font-bold tracking-tight mb-6">{res.data.title}</h1>

                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                                <Image
                                    src={`https://res.cloudinary.com/moment-images/${res.data.artist.image_file}`}
                                    alt="Artist avatar"
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex items-center gap-2 text-gray-300">
                                <Link href={`http://localhost:3000/artist/${res.data.artist.id}`} className="font-medium no-underline hover:underline">{res.data.artist.name}</Link>
                                <span className="text-gray-400">•</span>
                                <span className="no-underline hover:underline">{res.data.title}</span>

                                {/* <span className="text-gray-400">•</span>
                                <span>2023</span>
                                <span className="text-gray-400">•</span>
                                <span>3:46</span>
                                <span className="text-gray-400">•</span>
                                <span>25,854,267</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-[#0e0e0e] w-full">
                <button
                    className="flex items-center justify-center w-14 h-14 bg-[#00e676] rounded-full text-black hover:bg-[#00c853] ml-4 transition-all transform hover:scale-105"
                    aria-label="Play"
                >
                    <Play className="w-7 h-7 fill-current" />
                </button>

                {/* <button
                    className="flex items-center justify-center px-5  py-2 bg-transparent border border-gray-200 rounded-3xl text-gray-200  hover:text-white hover:border-gray-100 transition-all transform hover:scale-105"
                >
                    Follow
                </button> */}

            </div>
            <div className="bg-black text-white p-6">
                <h2 className="text-2xl font-bold mb-4">Popular</h2>

                {res.data.tracks?.map((track:any, index:any) => (
                  
                        <SongItem
                            track={track}
                            name = {res.data.artist.name}
                        />
                ))}

                <div className="space-y-2">
                </div>
            </div>
            <RowHomeContent />

        </>
    )
}
export default AlbumTitle
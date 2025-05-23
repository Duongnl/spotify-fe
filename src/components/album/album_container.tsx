"use client"
import Image from 'next/image';
import SongItem from './song_item';
import { Play, Plus, Heart, Pause } from "lucide-react"
import RowHomeContent from '../home/RowHomeContent';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQueuebarContext } from '@/context/queuebar-context';
import { usePlaybarContext } from '@/context/playbar-context';

interface Props {
    res: any
    resAlbum: any
}


const AlbumTitle = (props: Props) => {
    const { res, resAlbum } = props
    // const [currentAudioPlaying, setCurrentAudioPlaying] = useState<string>("")
    console.log("resalbum>>>", resAlbum)

    const [rowHomeResponse, setRowHomeResponse] = useState<RowHomeResponse[]>([])
    useEffect(() => {
        let arr: RowHomeResponse[] = []
        for (let i = 0; i < resAlbum.data.length; i++) {
            const item: RowHomeResponse = {
                link: '/album/',
                id: resAlbum.data[i].id,
                img: resAlbum.data[i].imageUrl,
                title1: resAlbum.data[i].title,
                title2: resAlbum.data[i].artist.name
            }
            arr.push(item)
        }
        setRowHomeResponse(arr)


    }, [])

    const { fetchGetQueueTracks, setIdList, idList,setFirtsTrack } = useQueuebarContext()
    const { playMusic, isPlaying, currentAudioPlaying } = usePlaybarContext()

    const setNewQueueTracks = (v: any, play?:any) => {

            if (play) {
                playMusic(v)
            }

            let dataTracks: any = []

            for (let i = 0; i < res.data.tracks.length; i++) {

                dataTracks.push(res.data.tracks[i].track)
            }

            setFirtsTrack (dataTracks, v)
            setIdList("")
    }

    const checkTrackInAlbum = () => {
         for (let i = 0; i < res.data.tracks.length; i++) {

               if (res.data.tracks[i].track. id === currentAudioPlaying) {
                return true;
               }
            }

            return false
    }




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
                                <Link href={`/artist/${res.data.artist.id}`} className="font-medium no-underline hover:underline">{res.data.artist.name}</Link>
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
                {!(isPlaying && checkTrackInAlbum()) ? (<>
                    <button
                        className="flex items-center justify-center w-14 h-14 bg-[#00e676] rounded-full text-black hover:bg-[#00c853] ml-4 transition-all transform hover:scale-105"
                        aria-label="Play"
                        onClick={() => { setNewQueueTracks(res.data.tracks[0].track.id, "playAll") }}
                    >
                        <Play className="w-7 h-7 fill-current" />
                    </button>
                </>) : (<>
                    <button
                        className="flex items-center justify-center w-14 h-14 bg-[#00e676] rounded-full text-black hover:bg-[#00c853] ml-4 transition-all transform hover:scale-105"
                        aria-label="Play"
                        onClick={() => { playMusic(currentAudioPlaying) }}
                    >
                        <Pause className="w-7 h-7 fill-current" />
                    </button>
                </>)}



                {/* <button
                    className="flex items-center justify-center px-5  py-2 bg-transparent border border-gray-200 rounded-3xl text-gray-200  hover:text-white hover:border-gray-100 transition-all transform hover:scale-105"
                >
                    Follow
                </button> */}

            </div>
            <div className="bg-black text-white p-6">
                <h2 className="text-2xl font-bold mb-4">Popular</h2>

                {res.data.tracks?.map((track: any, index: any) => (

                    <SongItem
                        track={track}
                        name={"album"}
                        setNewQueueTracks={setNewQueueTracks}
                    />
                ))}

                <div className="space-y-2">
                </div>
            </div>
            <RowHomeContent
                rowHomeResponse={rowHomeResponse}
                name='Album được đề xuất với bạn'
            />

        </>
    )
}
export default AlbumTitle
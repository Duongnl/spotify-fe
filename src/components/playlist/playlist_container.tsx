"use client"
import Image from 'next/image';
import cookie from 'js-cookie';
import { Play, Plus, Heart, Delete, Circle, CircleX, Pause } from "lucide-react"
import RowHomeContent from '../home/RowHomeContent';
import SongItem from '../album/song_item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import API from '@/api/api';
import { useQueuebarContext } from '@/context/queuebar-context';
import EditPlaylistModal from './edit_playlist_modal';
import DeletePlaylistModal from './delete_playlist_modal';
import { usePlaybarContext } from '@/context/playbar-context';

interface Props {
    response: any
    params: string
}

const PlaylistContainer = (props: Props) => {
    const { response, params } = props
    const [res, setRes] = useState<any>(response)
    const [nameValue, setNameValue] = useState(res.data.name)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const path = usePathname();
    useEffect(() => {


        fetchAPi()
    }, [params])

    const { setQueueTracks, fetchGetQueueTracks, setIdTrackPlay, setIdList, idList } = useQueuebarContext()

    //    const { fetchGetQueueTracks, setIdTrackPlay, setIdList, idList } = useQueuebarContext()
    const { playMusic, isPlaying, currentAudioPlaying } = usePlaybarContext()

    const setNewQueueTracks = (v: any, play?: any) => {
        if (play) {
            playMusic(v)
        }

        let dataTracks = []
        for (let i = 0; i < res.data.tracks.length; i++) {

            dataTracks.push(res.data.tracks[i].track)
        }
        // setIdTrackPlay(v)
        fetchGetQueueTracks(dataTracks, v)
        setIdList(res.data.id)
    }

    const fetchAPi = async () => {
        const res = await fetch(API.PLAYLIST.GET_PLAYLIST(params), {
            method: "GET", // Đúng phương thức POST
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json", // Đặt Content-Type là JSON
                Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
            },
        });
        const data = await res.json();
        if (data && data.status === 200) {
            setRes(data)
        }
    }

    const handleEditPlaylist = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="flex items-center bg-[#1a2a3a] text-white p-4 mt-4 ml-4 rounded-lg">
                <div className="flex flex-col md:flex-row  w-full mx-auto gap-6">
                    <div className="relative w-full md:w-80 h-60 shrink-0">
                        <Image
                            src="https://res.cloudinary.com/moment-images/Screenshot_2025-05-10_033029_e5sgxn"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt="Album cover"
                            fill
                            className="object-cover rounded-md"
                            priority
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="text-sm text-gray-300 mb-2">Playlist</div>

                        <h1 className="text-7xl font-bold tracking-tight mb-6 cursor-pointer leading-tight"
                            onClick={() => { handleEditPlaylist() }}
                        >{nameValue}</h1>

                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                                <Image
                                    src={`https://res.cloudinary.com/moment-images/${res.data.user.imageUrl}`}
                                    alt="Artist avatar"
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex items-center gap-2 text-gray-300">
                                <Link href={`/user/${res.data.user.id}`} className="font-medium no-underline hover:underline">{res.data.user.name}</Link>
                                <span className="text-gray-400">•</span>
                                {/* <a href="#" className="no-underline hover:underline">Đánh Đổi</a>
                                <span className="text-gray-400">•</span>
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

                {!(isPlaying && idList === res.data.id) ? (<>
                    <button
                        className="flex items-center justify-center w-14 h-14 bg-[#00e676] rounded-full text-black hover:bg-[#00c853] ml-4 transition-all transform hover:scale-105"
                        aria-label="Play"
                        onClick={() => { setNewQueueTracks(res.data.tracks[0].track.id, 'playAll') }}
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




                <button
                    className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-105"
                    aria-label="Remove"
                    onClick={() => { setIsModalOpenDelete(true) }}
                >
                    <CircleX className="w-7 h-7" />
                </button>


            </div>
            <div className="bg-black text-white p-6">

                {res.data.tracks?.map((track: any, index: any) => (

                    <SongItem
                        track={track}
                        name={"playlist"}
                        fetchAPi={fetchAPi}
                        setNewQueueTracks={setNewQueueTracks}
                    />
                ))}


                <div className="space-y-2">
                </div>
            </div>
            <EditPlaylistModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                idPlaylist={res.data.id}
                nameValue={nameValue}
                setNameValue={setNameValue}
            />

            <DeletePlaylistModal
                isModalOpenDelete={isModalOpenDelete}
                setIsModalOpenDelete={setIsModalOpenDelete}
                idPlaylist={res.data.id}
            />
        </>
    )
}
export default PlaylistContainer
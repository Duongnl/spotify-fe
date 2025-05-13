"use client"

import type React from "react"
import Slider from 'rc-slider';

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Maximize2,
    Volume2,
    Layers,
    Pencil,
    MonitorSmartphone,
    ListMusic,
    Repeat,
    Shuffle,
} from "lucide-react"
import { useScreenSize } from "@/utils/resize";
import { Plus, Heart } from "lucide-react"
import { usePlaybarContext } from "@/context/playbar-context";
import { useRouter } from "next/navigation";
import cookie from "js-cookie"
import VideoMiniplayer from "@/components/shared/video/VideoMiniplayer";
import { useQueuebarContext } from "@/context/queuebar-context";
import API from "@/api/api";
import { getNextTrackId, getPreviousTrackId } from "@/utils/get_id_track";
interface IProps {
    isQueueBarOpen: boolean,
    setIsQueueBarOpen: (v: boolean) => void

}

const PlayBar = (props: IProps) => {
    const { currentAudioPlaying, isPlaying, playMusic, artistName, trackName, img, currentTime, duration, audioRef, setCurrentTime,
        idPlaybar, videoUrl, setIsSeeking, isSeeking, repeatRef

    } = usePlaybarContext();

    const handlePlayMusic = async () => {

        playMusic(currentAudioPlaying)
    }
    const { isQueueBarOpen, setIsQueueBarOpen } = props
    const [isPlayBarMobile, setIsPlayBarMobile] = useState(false)
    const isSmallScreen = useScreenSize("(max-width: 970px)");
    const [isMiniplayerOpen, setIsMiniplayerOpen] = useState(false);

    useEffect(() => {
        if (isSmallScreen) {
            setIsQueueBarOpen(false)
        }
        setIsPlayBarMobile(isSmallScreen);
    }, [isSmallScreen]);

    const handleQueueBar = () => {
        if (isQueueBarOpen) {
            setIsQueueBarOpen(false)
        } else {
            setIsQueueBarOpen(true)
        }
    }

    const router = useRouter()


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };



    // const handleSeek = (value: number[]) => {
    //     const newTime = value[0];
    //     if (audioRef.current) {
    //         audioRef.current.currentTime = newTime;
    //     }
    // };


    const Link = () => {
        router.push(`/track/${currentAudioPlaying}`)
    }

    const [volume, setVolume] = useState(100); // 100%
    // Khi thay đổi slider
    const handleVolumeChange = (value: number | number[]) => {
        const newVolume = Array.isArray(value) ? value[0] : value;
        setVolume(newVolume);

        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100; // Giá trị volume trong Audio là từ 0 → 1
        }
    };

    const openVideo = () => {
        if (isPlaying) {
            playMusic(currentAudioPlaying)
        }
        setIsMiniplayerOpen(!isMiniplayerOpen)
    }

    useEffect(() => {
        const handlePointerUp = () => setIsSeeking(false);

        window.addEventListener("pointerup", handlePointerUp);
        return () => {
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, []);


    const { queueTracks, setIdList, setQueueTracks } = useQueuebarContext()
    const [isChangingTrack, setIsChangingTrack] = useState(false);






    const handleNextTrack = async () => {
        if (isChangingTrack) return; // Chặn nếu đang xử lý
        setIsChangingTrack(true);

        try {
            const id = getNextTrackId(currentAudioPlaying, queueTracks);
            if (id) {
                await playMusic(id);
            }
        } catch (error) {
            console.error("Error in handleNextTrack:", error);
        } finally {
            setIsChangingTrack(false); // Cho phép bấm tiếp
        }
    };

    const handleBackTrack = async () => {
        if (isChangingTrack) return;
        setIsChangingTrack(true);

        try {
            const id = getPreviousTrackId(currentAudioPlaying, queueTracks);
            if (id) {
                await playMusic(id);
            }
        } catch (error) {
            console.error("Error in handleBackTrack:", error);
        } finally {
            setIsChangingTrack(false);
        }
    };

    const handleRepeat = async () => {

        repeatRef.current = !repeatRef.current
        const dataRes = {
            is_repeat: repeatRef.current
        }
        console.log("repeatDataRes >>> ", dataRes)

        const res = await fetch(`${API.PLAYBAR.UPDATE}${idPlaybar}/`, {
            method: "PUT", // Đúng phương thức PUT
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json", // Đặt Content-Type là JSON
                Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
            },
            body: JSON.stringify(dataRes), // Gửi dữ liệu JSON
        });
        const data = await res.json();
    }

    const handleRandom = () => {
        const shuffled = [...queueTracks]; // Tạo bản sao để không mutate array gốc

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        setQueueTracks(shuffled);
    }


    return (
        <>
            <div className="flex justify-between  p-2 w-full">
                <div className="flex w-[300px] cursor-pointer"
                    onClick={() => { Link() }}
                >
                    <Image
                        src={`https://res.cloudinary.com/moment-images/${img}`}
                        alt="Obito"
                        width={64}
                        height={64}
                        className="object-cover mr-[15px] ml-[15px]"
                    />
                    <div className="flex flex-col justify-around" >
                        <p className=" font-bold" >{trackName}</p>
                        <p className=" text-[14px]" > {artistName}</p>
                    </div>
                </div>

                {
                    isPlayBarMobile && (
                        <>
                            <div className="flex  items-center" >
                                <Heart size={30} />

                                {isPlaying ? (
                                    <>
                                        <button className="bg-white rounded-full p-1 text-black hover:bg-gray-200 ml-[50px]"
                                            onClick={() => { handlePlayMusic() }}
                                        >
                                            <Pause size={30} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="bg-white rounded-full p-1 text-black hover:bg-gray-200 ml-[50px]"
                                            onClick={() => { handlePlayMusic() }}
                                        >
                                            <Play size={30} />
                                        </button>
                                    </>
                                )}


                            </div>
                        </>
                    )
                }


                {
                    !isPlayBarMobile && (
                        <>
                            <div className="flex flex-col justify-around items-center flex-grow" >

                                <div className="flex items-center space-x-3">
                                    <button className="text-gray-400 hover:text-white"
                                        onClick={() => { handleRandom() }}
                                    >
                                        <Shuffle size={20} />
                                    </button>

                                    <button className="text-gray-400 hover:text-white"
                                        onClick={() => { handleBackTrack() }}
                                    >
                                        <SkipBack size={20} />
                                    </button>
                                    {isPlaying ? (
                                        <>
                                            <button className="bg-white rounded-full p-1 text-black hover:bg-gray-200"
                                                onClick={() => { handlePlayMusic() }}>
                                                <Pause size={30}
                                                />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="bg-white rounded-full p-1 text-black hover:bg-gray-200"
                                                onClick={() => { handlePlayMusic() }}>
                                                <Play size={30} />
                                            </button>
                                        </>
                                    )}

                                    <button className="text-gray-400 hover:text-white"
                                        onClick={() => { handleNextTrack() }}
                                    >
                                        <SkipForward size={20} />
                                    </button>
                                    <button className={`text-gray-400 hover:text-white ${repeatRef.current && `text-white font-bold`}`}
                                        onClick={() => { handleRepeat() }}
                                    >
                                        <Repeat size={20} />
                                    </button>
                                </div>


                                {/* <div className="flex items-center w-full">
                                    <p>1:45</p>
                                    <Slider className="mr-[20px] ml-[20px]" />
                                    <p>3:45</p>
                                </div> */}
                                <div className="flex items-center w-full">
                                    <p className="text-sm">{formatTime(currentTime)}</p>

                                    <div
                                        className="mx-[20px] w-full"
                                        onPointerDown={() => setIsSeeking(true)}
                                    >
                                        <Slider
                                            value={currentTime}
                                            max={duration}
                                            step={1}
                                            onChange={(value) => {
                                                if (typeof value === "number") {
                                                    setCurrentTime(value);
                                                    if (audioRef.current && isSeeking) {
                                                        audioRef.current.currentTime = value;
                                                    }
                                                }
                                            }}
                                        />
                                    </div>

                                    <p className="text-sm">{formatTime(duration)}</p>
                                </div>




                            </div>

                            <div className="flex items-center space-x-3 w-[300px] justify-end ">

                                <button className="text-gray-400 hover:text-white">
                                    <Layers size={18}
                                        onClick={() => { handleQueueBar() }}
                                    />
                                </button>
                                <button className="text-gray-400 hover:text-white">
                                    <Pencil size={18} />
                                </button>
                                <button
                                    className="text-gray-400 hover:text-white"
                                    onClick={() => openVideo()}
                                    disabled={!videoUrl} // Vô hiệu hóa nút nếu không có videoUrl
                                >
                                    <MonitorSmartphone size={18} />
                                </button>
                                <button className="text-gray-400 hover:text-white">
                                    <Volume2 size={18} />
                                </button>
                                <div className="mr-[20px] ml-[20px] w-[100px]">
                                    <Slider
                                        min={0}
                                        max={100}
                                        value={volume}
                                        onChange={handleVolumeChange}
                                    />
                                </div>

                                {/* <Slider defaultValue={[75]} max={100} step={1} className="w-24" /> */}
                                <button className={`text-gray-400 hover:text-white `}>
                                    <Maximize2 size={18} />
                                </button>
                            </div>
                        </>
                    )
                }

            </div>

            {
                isPlayBarMobile && (
                    <>
                        <div className="w-full pl-[20px] pr-[10px]" >
                            <div
                                className="mx-[20px] w-full"
                                onPointerDown={() => setIsSeeking(true)}
                            >
                                <Slider
                                    value={currentTime}
                                    max={duration}
                                    step={1}
                                    onChange={(value) => {
                                        if (typeof value === "number") {
                                            setCurrentTime(value);
                                            if (audioRef.current && isSeeking) {
                                                audioRef.current.currentTime = value;
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )
            }

            {isMiniplayerOpen && videoUrl && (
                <VideoMiniplayer
                    videoUrl={videoUrl}
                    artistName={artistName}
                    trackName={trackName}
                    onClose={() => setIsMiniplayerOpen(false)} />
            )}


        </>
    )
}

export default PlayBar

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
} from "lucide-react"
import { useScreenSize } from "@/utils/resize";
import { Plus, Heart } from "lucide-react"
import { usePlaybarContext } from "@/context/playbar-context";
import { useRouter } from "next/navigation";
import cookie from "js-cookie"
import VideoMiniplayer from "@/components/shared/video/VideoMiniplayer";
interface IProps {
    isQueueBarOpen: boolean,
    setIsQueueBarOpen: (v: boolean) => void

}

const PlayBar = (props: IProps) => {
    const { currentAudioPlaying, isPlaying, playMusic, artistName, trackName, img, currentTime, duration, audioRef, setCurrentTime, idPlaybar, videoUrl, setIsSeeking, isSeeking } = usePlaybarContext();

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
        playMusic(currentAudioPlaying)
        setIsMiniplayerOpen(!isMiniplayerOpen)
    }

    useEffect(() => {
        const handlePointerUp = () => setIsSeeking(false);

        window.addEventListener("pointerup", handlePointerUp);
        return () => {
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, []);


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
                                    <button className="text-gray-400 hover:text-white">
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

                                    <button className="text-gray-400 hover:text-white">
                                        <SkipForward size={20} />
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
                                <button className="text-gray-400 hover:text-white">
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
                            <Slider
                                className="mx-[20px] w-full"
                                value={currentTime}
                                max={duration}
                                step={1}
                                onChange={(value) => {
                                    if (typeof value === 'number') {
                                        setCurrentTime(value);
                                    }
                                }}
                                onAfterChange={(value) => {
                                    if (typeof value === 'number' && audioRef.current) {
                                        audioRef.current.currentTime = value;
                                    }
                                }}
                            />
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

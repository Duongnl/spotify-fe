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

interface IProps {
    isQueueBarOpen: boolean,
    setIsQueueBarOpen: (v: boolean) => void
    
}

const PlayBar = (props: IProps) => {

    const { isQueueBarOpen, setIsQueueBarOpen } = props
    const [isPlayBarMobile, setIsPlayBarMobile] = useState(false)
    const isSmallScreen = useScreenSize("(max-width: 970px)");
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

    return (
        <>
            <div className="flex justify-between  p-2 w-full">
                <div className="flex w-[300px]" >
                    <Image
                        src="/danhdoi.png"
                        alt="Obito"
                        width={64}
                        height={64}
                        className="object-cover mr-[15px] ml-[15px]"
                    />
                    <div className="flex flex-col justify-around" >
                        <p className=" font-bold" >Đánh đổi</p>
                        <p className=" text-[14px]" > Obito</p>
                    </div>
                </div>

                {
                    isPlayBarMobile && (
                        <>
                            <div className="flex  items-center" >
                                <Heart size={30} />
                                <button className="bg-white rounded-full p-1 text-black hover:bg-gray-200 ml-[50px]">
                                    <Play size={30} />
                                </button>
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
                                    <button className="bg-white rounded-full p-1 text-black hover:bg-gray-200">
                                        <Play size={30} />
                                    </button>
                                    <button className="text-gray-400 hover:text-white">
                                        <SkipForward size={20} />
                                    </button>
                                </div>


                                <div className="flex items-center w-full">
                                    <p>1:45</p>
                                    <Slider className="mr-[20px] ml-[20px]" />
                                    <p>3:45</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 w-[300px] justify-end ">

                                <button className="text-gray-400 hover:text-white">
                                    <Layers size={18} 
                                    onClick={() => {handleQueueBar()}}
                                    />
                                </button>
                                <button className="text-gray-400 hover:text-white">
                                    <Pencil size={18} />
                                </button>
                                <button className="text-gray-400 hover:text-white">
                                    <MonitorSmartphone size={18} />
                                </button>
                                <button className="text-gray-400 hover:text-white">
                                    <Volume2 size={18} />
                                </button>
                                <div className="mr-[20px] ml-[20px] w-[100px]">
                                    <Slider />
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
                            <Slider />
                        </div>
                    </>
                )
            }


        </>
    )
}

export default PlayBar

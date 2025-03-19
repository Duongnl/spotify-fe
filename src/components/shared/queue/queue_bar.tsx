"use client"

import { X } from "lucide-react"
import TrackItem from "./track_item"

interface IProps {
    isQueueBarOpen: boolean,
    setIsQueueBarOpen: (v: boolean) => void
    
}

const QueueBar = (props: IProps) => {
    const { isQueueBarOpen, setIsQueueBarOpen } = props

    const handleQueueBar = () => {
        if (isQueueBarOpen) {   
            setIsQueueBarOpen(false)
        } else {
            setIsQueueBarOpen(true)
        }      
    }

    return (
        <>
            <div className="p-2 bg-[#1f1f1f] rounded-xl h-full flex flex-col w-[300px]">
                <div className="flex  justify-between">
                    <p className=" font-bold text-[16px] mb-[20px]" >Danh sách chờ</p>
                    <X size={25}  className=" cursor-pointer"
                    onClick={ () => {handleQueueBar ()}}
                    />
                </div>
                <div className="flex-grow overflow-auto custom-scrollbar">
                    <p className=" font-bold text-[16px]" >Đang phát</p>
                    <TrackItem />
                    <p className=" font-bold text-[16px] mt-[20px]" >Bài hát tiếp theo</p>
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                </div>
            </div>

        </>
    )
}
export default QueueBar
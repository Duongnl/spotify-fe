"use client"

import Image from "next/image"
interface Props {
    track:any
}

const TrackItem = (props: Props) => {
    const { track } = props

    return (
        <>
            <div className={`flex items-center gap-4 mt-4 cursor-pointer`} >
                <div className="relative rounded-[20px] overflow-hidden">
                    <Image
                         src={`https://res.cloudinary.com/moment-images/${track.image_file}`}
                        alt="Obito"
                        width={64}
                        height={64}
                        className="object-cover"
                    />
                </div>
                <div>
                    <p className="text-[16px] font-semibold">{track.title}</p>
                    <p className="text-gray-400 text-[16px]">{track?.artists?.map((artist: any) => artist.artist.name).join(", ")}</p>
                </div>
            </div>
        </>
    )
}

export default TrackItem
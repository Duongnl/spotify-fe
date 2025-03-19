"use client"

import Image from "next/image"

const TrackItem = () => {
    return (
        <>
            <div className={`flex items-center gap-4 mt-4 cursor-pointer`} >
                <div className="relative rounded-[20px] overflow-hidden">
                    <Image
                        src="/danhdoi.png"
                        alt="Obito"
                        width={64}
                        height={64}
                        className="object-cover"
                    />
                </div>
                <div>
                    <p className="text-[16px] font-semibold">Cụp cái pha xuống</p>
                    <p className="text-gray-400 text-[16px]">Dương Lê no 1</p>
                </div>
            </div>
        </>
    )
}

export default TrackItem
"use client"

import Image from "next/image"

interface IProps {
    isSidebarOpen: boolean,

}

const ArtistItem = (props: IProps) => {

    const { isSidebarOpen } = props

    return (
        <>
               <div className={`flex items-center gap-4 mt-4 cursor-pointer ${!isSidebarOpen && `flex-col`}`} >
                <div className="relative rounded-full overflow-hidden">
                    <Image
                        src="/danhdoi.png"
                        alt="Obito"
                        width={64}
                        height={64}
                        className="object-cover"
                    />
                </div>

                {
                    isSidebarOpen && (
                        <>
                            <div>
                                <p className="text-[16px] font-semibold">Obito</p>
                                <p className="text-gray-400 text-[16px]">Nghệ sĩ</p>
                            </div>
                        </>
                    )
                }


            </div>
        </>
    )
}

export default ArtistItem
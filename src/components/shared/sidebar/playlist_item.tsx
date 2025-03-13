"use client"
import Image from "next/image"

interface IProps {
    isSidebarOpen: boolean,

}

const PlaylistItem = (props: IProps) => {
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
                                <p className="text-[16px] font-semibold">Danh sách phát của tôi</p>
                                <p className="text-gray-400 text-[16px]">Danh sách phát - Duongnl</p>
                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}

export default PlaylistItem
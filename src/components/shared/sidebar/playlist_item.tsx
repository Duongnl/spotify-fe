"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface IProps {
    isSidebarOpen: boolean,
    playlist:any
    user:any
}

const PlaylistItem = (props: IProps) => {
    const { isSidebarOpen, playlist, user } = props
    const router = useRouter()
    const link = () => {
        router.push(`/playlist/${playlist.id}`)
    }
    return (
        <>
                <div className={`flex items-center gap-4 mt-4 cursor-pointer ${!isSidebarOpen && `flex-col`}`} 
                onClick={() => {link()}}
                >
                <div className="relative rounded-full overflow-hidden">
                    <Image
                        src="https://res.cloudinary.com/moment-images/Screenshot_2025-05-10_033029_e5sgxn"
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
                                <p className="text-[16px] font-semibold">{playlist.name}</p>
                                <p className="text-gray-400 text-[16px]">{user.name}</p>
                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}

export default PlaylistItem
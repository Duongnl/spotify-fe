"use client"
import { useQueuebarContext } from "@/context/queuebar-context"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface IProps {
    isSidebarOpen: boolean,
    playlist:any
    user:any
}

const PlaylistItem = (props: IProps) => {
    const { isSidebarOpen, playlist, user } = props
    const router = useRouter()
        const {idList} = useQueuebarContext()
    const link = () => {
        router.push(`/playlist/${playlist.id}`)
    }
    return (
        <>
        <Link href={`/playlist/${playlist.id}`}>
                <div className={`flex items-center gap-4 mt-4 cursor-pointer ${!isSidebarOpen && `flex-col`}`} 
                // onClick={() => {link()}}
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
                                <p className={`text-[16px] font-semibold ${idList === playlist.id && `text-[#00c853]`}`}>{playlist.name}</p>
                                <p className="text-gray-400 text-[16px]">{user.name}</p>
                            </div>
                        </>
                    )
                }

            </div>
            </Link>
        </>
    )
}

export default PlaylistItem
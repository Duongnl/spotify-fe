import Image from "next/image"

export default function ArtistAbout() {
    return (
        <div className="bg-black text-white p-6">
            <h2 className="text-2xl font-bold">About</h2>
            <div className="relative h-[500px] max-w-[70%]">
                {/* Background Image */}
                <Image src="/obito.png?height=600&width=1200" alt="Artist cover" fill 
                    className="object-cover right-0 w-[80%]"
                 priority />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 space-y-4">
                    <div className="text-white text-2xl font-medium">1,529,381 monthly listeners</div>
                    <div className="text-white text-lg pb-4 max-w-2xl">
                        Obito (@youngtobieedasick) is a Vietnamese artist, based in Ho Chi Minh City.
                    </div>
                </div>
            </div>
        </div>

    )
}


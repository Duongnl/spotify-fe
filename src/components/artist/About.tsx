import Image from "next/image"

interface AboutProps {
    data: any;
}

export default function ArtistAbout(props: AboutProps) {
    const { data } = props;

    return (
        <div className="bg-black text-white p-6">
            <h2 className="text-2xl font-bold">About</h2>
            <div className="relative h-[500px] max-w-[100%]">
                {/* Background Image */}
                <Image src={`https://res.cloudinary.com/moment-images/${data.data.image_file}`}
                    alt="Artist profile image" fill
                    className="object-cover [object-position:center_15%]"
                    priority />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 space-y-4">
                    <div className="text-white text-2xl font-medium">
                        {data.data.title || "Monthly listeners"}
                    </div>
                    <div className="text-gray-300 text-sm pb-4 max-w-2xl font-medium">
                        {data.data.bio || "No biography available"}
                    </div>
                </div>
            </div>
        </div>
    )
}


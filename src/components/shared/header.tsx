"use client"
import { useScreenSize } from '@/utils/resize';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import React, { useState, useEffect, useRef } from "react"; // Import React and useRef
import { GalleryHorizontalEnd, MoveRight, Plus } from "lucide-react"
import { redirect, usePathname, useRouter } from "next/navigation"; // Import useRouter
import API from '@/api/api';
import cookie from "js-cookie"
import Link from 'next/link';
import { useUserContext } from '@/context/user-context';
import Image from 'next/image';


interface IProps {
    isSideBarMobile: boolean,

    isSidebarOpen: boolean,
    setIsSidebarOpen: (v: boolean) => void

}



const Header = (props: IProps) => {
    const { isSideBarMobile, isSidebarOpen, setIsSidebarOpen } = props;
    const [isSearchDesktopOpen, setIsSearchDesktopOpen] = useState(false);
    const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);
    // const [search, setSearch] = useState<string>("") // `search` state seems unused, can be removed or used if needed elsewhere
    const { user } = useUserContext()
    const pathname = usePathname();
    const router = useRouter(); // Initialize useRouter
    const isSmallScreen = useScreenSize("(max-width: 587px)");

    // State cho input và kết quả tìm kiếm dropdown
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof mockData>([]);
    // State để kiểm soát hiển thị dropdown
    const [showDropdown, setShowDropdown] = useState(false);
    // Ref cho container tìm kiếm
    const searchContainerRef = useRef<HTMLDivElement>(null); // Specify type for ref

    const [mockData, setMockData] = useState([
        { type: 'song', name: 'Tell the kids i love them', artist: 'Obito, Shiki' },
        { type: 'song', name: 'Timeless', artist: 'The Weeknd, Playboi Carti' },
        { type: 'song', name: 'PHONG ZIN ZIN', artist: 'tlinh, Low G' },
        { type: 'song', name: 'Tell Ur Mom II', artist: 'Winno, Hustlang Heily' },
        { type: 'song', name: 'Tell Ur Mom I', artist: 'Winno, Hustlang Heily' },
        { type: 'song', name: 'Fifth Song', artist: 'Fifth Artist' }, // Added more mock data
        { type: 'song', name: 'Sixth Song', artist: 'Sixth Artist' },
        { type: 'song', name: 'Seventh Song', artist: 'Seventh Artist' },
    ])


    useEffect(() => {
        const fetchapi = async () => {
            const resTracks = await fetch(API.TRACK.GET_TRACKS, {
                method: "GET", // Đúng phương thức POST
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json", // Đặt Content-Type là JSON
                    Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
                },
            });
            // const dataTracks = await resTracks.json();
            // console.log("dataa >>> ", dataTracks)

            const { data } = await resTracks.json();

            const formattedData = data.map((track: any) => {
                const artistNames = track.artists
                    .map((artistData: any) => artistData.artist.name)
                    .join(", ");

                return {
                    type: "song",
                    name: track.title,
                    artist: artistNames,
                };
            });

            setMockData(formattedData);
        }
        fetchapi()
    }, [])

    // Effect để xử lý tìm kiếm/lọc khi query thay đổi
    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            // Quyết định xem có nên ẩn dropdown ngay khi query rỗng không.
            // Nếu muốn dropdown vẫn hiện khi input rỗng nhưng focus, thì không set false ở đây.
            // Để logic ẩn chỉ do click outside hoặc Enter.
            // setShowDropdown(false); // Bỏ dòng này nếu muốn dropdown hiện khi focus và query rỗng
        } else {
            const filtered = mockData.filter(
                (item) =>
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.artist.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
            // Khi có kết quả, đảm bảo dropdown hiện (nếu nó chưa bị ẩn bởi click outside)
            // setShowDropdown(true); // Bỏ dòng này, việc hiện do onFocus
        }
    }, [query]);

    // Effect để lắng nghe sự kiện click bên ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) { // Specify MouseEvent type
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) { // Cast event.target to Node
                setShowDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchContainerRef]); // Dependency array

    // Effect để xử lý hiển thị search desktop/mobile
    useEffect(() => {
        if (isSmallScreen) {
            setIsSearchDesktopOpen(false);
        } else {
            setIsSearchDesktopOpen(true);
            // Khi chuyển sang desktop, ẩn search mobile nếu đang mở
            setIsSearchMobileOpen(false);
        }
    }, [isSmallScreen]);


    const handleShowSearchMobile = () => {
        // Toggle mobile search, ensure dropdown is hidden when closed
        setIsSearchMobileOpen(!isSearchMobileOpen);
        if (isSearchMobileOpen) { // If closing
            setShowDropdown(false); // Hide dropdown
            setQuery(''); // Clear query
            setResults([]); // Clear results
        }
    }

    const handleShowSidebarMobile = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    // Hàm xử lý khi ấn phím trong input (cho cả desktop và mobile search nếu cần)
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => { // Specify type
        if (event.key === 'Enter') {
            event.preventDefault();

            const trimmedQuery = query.trim();

            if (trimmedQuery.length > 0) {
                const encodedQuery = encodeURIComponent(trimmedQuery);
                router.push(`/search/${encodedQuery}`); // Sử dụng router.push để navigate

                // Ẩn dropdown và xóa state sau khi submit
                setShowDropdown(false);
                setQuery('');
                setResults([]);
                setIsSearchMobileOpen(false); // Ẩn cả search mobile nếu đang mở
            }
        }
    };

    // Hàm xử lý click vào 1 item trong dropdown (tùy chọn)
    const handleItemClick = (item: typeof mockData[0]) => {
        // Ví dụ: Chuyển hướng đến trang chi tiết bài hát
        router.push(`/search/${item.name}`); // Giả định item có id
        console.log("Clicked item:", item); // Log ra để test

        // Ẩn dropdown sau khi click vào item
        setShowDropdown(false);
        // Tùy chọn: Xóa nội dung input và kết quả
        // setQuery('');
        // setResults([]);
    }


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" href={"/account/overview"}>
                    Tài khoản
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link rel="noopener noreferrer" href={`/user/${user?.id}`}>
                    Hồ sơ
                </Link>
            ),
        },
    ];

    const linkHome = () => {
        router.push(`/`)
    }


    return (
        <>
            <div className="flex w-full h-[60px] p-[8px] justify-between">

                {/* === Left Section (Sidebar Toggle, Logo, Home Button, Desktop Search) === */}
                <div className="flex items-center">

                    {/* Mobile Sidebar Toggle */}
                    {
                        isSideBarMobile && pathname !== '/account/overview' && (
                            <button
                                className="rounded-full bg-[#1f1f1f] text-[25px] h-full w-[48px] flex justify-center items-center"
                                onClick={handleShowSidebarMobile}
                            >
                                <GalleryHorizontalEnd size={30} className="cursor-pointer" />
                            </button>
                        )
                    }

                    {/* Logo (Example using spotify icon) */}
                    <i className="fa-brands fa-spotify ml-5 text-[35px]"></i>

                    {/* Home Button */}
                    <button className="rounded-full bg-[#1f1f1f] ml-5 text-[25px] h-full w-[48px]"
                        onClick={() => { linkHome() }}
                    >
                        <i className="fa-solid fa-house"></i>
                    </button>


                    {/* Desktop Search Input + Dropdown */}
                    {
                        isSearchDesktopOpen ? (
                            // Assign ref here for click outside logic
                            <div
                                className='ml-2 bg-[#1f1f1f] h-full rounded-full border border-transparent focus-within:border-white flex items-center w-[474px] div-search relative'
                                ref={searchContainerRef} // <-- Gán ref
                            >
                                <i className="fa-solid fa-magnifying-glass text-[20px] m-5 text-gray-400"></i> {/* Màu icon */}
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="text-[15px] w-full rounded-tr-full rounded-br-full bg-[#1f1f1f] focus-visible:outline-none pr-4 text-white placeholder-gray-400" // Màu chữ và placeholder
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => {
                                        // Hiện dropdown khi focus, ngay cả khi query rỗng,
                                        // nội dung dropdown sẽ được kiểm soát bởi logic results.length > 0
                                        setShowDropdown(true);
                                    }}
                                    onKeyDown={handleKeyPress} // <-- Thêm onKeyDown
                                />

                                {/* Dropdown kết quả tìm kiếm */}
                                {/* Hiển thị dropdown container khi showDropdown là true */}
                                {showDropdown && (
                                    <div className="absolute top-full left-0 w-full z-10 bg-zinc-800 rounded-md shadow-xl border border-zinc-700 p-2 mt-1 max-h-80 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
                                        {/* Optional: Category Header */}
                                        {/* ... */}

                                        {/* Hiển thị nội dung list chỉ khi có kết quả */}
                                        {results.length > 0 ? (
                                            <ul className="space-y-1">
                                                {results.slice(0, 4).map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="px-4 py-2 rounded-md cursor-pointer hover:bg-zinc-700 text-white"
                                                        onClick={() => handleItemClick(item)} // <-- Optional: handle item click
                                                    >
                                                        <div className="font-semibold">{item.name}</div>
                                                        <div className="text-sm text-gray-400">{item.artist}</div>
                                                    </li>
                                                ))}
                                                {/* Nút "Xem tất cả" */}
                                                {results.length > 4 && (
                                                    <li
                                                        className="px-4 py-2 text-center text-blue-400 cursor-pointer hover:underline"
                                                        onClick={() => {
                                                            const encodedQuery = encodeURIComponent(query.trim());
                                                            router.push(`/search/${encodedQuery}`);
                                                            setShowDropdown(false); // Ẩn dropdown khi click "Xem tất cả"
                                                            // setQuery(''); // Tùy chọn xóa query
                                                            // setResults([]); // Tùy chọn xóa results
                                                        }}
                                                    >
                                                        Show all results ({results.length})
                                                    </li>
                                                )}
                                            </ul>
                                        ) : (
                                            // Optional: Hiển thị thông báo khi không có kết quả nhưng dropdown vẫn mở
                                            <div className="px-4 py-2 text-white">No results found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Mobile Search Button
                            <button
                                className="rounded-full bg-[#1f1f1f] ml-5 text-[25px] h-full w-[48px] flex justify-center items-center" // Added flex/justify/items center
                                onClick={handleShowSearchMobile}
                            >
                                <i className="fa-solid fa-magnifying-glass text-[20px]"></i>
                            </button>
                        )
                    }


                </div>


                {/* === Right Section (Notifications, User Dropdown) === */}
                <div className="flex items-center div-user-noti">
                    {/* <button className='mr-10 ml-10 max-[587px]:mr-5 max-[587px]:ml-2'>
                        <i className=" text-[25px] fa-solid fa-bell"></i>
                    </button> */}

                    <Dropdown menu={{ items }}
                        placement="bottomRight"
                        trigger={['click']}
                        overlayClassName="user-dropdown"
                    >
                        <button className='w-[40px] h-[40px] ' >
                            {/* <img src="/images/avatar.jpg" className='w-[40px] h-[40px] rounded-full ' alt="" /> */}
                            {user?.imageUrl === null ? (<>

                                <img
                                    src={`https://res.cloudinary.com/moment-images/1_2_r15hh3`}
                                    alt="Album cover"
                                    className='w-[40px] h-[40px] rounded-full object-cover'
                                />
                            </>) : (
                                <>
                                    <img
                                        src={`https://res.cloudinary.com/moment-images/${user?.imageUrl}`}
                                        alt="Album cover"
                                        className='w-[40px] h-[40px] rounded-full object-cover'
                                    />
                                </>
                            )}


                        </button>
                    </Dropdown>

                </div>

            </div>

            {/* === Mobile Search Input (Separate from Desktop) === */}
            {/* Note: This mobile search input currently does not have dropdown logic */}
            {
                isSearchDesktopOpen === false && isSearchMobileOpen && (
                    <div className="relative w-full p-2"> {/* Added p-2 for padding */}
                        {/* Need to implement search functionality here for mobile */}
                        <input
                            type="text"
                            placeholder="Search"
                            className="text-[15px] w-full bg-[#1f1f1f]/90 focus-visible:outline-none
             absolute top-0 left-0 z-[9999] p-3 rounded-md shadow-lg text-white placeholder-gray-400" // Added text/placeholder color
                            value={query} // Sử dụng cùng state query
                            onChange={(e) => setQuery(e.target.value)} // Cập nhật cùng state query
                            onKeyDown={handleKeyPress} // Thêm onKeyDown cho mobile search
                            onFocus={() => setShowDropdown(true)} // Hiện dropdown khi focus mobile input (nếu muốn)
                        />
                        {/* Lớp phủ mờ riêng biệt */}
                        {/* Consider putting the mobile search dropdown here, similar to desktop */}
                        {/* <div className="absolute inset-0 bg-[#1f1f1f]/50 backdrop-blur-lg z-[-1] rounded-md"></div> */}
                    </div>
                )
            }

        </>
    );
}

export default Header;
"use client"
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { useState, useEffect } from "react";
const Header = () => {


    const [isSearchDesktopOpen, setIsSearchDesktopOpen] = useState(false);
    const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);
    const [search, setSearch] = useState<string>("")

    // Khi resize màn hình, nếu lớn hơn 493px thì luôn hiển thị search bar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 587) {
                setIsSearchDesktopOpen(false);
            }

            else if (window.innerWidth > 587) {
                setIsSearchDesktopOpen(true);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleShowSearchMobile = () => {
        if (isSearchMobileOpen) {
            setIsSearchMobileOpen(false);
        } else {
            setIsSearchMobileOpen(true);
        }
    }


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Tài khoản
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Hồ sơ
                </a>
            ),
        },
    ];


    return (
        <>
            <div className="flex w-full  h-[64px] p-[8px]  justify-between" >

                <div className="flex items-center">
                    <i className="fa-brands fa-spotify ml-5 text-[35px]"></i>
                    <button className="rounded-full bg-[#1f1f1f] ml-5 text-[25px] h-full w-[48px]"  >  <i className="fa-solid fa-house "></i> </button>

                    {
                        isSearchDesktopOpen ? (
                            <>
                                <div className='ml-2 bg-[#1f1f1f] h-full rounded-full border border-transparent focus-within:border-white flex items-center w-[474px] div-search'>
                                    <i className="fa-solid fa-magnifying-glass text-[20px] m-5"></i>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="text-[15px] w-full rounded-tr-full rounded-br-full bg-[#1f1f1f] focus-visible:outline-none"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <button className="rounded-full bg-[#1f1f1f] ml-5 text-[25px] h-full w-[48px]"
                                    onClick={() => { handleShowSearchMobile() }}
                                >
                                    <i className="fa-solid fa-magnifying-glass text-[20px]"></i>
                                </button>
                            </>
                        )
                    }


                </div>


                <div className="flex items-center div-user-noti">
                    <button className='mr-10 ml-10'>
                        <i className=" text-[25px] fa-solid fa-bell"></i>
                    </button>

                    <Dropdown menu={{ items }}
                        placement="bottomRight"
                        trigger={['click']}
                        overlayClassName="user-dropdown"
                    >
                        <button className='w-[40px] h-[40px]' >
                            <img src="/images/avatar.jpg" className='w-[40px] h-[40px] rounded-full ' alt="" />
                        </button>
                    </Dropdown>

                </div>
            </div>

            {
                isSearchDesktopOpen === false && isSearchMobileOpen && (
                    <>
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search"
                                className="text-[15px] w-full bg-[#1f1f1f]/90 focus-visible:outline-none
      absolute top-0 left-0 z-50 p-3 rounded-md shadow-lg"
                            />
                            {/* Lớp phủ mờ riêng biệt */}
                            <div className="absolute inset-0 bg-[#1f1f1f]/50 backdrop-blur-lg z-[-1] rounded-md"></div>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default Header
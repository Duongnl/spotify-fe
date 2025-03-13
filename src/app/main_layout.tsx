"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/shared/sidebar/sidebar";
import Header from "@/components/shared/header";
import { Row, Col } from "antd";
import { useScreenSize } from "@/utils/resize";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isSideBarMobile, setIsSideBarMobile] = useState<boolean>(false);

    const isSmallScreen = useScreenSize("(max-width: 587px)");


    useEffect(() => {
        console.log ("isSmallScreen >>> ", isSmallScreen)
        if (isSmallScreen) {
            setIsSideBarMobile(true)

        } else if (isSmallScreen === false) {
            setIsSideBarMobile(false)
        }
    }, [isSmallScreen]);


    return (
        <div className="flex flex-col h-screen">
            {/* Header cố định trên cùng */}
            <Header
                isSideBarMobile={isSideBarMobile}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            /> {/* Đặt chiều cao cố định, ví dụ 60px */}


            {/* Row chiếm phần còn lại của màn hình */}
            <div className=" flex h-[calc(100vh-60px)]">
                {/* Sidebar */}

                {
                    isSideBarMobile && !isSidebarOpen ? (
                        <>

                        </>
                    ) : (
                        <>
                            <div
                                className={!isSideBarMobile ? `h-full pl-2 pr-2 pb-2 flex` :
                                    `fixed top-[60px] left-0 h-[calc(100vh-60px)] w-[300px] bg-[#1f1f1f] shadow-lg z-50`} >
                                <Sidebar
                                    isSidebarOpen={isSidebarOpen}
                                    setIsSidebarOpen={setIsSidebarOpen}
                                    isSideBarMobile={isSideBarMobile}
                                />
                            </div>
                        </>
                    )
                }



                {/* Nội dung chính */}
                <div
                    className="h-full overflow-auto custom-scrollbar flex-grow">
                    {children}
                </div>
            </div>


        </div>
    );
}

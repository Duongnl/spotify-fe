"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/shared/sidebar/sidebar";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { useScreenSize } from "@/utils/resize";
import PlayBar from "@/components/shared/play_bar";
import { usePathname, useRouter } from "next/navigation";
import QueueBar from "@/components/shared/queue/queue_bar";
import { useUserContext } from "@/context/user-context";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const isSmallScreen = useScreenSize("(max-width: 587px)");

    const isSmallScreenHide = useScreenSize("(max-width: 1209px)")
    const [isHideBar, setIsHideBar] = useState(false)

    const [isSideBarMobile, setIsSideBarMobile] = useState<boolean | undefined>(undefined);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isQueueBarOpen, setIsQueueBarOpen] = useState(true)
    const {user} = useUserContext()
    const pathname = usePathname();
    useEffect(() => {
        setIsSideBarMobile(isSmallScreen);
    }, [isSmallScreen]);

    useEffect(() => {
        if (isSmallScreenHide && isQueueBarOpen) {
            setIsSidebarOpen(false);
        }
    }, [isSmallScreenHide]);

    useEffect(() => {
        if (isSidebarOpen && isSmallScreenHide) {
            setIsQueueBarOpen(false);
        } 
    }, [isSidebarOpen]);

    
    useEffect(() => {
        if (isQueueBarOpen && isSmallScreenHide) {
            setIsSidebarOpen(false);
        } 
    }, [isQueueBarOpen]);


    if (isSideBarMobile === undefined) return null;

    return (

        <div className="flex flex-col h-screen">
            {
                pathname !== "/login" && pathname !== "/signup" && (
                    <>

                        <Header
                            isSideBarMobile={isSideBarMobile}
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                        />

                    </>
                )
            }



            <div className={`flex ${(pathname !== "/login" && pathname !== "/signup" && pathname !== "/account/profile" ? `${pathname !== "/account/overview" ? `h-[calc(100vh-155px)]` : `h-[calc(100vh-60px)]`}` : `h-screen`)} `}>
                {/* ✅ Tránh nhấp nháy bằng cách không render khi chưa xác định */}
                {!(isSideBarMobile && !isSidebarOpen) && pathname !== "/login" && pathname !== "/signup" && pathname !== "/account/overview" && pathname != "/account/profile"&& (
                    <div
                        className={
                            !isSideBarMobile
                                ? `h-full pl-2 pr-2  flex`
                                : "fixed top-[60px] left-0 h-[calc(100vh-60px)] w-[300px] bg-[#1f1f1f] shadow-lg z-50"
                        }
                    >
                        <Sidebar
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                            isSideBarMobile={isSideBarMobile}
                        />
                    </div>
                )}

                <div className="h-full overflow-auto custom-scrollbar flex flex-col flex-grow">
                    <div className="flex-grow">
                        {children}
                        <Footer/>
                    </div>
                </div>
                {
                    isQueueBarOpen && pathname !== "/login" && pathname !== "/signup" && pathname !== "/account/overview" && pathname != "/account/profile" && (
                        <>
                            <div className="flex h-full  pr-2 ">
                                <QueueBar 
                                 isQueueBarOpen = {isQueueBarOpen}
                                 setIsQueueBarOpen={ setIsQueueBarOpen}
                                />
                            </div>
                        </>
                    )
                }

            </div>


            {
                pathname !== "/login" && pathname !== "/signup" && pathname !== "/account/overview" && user?.playbar != null && pathname !== "/account/profile" && (
                    <>
                        <div className="w-full h-[95px]" >
                            <PlayBar 
                              isQueueBarOpen = {isQueueBarOpen}
                              setIsQueueBarOpen={ setIsQueueBarOpen}
                            />
                        </div>
                    </>
                )
            }



        </div>
    );
}

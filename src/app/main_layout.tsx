"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/shared/sidebar/sidebar";
import Header from "@/components/shared/header";
import { useScreenSize } from "@/utils/resize";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const isSmallScreen = useScreenSize("(max-width: 587px)");

    // ✅ Ban đầu set undefined để tránh lỗi Hydration
    const [isSideBarMobile, setIsSideBarMobile] = useState<boolean | undefined>(undefined);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsSideBarMobile(isSmallScreen);
    }, [isSmallScreen]);

    // ✅ Nếu `isSideBarMobile` chưa được xác định, không render gì để tránh lỗi
    if (isSideBarMobile === undefined) return null;

    return (
        <div className="flex flex-col h-screen">
            <Header
                isSideBarMobile={isSideBarMobile}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="flex h-[calc(100vh-60px)]">
                {/* ✅ Tránh nhấp nháy bằng cách không render khi chưa xác định */}
                {!(isSideBarMobile && !isSidebarOpen) && (
                    <div
                        className={!isSideBarMobile
                            ? "h-full pl-2 pr-2 pb-2 flex"
                            : "fixed top-[60px] left-0 h-[calc(100vh-60px)] w-[300px] bg-[#1f1f1f] shadow-lg z-50"}
                    >
                        <Sidebar
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                            isSideBarMobile={isSideBarMobile}
                        />
                    </div>
                )}

                <div className="h-full overflow-auto custom-scrollbar flex-grow">
                    {children}
                </div>
            </div>
        </div>
    );
}

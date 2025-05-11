"use client"
import API from '@/api/api';
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import cookie from "js-cookie"
import { useUserContext } from './user-context';

type QueuebarContextType = {

    queueTracks: any,
    setQueueTracks: (v: any) => void
    fetchGetQueueTracks: (v?: any, x?:any) => void

};

const QueuebarContext = createContext<QueuebarContextType | undefined>(undefined);

export const QueuebarProvider = ({ children }: { children: ReactNode }) => {

    const [queueTracks, setQueueTracks] = useState<any>([]);

    const fetchGetQueueTracks = async (arr?: any, idTrackPlay?: any) => {
        const resTracks = await fetch(API.TRACK.GET_TRACKS, {
            method: "GET", // Đúng phương thức POST
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json", // Đặt Content-Type là JSON
                Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
            },
        });
        const dataTracks = await resTracks.json();
        if (dataTracks && dataTracks.status === 200) {
            if (arr && idTrackPlay) {
                const idsInArray1 = new Set(arr.map((item: { id: string }) => item.id));
                const uniqueFromArray2 = dataTracks.data.filter((item: { id: string }) => !idsInArray1.has(item.id));

                // Gộp 2 mảng lại
                const combined = [...arr, ...uniqueFromArray2];

                // Loại bỏ phần tử có id bằng idTrackPlay
                const result = combined.filter((item: { id: string }) => item.id !== idTrackPlay);

                setQueueTracks(result);
            } else {
                setQueueTracks(dataTracks.data);
            }
        }
    }









    return (
        <QueuebarContext.Provider value={{
            setQueueTracks,
            queueTracks,
            fetchGetQueueTracks

        }}>
            {children}
        </QueuebarContext.Provider>

    );
};

export const useQueuebarContext = () => {
    const context = useContext(QueuebarContext);
    if (!context) throw new Error('usePlaybarContext must be used within a UserProvider');
    return context;
};

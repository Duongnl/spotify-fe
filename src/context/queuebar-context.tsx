"use client"
import API from '@/api/api';
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import cookie from "js-cookie"
import { useUserContext } from './user-context';

type QueuebarContextType = {

    queueTracks: any,
    setQueueTracks: (v: any) => void
    fetchGetQueueTracks: (v?: any, id?: any) => void
    setIdTrackPlay: (v: any) => void
    idTrackPlay: any
    setIdList: (v: any) => void
    idList: any

};

const QueuebarContext = createContext<QueuebarContextType | undefined>(undefined);

export const QueuebarProvider = ({ children }: { children: ReactNode }) => {

    const [queueTracks, setQueueTracks] = useState<any>([]);
    const [idTrackPlay, setIdTrackPlay] = useState("")
    const { user } = useUserContext()
    const [idList, setIdList] = useState("")

    useEffect(() => {
        if (user?.playbar?.track) {
            fetchGetQueueTracks([], user.playbar.track.id)
        }
    }, [user])

    const fetchGetQueueTracks = async (arr?: any, id?: any) => {
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
            if (arr && id) {
                const idsInArray1 = new Set(arr.map((item: { id: string }) => item.id));
                const uniqueFromArray2 = dataTracks.data.filter((item: { id: string }) => !idsInArray1.has(item.id));
                const result = [...arr, ...uniqueFromArray2];

                // Tìm index phần tử có id === id
                const index = result.findIndex((item: any) => String(item.id) === String(id));

                if (index !== -1) {
                    const [trackToTop] = result.splice(index, 1); // xóa khỏi mảng
                    result.unshift(trackToTop); // đưa lên đầu
                }

                setIdTrackPlay(id)
                setQueueTracks(result);
                console.log("first >>> ", id)
            } else {
                setQueueTracks(dataTracks.data);
            }
        }
    }









    return (
        <QueuebarContext.Provider value={{
            setQueueTracks,
            queueTracks,
            fetchGetQueueTracks,
            setIdTrackPlay,
            idTrackPlay,
            setIdList,
            idList
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

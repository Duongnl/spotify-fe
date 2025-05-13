"use client"
import API from '@/api/api';
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import cookie from "js-cookie"
import { useUserContext } from './user-context';

type QueuebarContextType = {

    queueTracks: any,
    setQueueTracks: (v: any) => void
    fetchGetQueueTracks: (v: any, id: any) => void
    setIdList: (v: any) => void
    idList: any
    setFirtsTrack : (v: any, id: any)=> void

};

const QueuebarContext = createContext<QueuebarContextType | undefined>(undefined);

export const QueuebarProvider = ({ children }: { children: ReactNode }) => {

    const [queueTracks, setQueueTracks] = useState<any>([]);
    const { user } = useUserContext()
    const [idList, setIdList] = useState("")

    useEffect(() => {
        if (user?.playbar?.track) {
            fetchGetQueueTracks([], user.playbar.track.id)
        }
    }, [user])

    const fetchGetQueueTracks = async (arr: any, id: any) => {
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

                setQueueTracks(result);
            } else {
                setQueueTracks(dataTracks.data);
            }
        }
    }

    const setFirtsTrack = (arr: any[], id: any) => {
        const index = arr.findIndex(item => item.id === id);
        if (index === -1) return arr; // Không tìm thấy thì trả về mảng ban đầu

        const item = arr[index];
        const newArr = [item, ...arr.slice(0, index), ...arr.slice(index + 1)];
        setQueueTracks(newArr);
    };









    return (
        <QueuebarContext.Provider value={{
            setQueueTracks,
            queueTracks,
            fetchGetQueueTracks,
          setFirtsTrack,
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

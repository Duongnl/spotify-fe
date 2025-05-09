"use client"
import API from '@/api/api';
import cookie from "js-cookie";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserContextType = {
    user: any;
    setUser: (value: any) => void;
    fetchGetUser: () => void
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(undefined);

    useEffect(() => {
        if (cookie.get("session-id") != null ) {
            fetchGetUser()
        }
    },[])

    const fetchGetUser = async () => {

        const res = await fetch(API.USER.ME, {
            method: "GET", // Đúng phương thức POST
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json", // Đặt Content-Type là JSON
                Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
            },
        });

        const data = await res.json();
        if (data && data.status === 200) {
          setUser(data.data)
        }
    }


    return (

        <UserContext.Provider value={{ user, setUser, fetchGetUser }}>
            {children}
        </UserContext.Provider>

    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUserContext must be used within a UserProvider');
    return context;
};

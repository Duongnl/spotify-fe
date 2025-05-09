"use client"
import API from '@/api/api';
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import cookie from "js-cookie"
import { useUserContext } from './user-context';

type SidebarContextType = {
  playlists:any
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {

  const [playlists, setPlaylists]= useState<any>([]);
  const { setUser, fetchGetUser, user } = useUserContext();

  useEffect(() => {
    if (user?.playbar?.track) {
     setPlaylists(user.playlists);
    }
  }, [user])
  

  return (

    <SidebarContext.Provider value={{
     playlists

    }}>
      {children}
    </SidebarContext.Provider>

  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('usePlaybarContext must be used within a UserProvider');
  return context;
};

"use client"
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Input } from 'antd';
import API from '@/api/api';
import cookie from "js-cookie"
import { request } from 'http';
import { useUserContext } from '@/context/user-context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
interface Props {
    isModalOpenDelete: any,
    setIsModalOpenDelete: (v: any) => void;
    idPlaylist:any
}

const DeletePlaylistModal = (props: Props) => {
    const { isModalOpenDelete, setIsModalOpenDelete, idPlaylist } = props

    const router = useRouter ();


    const {fetchGetUser} = useUserContext()

    const handleCancel = () => {
        setIsModalOpenDelete(false);
    };

    const handleSaveName = async () => {

        const res = await fetch(`${API.PLAYLIST.PLAYLIST}${idPlaylist}/`, {
            method: "DELETE", // Đúng phương thức POST
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json", // Đặt Content-Type là JSON
                Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
            },
        });

        const data = await res.json();
        if (data && data.status === 200) {
            setIsModalOpenDelete(false);
            toast.success("Xóa playlist thành công !")
            fetchGetUser()
            router.push("/")
        }
    }


    return (
        <>
            <Modal
                title="Đổi tên playlist"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpenDelete}
                onOk={handleSaveName}
                onCancel={handleCancel}
                className="custom-modal"
            >
                <h2>Bạn có muốn xóa playlist này không ?</h2>
            </Modal>
        </>
    )
}

export default DeletePlaylistModal
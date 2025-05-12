"use client"
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Input } from 'antd';
import API from '@/api/api';
import cookie from "js-cookie"
import { request } from 'http';
import { useUserContext } from '@/context/user-context';
import { toast } from 'react-toastify';
interface Props {
    isModalOpen: any,
    setIsModalOpen: (v: any) => void;
    nameValue:any,
    setNameValue:(v: any) => void
    idPlaylist:any
}

const EditPlaylistModal = (props: Props) => {
    const { isModalOpen, setIsModalOpen, nameValue, setNameValue, idPlaylist } = props
    const [nameChange, setNameChange] = useState(nameValue)
    const {user} = useUserContext()

    const {fetchGetUser} = useUserContext()


    const handleOnChangeName = (e: string) => {
        setNameChange(e)
    }


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSaveName = async () => {

        if (nameChange === '') {
            toast.error("Không được để trống")
            return
        }

        const request = {
            user_id:user.id,
            name: nameChange,
            status: 1
        }

        const res = await fetch(`${API.PLAYLIST.PLAYLIST}${idPlaylist}/`, {
            method: "PUT", // Đúng phương thức POST
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json", // Đặt Content-Type là JSON
                Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
            },
            body: JSON.stringify(request), // Gửi dữ liệu JSON
        });

        const data = await res.json();
        if (data && data.status === 200) {
            setNameValue(data.data.name)
            setIsModalOpen(false);
            toast.success("Đổi tên thành công !")
            fetchGetUser()
            
        }
    }


    return (
        <>
            <Modal
                title="Đổi tên playlist"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleSaveName}
                onCancel={handleCancel}
                className="custom-modal"
            >
                <Input
                    value={nameChange}
                    style={{ backgroundColor: 'black', color: 'white' }}
                    onChange={(e) => { handleOnChangeName(e.target.value) }}
                />
            </Modal>
        </>
    )
}

export default EditPlaylistModal
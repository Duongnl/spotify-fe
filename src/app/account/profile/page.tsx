'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/user-context';
import API from '@/api/api';
import { toast } from 'react-toastify';
import cookie from "js-cookie";

export default function ProfileEdit() {
    const router = useRouter();
    const { user, setUser } = useUserContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setUser((prevUser: any) => {
            if (!prevUser) return prevUser;
            return {
                ...prevUser,
                [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.id) {
            toast.error("User or user ID is not available");
            return;
        }

        const accessToken = cookie.get('session-id');
        if (!accessToken) {
            toast.error("Access token not found in session-id cookie");
            return;
        }

        try {
            const response = await fetch(`${API.USER.UPDATE_USER(user.id)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password || undefined,
                    birthDay: user.birthDay,
                    gender: user.gender,
                }),
            });

            const result = await response.json();
            if (response.ok && result.status === 200) {
                setUser(result.data);
                toast.success('Lưu hồ sơ thành công!', {
                    onClose: () => router.push('/account/overview'), // Chuyển hướng sau khi toast đóng
                });
            } else {
                if (result.error && typeof result.error === 'object') {
                    const errorMessages = Object.entries(result.error).map(([field, messages]) => {
                        const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
                        return `${fieldName}: ${Array.isArray(messages) ? messages.join(', ') : messages}`;
                    });
                    toast.error(errorMessages.join(' | '));
                } else {
                    toast.error(`Lỗi khi lưu hồ sơ: ${result.message || result.detail || 'Unknown error'}`);
                }
            }
        } catch (error) {
            toast.error(`Lỗi kết nối: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const genders = ['MALE', 'FEMALE', 'OTHER'];

    return (
        <>
            <div className="min-h-screen bg-black text-white flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full space-y-8">
                    <Head>
                        <title>Chỉnh sửa hồ sơ</title>
                        <meta name="description" content="Chỉnh sửa thông tin hồ sơ" />
                    </Head>

                    <div className="bg-black text-white px-8 py-6">
                        <h1 className="text-5xl font-bold mb-10">Chỉnh sửa hồ sơ</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="username" className="block text-sm mb-2 text-gray-300">
                                    Tên đăng nhập
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={user?.username || ''}
                                    readOnly
                                    className="w-full bg-gray-800 border border-gray-600 rounded py-3 px-4 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                            {/* Tên người dùng */}
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
                                    Tên người dùng
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user?.name || ''}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-600 rounded py-3 px-4 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user?.email || ''}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-600 rounded py-3 px-4 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            {/* Mật khẩu */}
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm mb-2 text-gray-300">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={user?.password || ''}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-gray-800 border border-gray-600 rounded py-3 px-4 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="birthDay" className="block text-sm mb-2 text-gray-300">
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    id="birthDay"
                                    name="birthDay"
                                    value={user?.birthDay ? new Date(user.birthDay).toISOString().split('T')[0] : ''}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-600 rounded py-3 px-4 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            {/* Giới tính */}
                            <div className="mb-6">
                                <label htmlFor="gender" className="block text-sm mb-2 text-gray-300">
                                    Giới tính
                                </label>
                                <div className="relative">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={user?.gender || ''}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800 border border-gray-600 rounded py-3 px-4 text-white appearance-none pr-10 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    >
                                        {genders.map((gender) => (
                                            <option key={gender} value={gender}>
                                                {gender}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end mt-10 space-x-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="px-8 py-3 rounded-full text-white bg-transparent border border-gray-600 hover:bg-gray-900"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-full text-white bg-green-500 hover:bg-green-600"
                                >
                                    Lưu hồ sơ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/user-context';
import API from '@/api/api';
import { toast } from 'react-toastify';
import cookie from "js-cookie";

// Định nghĩa interface cho updatedUser
interface UpdatedUser {
    image?: File | null;
    name: string;
    email: string;
    birthDay: string;
    gender: string;
    password?: string; // password là tùy chọn
}

export default function ProfileEdit() {
    const router = useRouter();
    const { user, setUser } = useUserContext();
    console.log("user update data:", user);

    // State riêng cho password và passwordConfirm
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);   

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

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            // Tạo URL preview cho hình ảnh
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadToCloudinary = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "moment"); // preset bạn đã tạo trong Cloudinary

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/moment-images/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                return data.public_id; // hoặc data.secure_url nếu bạn muốn dùng URL đầy đủ
            } else {
                console.error("Upload error:", data);
                return null;
            }
        } catch (err) {
            console.error("Upload failed:", err);
            return null;
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true)
        e.preventDefault();

        let uploadedImageId = user?.imageUrl || null;

        if (selectedImage) {
            const publicId = await uploadToCloudinary(selectedImage);
            if (publicId) {
                uploadedImageId = publicId;
            } else {
                alert("Không thể upload ảnh. Vui lòng thử lại.");
                return;
            }
        }

        if (!user || !user.id) {
            toast.error("User or user ID is not available");
            return;
        }

        // Xác nhận mật khẩu
        if (password && password !== passwordConfirm) {
            toast.error("Mật khẩu xác nhận không khớp!");
            return;
        }

        const accessToken = cookie.get('session-id');
        if (!accessToken) {
            toast.error("Access token not found in session-id cookie");
            return;
        }

        try {
            // Tạo FormData nếu có hình ảnh để tải lên
            const formData = new FormData();

            // Thêm các trường dữ liệu khác vào formData
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('birthDay', user.birthDay);
            formData.append('gender', user.gender);
            formData.append('imageUrl', uploadedImageId);

            // Chỉ gửi password nếu người dùng nhập mật khẩu mới
            if (password) {
                formData.append('password', password);
            }

            // Thêm hình ảnh vào formData nếu đã chọn
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            const response = await fetch(`${API.USER.UPDATE_USER(user.id)}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    // Không đặt 'Content-Type': 'application/json' vì đang sử dụng FormData
                },
                body: formData,
            });

            const result = await response.json();
            if (response.ok && result.status === 200) {
                setUser(result.data);
                toast.success('Lưu hồ sơ thành công!', {
                    onClose: () => router.push('/account/overview'),
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
          setIsLoading(false)
    };

    const genders = ['MALE', 'FEMALE', 'OTHER'];

    return (
        <>
            <div className="min-h-screen bg-black text-white flex justify-center py-12 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-2xl w-full space-y-8">
                    <Head>
                        <title>Chỉnh sửa hồ sơ</title>
                        <meta name="description" content="Chỉnh sửa thông tin hồ sơ" />
                    </Head>

                    <div className="bg-black text-white px-8 py-6">
                        <h1 className="text-5xl font-bold mb-10">Chỉnh sửa hồ sơ</h1>

                        <form onSubmit={handleSubmit}>
                            {/* Hình ảnh đại diện */}
                            <div className="mb-6 flex justify-center">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-600">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Profile Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : user?.imageUrl ? (
                                            <img
                                                src={`https://res.cloudinary.com/moment-images/${user.imageUrl}`}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                                <span className="text-gray-400">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="image"
                                        className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 cursor-pointer"
                                    >
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                                            />
                                        </svg>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            </div>

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
                                    Mật khẩu mới (để trống nếu không thay đổi)
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••"
                                    className="w-full bg-gray-800 border border-gray-600 rounded py-3 px-4 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            {/* Xác nhận mật khẩu */}
                            <div className="mb-6">
                                <label htmlFor="passwordConfirm" className="block text-sm mb-2 text-gray-300">
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={handlePasswordConfirmChange}
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
                                    className= {`px-8 py-3 rounded-full text-white bg-green-500 hover:bg-green-600 ${isLoading && `disabled`}`}
                                >
                                   {isLoading ? 'Đang lưu hồ sơ ... ':'Lưu hồ sơ'} 
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
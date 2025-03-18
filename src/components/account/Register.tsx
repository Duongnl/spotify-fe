"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "antd"
import { Input } from "postcss"

export default function SpotifySignup() {
  const [email, setEmail] = useState("")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {/* Spotify Logo */}
      <div className="mb-8">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
            fill="white"
          />
          <path
            d="M16.7461 10.2C14.2961 8.8 10.8461 8.6 8.09609 9.2C7.64609 9.3 7.19609 9 7.09609 8.6C6.99609 8.1 7.29609 7.7 7.74609 7.6C10.8461 6.9 14.6461 7.1 17.4461 8.7C17.8461 8.9 17.9461 9.4 17.7461 9.8C17.5461 10.1 17.0461 10.3 16.7461 10.2ZM16.5461 12.7C16.3461 13 15.9461 13.2 15.6461 13C13.5461 11.8 10.6461 11.4 8.34609 12.1C7.94609 12.2 7.54609 12 7.44609 11.6C7.34609 11.2 7.54609 10.8 7.94609 10.7C10.6461 9.9 13.8461 10.3 16.2461 11.7C16.4461 11.8 16.6461 12.3 16.5461 12.7ZM15.3461 15.2C15.1461 15.5 14.8461 15.6 14.6461 15.4C12.8461 14.4 10.7461 14.1 7.94609 14.7C7.64609 14.8 7.44609 14.6 7.34609 14.3C7.24609 14 7.44609 13.8 7.74609 13.7C10.7461 13.1 13.1461 13.4 15.1461 14.5C15.4461 14.6 15.4461 15 15.3461 15.2Z"
            fill="black"
          />
        </svg>
      </div>

      {/* Main Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold leading-tight">
          Đăng ký để <br />
          bắt đầu nghe
        </h1>
      </div>

      {/* Form */}
      <div className="w-full max-w-md px-6">
        <div className="mb-6">
          <label htmlFor="email" className="mb-2 block font-medium">
            Địa chỉ email
          </label>
        <input id="email"
            type="email"
            placeholder=" name@domain.com"
            className="h-14 bg-[#121212] text-white border-neutral-700 w-full max-w-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="mb-6">
          <Link href="#" className="text-[#1DB954] hover:underline">
            Dùng số điện thoại.
          </Link>
        </div>

        <Button className="h-14 w-full rounded-full bg-[#1DB954] text-black hover:bg-[#1ed760] font-bold text-lg">
          Tiếp theo
        </Button>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-neutral-700"></div>
          <span className="mx-4 text-neutral-400">hoặc</span>
          <div className="h-px flex-1 bg-neutral-700"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <Button
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                fill="#FFC107"
              />
              <path
                d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z"
                fill="#FF3D00"
              />
              <path
                d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z"
                fill="#4CAF50"
              />
              <path
                d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                fill="#1976D2"
              />
            </svg>
            <span className="ml-2">Đăng ký bằng Google</span>
          </Button>

          <Button
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="#1877F2" />
              <path
                d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.8008 14.3391 7.875 15.8297 7.875H17.3438V4.9219C17.3438 4.9219 15.9703 4.6875 14.6578 4.6875C11.9156 4.6875 10.125 6.3492 10.125 9.3516V12H7.07812V15.4688H10.125V23.8547C10.7367 23.9508 11.3625 24 12 24C12.6375 24 13.2633 23.9508 13.875 23.8547V15.4688H16.6711Z"
                fill="white"
              />
            </svg>
            <span className="ml-2">Đăng ký bằng Facebook</span>
          </Button>

          <Button
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.0599 12.0001C17.0575 11.1985 17.3092 10.4153 17.7816 9.76348C18.254 9.11163 18.9239 8.62452 19.6899 8.36914C19.2381 7.72992 18.6411 7.21201 17.9496 6.85553C17.2582 6.49906 16.4922 6.31492 15.7199 6.31934C14.0799 6.14934 12.4999 7.35934 11.6499 7.35934C10.7999 7.35934 9.51994 6.33934 8.10994 6.33934C7.25143 6.35523 6.41005 6.58453 5.66384 7.00654C4.91763 7.42855 4.29096 8.02842 3.84994 8.74934C2.38994 11.2493 3.47994 14.9393 4.88994 16.9993C5.59994 17.9993 6.43994 19.0993 7.49994 19.0593C8.55994 19.0193 8.96994 18.3793 10.2399 18.3793C11.5099 18.3793 11.8899 19.0593 12.9999 19.0393C14.1099 19.0193 14.8399 18.0593 15.5399 17.0593C16.0963 16.3217 16.5309 15.5019 16.8299 14.6293C16.1662 14.3223 15.6005 13.8319 15.1967 13.2154C14.7929 12.5989 14.5675 11.8834 14.5499 11.1493L17.0599 12.0001Z"
                fill="white"
              />
              <path
                d="M14.5 5.01C15.0979 4.29538 15.9287 3.85869 16.82 3.81C16.9276 4.72048 16.7061 5.64223 16.1992 6.40088C15.6923 7.15954 14.9366 7.69907 14.07 7.9C13.9505 7.00332 14.1571 6.10112 14.65 5.35L14.5 5.01Z"
                fill="white"
              />
            </svg>
            <span className="ml-2">Đăng ký bằng Apple</span>
          </Button>
        </div>

        {/* Login Link */}
        <div className="mt-8 mb-4 text-center">
          <p>
            Bạn đã có tài khoản?{" "}
            <Link href="#" className="text-white hover:underline">
              Đăng nhập tại đây
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}


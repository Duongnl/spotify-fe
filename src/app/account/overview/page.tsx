"use client"

import {
  Search,
  User,
  Edit,
  Clock,
  CreditCard,
  RefreshCcw,
  Shield,
  Bell,
  Lock,
  LogIn,
  Key,
  LogOut,
  HelpCircle,
  ChevronRight,
} from "lucide-react"
import { Input } from "antd"
import { Button } from "antd/es/radio"
export default function SpotifySettings() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl p-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              className="h-12 w-full rounded-md border-neutral-700 bg-neutral-800 pl-10 text-sm text-white placeholder:text-neutral-400"
              placeholder="Tìm kiếm tài khoản hoặc bài viết trợ giúp"
            />
          </div>
        </div>

        {/* Spotify Free Section */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-md bg-neutral-800 p-4">
            <div>
              <p className="text-xs text-neutral-400">Gói của bạn</p>
              <h3 className="text-2xl font-bold">Spotify Free</h3>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <Button
              className="ml-4 rounded-full border-neutral-600 bg-transparent text-xs text-white hover:bg-neutral-700"
            >
              Tìm hiểu các gói
            </Button>
          </div>
          
          <button className="relative flex flex-col items-center justify-center rounded-md bg-purple-800 p-4 overflow-hidden transition-all duration-500 hover:before:absolute hover:before:inset-0 hover:before:bg-black/15">
            <div className="mb-2 flex h-10 w-10 items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 8L12 14L20 8L12 2Z" fill="white" />
                <path d="M4 14L12 20L20 14" fill="white" />
              </svg>
            </div>
            <p className="text-center text-sm font-medium">Dùng Premium</p>
          </button>
          
          
        </div>

        {/* Account Section */}
        <div className="mb-6 rounded-md bg-neutral-800 p-4">
          <h3 className="mb-4 text-lg font-bold">Tài khoản</h3>
          <ul className="space-y-1">
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Quản lý gói đăng ký</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <Edit className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Chỉnh sửa hồ sơ</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <RefreshCcw className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Khôi phục danh sách phát</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
          </ul>
        </div>

        {/* Payment Section */}
        <div className="mb-6 rounded-md bg-neutral-800 p-4">
          <h3 className="mb-4 text-lg font-bold">Thanh toán</h3>
          <ul className="space-y-1">
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Lịch sử đặt hàng</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <CreditCard className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Thẻ thanh toán đã lưu</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <RefreshCcw className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Đổi</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
          </ul>
        </div>

        {/* Security Section */}
        <div className="mb-6 rounded-md bg-neutral-800 p-4">
          <h3 className="mb-4 text-lg font-bold">Bảo mật và quyền riêng tư</h3>
          <ul className="space-y-1">
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <Shield className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Quản lý ứng dụng</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Cài đặt thông báo</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <Lock className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Quyền riêng tư của tài khoản</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <LogIn className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Chỉnh sửa phương thức đăng nhập</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <Key className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Đặt mật khẩu trên thiết bị</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <LogOut className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>Đăng xuất ở mọi nơi</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="rounded-md bg-neutral-800 p-4">
          <h3 className="mb-4 text-lg font-bold">Trợ giúp</h3>
          <ul className="space-y-1">
            <li>
              <button className="flex w-full items-center justify-between rounded-md p-3 hover:bg-neutral-700">
                <div className="flex items-center">
                  <HelpCircle className="mr-3 h-5 w-5 text-neutral-400" />
                  <span>nhóm hỗ trợ của Spotify</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


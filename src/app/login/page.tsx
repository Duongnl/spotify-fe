import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '../../components/account/Login';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-black">
        <div className="w-full max-w-md bg-black p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Đăng nhập vào Spotify
          </h1>
          
          {/* Social login buttons */}
          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-gray-800 text-white py-3 px-4 rounded-full border border-gray-600 font-medium transition duration-200">
              {/* <Image src="/api/placeholder/24/24" alt="Google" width={24} height={24} /> */}
              <span>Tiếp tục với Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-gray-800 text-white py-3 px-4 rounded-full border border-gray-600 font-medium transition duration-200">
              {/* <Image src="/api/placeholder/24/24" alt="Facebook" width={24} height={24} /> */}
              <span>Tiếp tục với Facebook</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-gray-800 text-white py-3 px-4 rounded-full border border-gray-600 font-medium transition duration-200">
              {/* <Image src="/api/placeholder/24/24" alt="Apple" width={24} height={24} /> */}
              <span>Tiếp tục với Apple</span>
            </button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-300 text-sm">HOẶC</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>
          
          {/* Login Form */}
          <LoginForm />
          
          {/* Forgot Password */}
          <div className="mt-6 text-center">
            <Link href="/reset-password" className="text-white hover:underline">
              Bạn quên mật khẩu?
            </Link>
          </div>
          
          {/* Sign Up Link */}
          <div className="mt-8 text-center border-t border-gray-800 pt-6">
            <p className="text-gray-300">
              Bạn chưa có tài khoản?{' '}
              <Link href="/signup" className="text-green-500 hover:underline font-medium">
                Đăng ký Spotify
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="text-center p-6 text-gray-400 text-sm border-t border-gray-800">
        <p>Đây không phải là trang web Spotify thật. Chỉ dùng cho mục đích học tập.</p>
      </footer>
    </div>
  );
}
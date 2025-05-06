import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from '../../components/account/Register'; 

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 bg-black">
        <div className="w-full max-w-md bg-black p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Đăng ký miễn phí để bắt đầu nghe
          </h1>
          
          {/* Social signup buttons */}
          {/* <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-gray-800 text-white py-3 px-4 rounded-full border border-gray-600 font-medium transition duration-200">
              <Image src="/api/placeholder/24/24" alt="Google" width={24} height={24} />
              <span>Đăng ký bằng Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-gray-800 text-white py-3 px-4 rounded-full border border-gray-600 font-medium transition duration-200">
              <Image src="/api/placeholder/24/24" alt="Facebook" width={24} height={24} />
              <span>Đăng ký bằng Facebook</span>
            </button>
          </div>
          
          Divider
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-300 text-sm">HOẶC</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div> */}
          
          {/* Register Form */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Đăng ký bằng email của bạn
            </h2>
            <RegisterForm />
          </div>
          
          {/* Login Link */}
          <div className="mt-8 text-center border-t border-gray-800 pt-6">
            <p className="text-gray-300">
              Bạn đã có tài khoản?{' '}
              <Link href="/login" className="text-green-500 hover:underline font-medium">
                Đăng nhập
              </Link>
            </p>
          </div>
          
        </div>
      </main>
    </div>
  );
}
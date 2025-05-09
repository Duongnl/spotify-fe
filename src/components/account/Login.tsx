'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginServerActions } from './login_server_actions';
import { useUserContext } from '@/context/user-context';
 // Giả sử bạn có function này

type FormData = {
  email: string;
  password: string;

};

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const { setUser, fetchGetUser } = useUserContext();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = 'Email hoặc tên người dùng là bắt buộc';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Cập nhật giá trị tương ứng với trường trong form
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const loginRequest = {
        username: formData.email,
        password: formData.password,
      };
      console.log('loginRequest >>>', loginRequest);
      const res = await LoginServerActions(loginRequest);

      if (res && res.status === 200) {
        router.push('/');
        await fetchGetUser()
      } else {
        setErrors({ email: 'Đăng nhập thất bại, kiểm tra lại thông tin' });
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          Địa chỉ email hoặc tên người dùng
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Địa chỉ email hoặc tên người dùng"
          value={formData.email}
          onChange={handleChange}
          className={`w-full bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          className={`w-full bg-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>



      {/* Login Button */}
      <div>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full transition duration-200 disabled:opacity-70"
        >
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </div>
    </div>
  );
}

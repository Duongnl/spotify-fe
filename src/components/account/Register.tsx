"use client"
import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import API from '@/api/api';
import { RegisterServerActions } from './register_server_actions';

type FormData = {
  username: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  gender: string;
  marketing: boolean;
  terms: boolean;
  name : string;
};

type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  birthday?: string;
  gender?: string;
  terms?: string;
  name?: string;
};


import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const currentYear = new Date().getFullYear();

const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    name:'',
    username: '',
    email: '',
    password: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    marketing: false,
    terms: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];
  
  // Tạo mảng các ngày từ 1-31
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  
  // Tạo mảng năm từ 100 năm trước đến hiện tại
  const years = Array.from(
    { length: 100 }, 
    (_, i) => (currentYear - i).toString()
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Username validation
    if (!formData.username) {
      newErrors.username = 'Vui lòng nhập tên người dùng của bạn.';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên người dùng phải có ít nhất 3 ký tự.';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email của bạn.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ. Đảm bảo nó được viết dưới dạng example@email.com';
    }

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên của bạn.';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu của bạn.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự.';
    }
    
    // Birthday validation
    if (!formData.day || !formData.month || !formData.year) {
      newErrors.birthday = 'Vui lòng nhập ngày sinh đầy đủ của bạn.';
    } else {
      // Kiểm tra tuổi > 13
      const birthDate = new Date(
        parseInt(formData.year),
        parseInt(formData.month) - 1,
        parseInt(formData.day)
      );
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 13) {
        newErrors.birthday = 'Bạn phải ít nhất 13 tuổi để sử dụng Spotify.';
      }
    }
    
    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính của bạn.';
    }
    
    // Terms agreement validation
    if (!formData.terms) {
      newErrors.terms = 'Bạn phải đồng ý với điều khoản và điều kiện để tiếp tục.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear errors when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
    
    // Clear birthday error when any date field changes
    if (['day', 'month', 'year'].includes(name) && errors.birthday) {
      setErrors({
        ...errors,
        birthday: undefined,
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    // Xử lý đăng ký thành công
    
    const request = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password_confirm: formData.password,
      name: formData.name,
      birthDay: `${formData.year}-${formData.month}-${formData.day}`,
      gender: formData.gender
    }
    console.log('Đăng ký thành công:', request);
    const res:any = await RegisterServerActions(request);
    console.log("res >>>> ", res)
    if (res && res.status === 201) {
      router.push('/');
    } else {
      setErrors({
        email: res.error.email?.[0],
        username: res.error.username?.[0],
      });
    }
    setIsSubmitting(false);
  };
  
  return (
    <div  className="space-y-4">

            {/* Username Input */}
            <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Tên bạn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tên"
          value={formData.name}
          onChange={handleChange}
          className={`w-full bg-gray-900 border ${
            errors.name ? 'border-red-500' : 'border-gray-600'
          } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
        {!errors.name && (
          <p className="mt-1 text-xs text-gray-400">
            
          </p>
        )}
      </div>
      {/* Username Input */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
          Tên người dùng của bạn
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full bg-gray-900 border ${
            errors.username ? 'border-red-500' : 'border-gray-600'
          } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username}</p>
        )}
        {!errors.username && (
          <p className="mt-1 text-xs text-gray-400">
            
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          Email của bạn là gì?
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className={`w-full bg-gray-900 border ${
            errors.email ? 'border-red-500' : 'border-gray-600'
          } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
        <p className="mt-1 text-xs text-gray-400">
          
        </p>
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
          Tạo mật khẩu
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full bg-gray-900 border ${
            errors.password ? 'border-red-500' : 'border-gray-600'
          } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
        {!errors.password && formData.password && (
          <p className="mt-1 text-xs text-gray-400">
            Mật khẩu phải có ít nhất 8 ký tự.
          </p>
        )}
      </div>



      {/* Birthday Input */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Ngày sinh của bạn là gì?
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="day" className="sr-only">Ngày</label>
            <select
              id="day"
              name="day"
              value={formData.day}
              onChange={handleChange}
              className={`w-full bg-gray-900 border ${
                errors.birthday ? 'border-red-500' : 'border-gray-600'
              } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="">Ngày</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="month" className="sr-only">Tháng</label>
            <select
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              className={`w-full bg-gray-900 border ${
                errors.birthday ? 'border-red-500' : 'border-gray-600'
              } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="">Tháng</option>
              {months.map((month, index) => (
                <option key={month} value={index + 1}>{month}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year" className="sr-only">Năm</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`w-full bg-gray-900 border ${
                errors.birthday ? 'border-red-500' : 'border-gray-600'
              } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="">Năm</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        {errors.birthday && (
          <p className="mt-1 text-sm text-red-500">{errors.birthday}</p>
        )}
      </div>

      {/* Gender Selection */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Giới tính của bạn là gì?
        </label>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              className="h-4 w-4 border-gray-600 bg-gray-900 text-green-500 focus:ring-green-500"
            />
            <label htmlFor="male" className="ml-2 block text-sm text-white">
              Nam
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              className="h-4 w-4 border-gray-600 bg-gray-900 text-green-500 focus:ring-green-500"
            />
            <label htmlFor="female" className="ml-2 block text-sm text-white">
              Nữ
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={formData.gender === 'other'}
              onChange={handleChange}
              className="h-4 w-4 border-gray-600 bg-gray-900 text-green-500 focus:ring-green-500"
            />
            <label htmlFor="other" className="ml-2 block text-sm text-white">
              Khác
            </label>
          </div>
          
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
        )}
      </div>

      
      {/* Terms Agreement */}
      <div className="flex items-start mt-4">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className={`h-4 w-4 rounded border-gray-600 bg-gray-900 text-green-500 focus:ring-green-500 ${
              errors.terms ? 'border-red-500' : ''
            }`}
          />
        </div>
        <div className="ml-2 text-sm">
          <label htmlFor="terms" className="text-gray-300">
            Tôi đồng ý với{' '}
            <Link href="/terms" className="text-green-500 hover:underline">
              Điều khoản và Điều kiện Sử dụng
            </Link>{' '}
            của Spotify.
          </label>
          {errors.terms && (
            <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full transition duration-200 disabled:opacity-70"
          onClick={() => {handleSubmit()}}
        >
          {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </div>
    </div>
  );
}
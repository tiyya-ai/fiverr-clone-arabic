"use client";

import { FaCog, FaUsers, FaChartBar, FaMobileAlt } from "react-icons/fa";
import { Star, Shield, Clock } from "lucide-react";

export default function ServiceCard() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-400 to-green-500 p-6 flex items-center" dir="rtl">
      {/* Right Section - Profile Image */}
      <div className="w-1/3 flex justify-center">
        <div className="rounded-full overflow-hidden border-4 border-white shadow-lg w-36 h-36">
          <img
            src="https://ui-avatars.com/api/?name=أحمد+محمد&background=random&color=fff&size=144"
            alt="صورة المقدم"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Left Section - Text & Content */}
      <div className="w-2/3 pr-6">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-blue-600 bg-white inline-block px-3 py-1 rounded text-right">
          خدمات الصيانة المنزلية
        </h2>

        {/* Features List */}
        <ul className="mt-4 space-y-2 text-lg font-medium text-black text-right">
          <li className="flex items-center gap-2 justify-end">
            <span>إصلاح وصيانة الكهرباء</span>
            <FaCog className="text-blue-600" />
          </li>
          <li className="flex items-center gap-2 justify-end">
            <span>خدمات السباكة المتكاملة</span>
            <FaUsers className="text-green-600" />
          </li>
          <li className="flex items-center gap-2 justify-end">
            <span>صيانة أجهزة التكييف</span>
            <FaChartBar className="text-purple-600" />
          </li>
          <li className="flex items-center gap-2 justify-end">
            <span>خدمة سريعة ومضمونة</span>
            <FaMobileAlt className="text-red-600" />
          </li>
        </ul>

        {/* Order Button */}
        <button className="mt-5 bg-blue-700 text-white text-lg font-bold px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition">
          احجز الآن
        </button>

        {/* Badges */}
        <div className="mt-4 flex items-center gap-4 justify-end">
          <span className="font-bold text-black">من 45 ر.س</span>
          <span className="text-yellow-500 font-bold flex items-center gap-1">
            <span>(196) 4.8</span>
            <Star className="w-4 h-4 fill-current" />
          </span>
          <span className="bg-green-600 text-white px-3 py-1 text-sm rounded flex items-center gap-1">
            <Shield className="w-3 h-3" />
            الأفضل تقييماً
          </span>
        </div>
      </div>
    </div>
  );
}
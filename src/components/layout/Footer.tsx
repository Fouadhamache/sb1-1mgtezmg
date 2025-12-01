import React from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="mr-2 text-xl font-bold">LearnUp</span>
            </div>
            <p className="text-primary-100 mb-6">
              LearnUp هي منصة تعليمية جزائرية توفر محتوى شامل لجميع الأطوار الدراسية من الابتدائي إلى الثانوي، مع دروس وملخصات وتمارين تفاعلية.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-primary-100 hover:text-white transition-colors">حول المنصة</a></li>
              <li><a href="#levels" className="text-primary-100 hover:text-white transition-colors">الأطوار الدراسية</a></li>
              <li><a href="#pricing" className="text-primary-100 hover:text-white transition-colors">خطط الاشتراك</a></li>
              <li><a href="#" className="text-primary-100 hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">المحتوى</h3>
            <ul className="space-y-2">
              <li><a href="#content" className="text-primary-100 hover:text-white transition-colors">المحتوى التعليمي</a></li>
              <li><a href="#interactive-learning" className="text-primary-100 hover:text-white transition-colors">التعلم التفاعلي</a></li>
              <li><a href="#how-it-works" className="text-primary-100 hover:text-white transition-colors">كيف تعمل</a></li>
              <li><a href="/login" className="text-primary-100 hover:text-white transition-colors">تسجيل الدخول</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 ml-2 text-primary-200" />
                <span className="text-primary-100">contact@learnup.dz</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 ml-2 text-primary-200" />
                <span className="text-primary-100">+213 770 123 456</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 ml-2 text-primary-200" />
                <span className="text-primary-100">الجزائر، برج بوعريريج</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-800 text-center text-primary-200 text-sm">
          <p>© 2025 LearnUp. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
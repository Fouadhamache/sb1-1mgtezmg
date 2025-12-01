import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  ChevronRight, 
  ChevronLeft,
  Users,
  School,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTrial } from '../contexts/TrialContext';
import { 
  EDUCATION_LEVELS, 
  type EducationalLevel, 
  type SecondaryStream, 
  type EducationInfo,
  type PrimaryGrade,
  type MiddleGrade,
  type SecondaryYear,
  type TechnicalSpecialization,
  type ForeignLanguageChoice
} from '../types/education';
import { motion, AnimatePresence } from 'framer-motion';

type UserType = 'student' | 'parent' | 'teacher';

interface FormData {
  userType: UserType;
  firstName: string;
  lastName: string;
  gender?: 'male' | 'female';
  studentName?: string;
  phoneNumber: string;
  level: EducationalLevel;
  year: PrimaryGrade | MiddleGrade | SecondaryYear;
  stream: SecondaryStream;
  technicalSpecialization: TechnicalSpecialization;
  foreignLanguageChoice: ForeignLanguageChoice;
  email: string;
  password: string;
  confirmPassword: string;
  teacherState?: string;
  teacherAge?: string;
  subject?: string;
  teachingLevel?: string;
  experience?: string;
  profileImage?: File;
}

const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    userType: 'student',
    firstName: '',
    lastName: '',
    studentName: '',
    phoneNumber: '',
    level: 'primary',
    year: 1,
    stream: 'cst',
    technicalSpecialization: 'electrical',
    foreignLanguageChoice: 'spanish',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const getTotalSteps = () => {
    if (formData.userType === 'teacher') {
      return 2;
    } else if (formData.userType === 'parent') {
      return 4;
    } else {
      let steps = 6;
      if (formData.level === 'secondary' &&
          formData.year > 1 &&
          formData.stream === 'technical-mathematics') {
        steps += 1;
      }
      if (formData.level === 'secondary' &&
          formData.year > 1 &&
          formData.stream === 'foreign-languages') {
        steps += 1;
      }
      return steps;
    }
  };
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const validateCurrentStep = () => {
    setError('');

    if (formData.userType === 'student') {
      switch (currentStep) {
        case 1:
          return true;
        case 2:
          if (!formData.firstName.trim()) {
            setError('الرجاء إدخال الاسم');
            return false;
          }
          if (!formData.lastName.trim()) {
            setError('الرجاء إدخال اسم العائلة');
            return false;
          }
          if (!formData.gender) {
            setError('الرجاء اختيار الجنس');
            return false;
          }
          return true;
        case 3:
          return true;
        case 4:
          return true;
        case 5:
          return true;
        case 6:
        case 7:
        case 8:
          if (isEmailStep()) {
            if (!formData.email) {
              setError('الرجاء إدخال البريد الإلكتروني');
              return false;
            }
            if (!/\S+@\S+\.\S+/.test(formData.email)) {
              setError('الرجاء إدخال بريد إلكتروني صحيح');
              return false;
            }
            if (!formData.phoneNumber.trim()) {
              setError('الرجاء إدخال رقم الهاتف');
              return false;
            }
          }
          if (isPasswordStep()) {
            if (!formData.password) {
              setError('الرجاء إدخال كلمة المرور');
              return false;
            }
            if (formData.password.length < 6) {
              setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
              return false;
            }
            if (formData.password !== formData.confirmPassword) {
              setError('كلمات المرور غير متطابقة');
              return false;
            }
          }
          return true;
        default:
          return true;
      }
    } else if (formData.userType === 'parent') {
      switch (currentStep) {
        case 1:
          return true;
        case 2:
          if (!formData.firstName.trim()) {
            setError('الرجاء إدخال الاسم');
            return false;
          }
          if (!formData.lastName.trim()) {
            setError('الرجاء إدخال اسم العائلة');
            return false;
          }
          return true;
        case 3:
          if (!formData.email) {
            setError('الرجاء إدخال البريد الإلكتروني');
            return false;
          }
          if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('الرجاء إدخال بريد إلكتروني صحيح');
            return false;
          }
          if (!formData.phoneNumber.trim()) {
            setError('الرجاء إدخال رقم الهاتف');
            return false;
          }
          if (!formData.password) {
            setError('الرجاء إدخال كلمة المرور');
            return false;
          }
          if (formData.password.length < 6) {
            setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            return false;
          }
          if (formData.password !== formData.confirmPassword) {
            setError('كلمات المرور غير متطابقة');
            return false;
          }
          return true;
        case 4:
          return true;
        default:
          return true;
      }
    } else if (formData.userType === 'teacher') {
      switch (currentStep) {
        case 1:
          return true;
        case 2:
          if (!formData.firstName.trim()) {
            setError('الرجاء إدخال الاسم');
            return false;
          }
          if (!formData.lastName.trim()) {
            setError('الرجاء إدخال اللقب');
            return false;
          }
          if (!formData.teacherState?.trim()) {
            setError('الرجاء اختيار الولاية');
            return false;
          }
          if (!formData.teacherAge?.trim()) {
            setError('الرجاء إدخال العمر');
            return false;
          }
          if (!formData.gender) {
            setError('الرجاء اختيار الجنس');
            return false;
          }
          if (!formData.subject?.trim()) {
            setError('الرجاء إدخال المادة التي تدرسها');
            return false;
          }
          if (!formData.teachingLevel?.trim()) {
            setError('الرجاء اختيار الطور الذي تدرس فيه');
            return false;
          }
          if (!formData.experience?.trim()) {
            setError('الرجاء إدخال سنوات الخبرة');
            return false;
          }
          return true;
        default:
          return true;
      }
    }
    return true;
  };
  
  const isEmailStep = () => {
    const totalSteps = getTotalSteps();
    return currentStep === totalSteps - 1;
  };
  
  const isPasswordStep = () => {
    const totalSteps = getTotalSteps();
    return currentStep === totalSteps;
  };
  
  const isTechnicalSpecializationStep = () => {
    return currentStep === 5 && 
           formData.level === 'secondary' && 
           formData.year > 1 && 
           formData.stream === 'technical-mathematics';
  };
  
  const isForeignLanguageChoiceStep = () => {
    const expectedStep = formData.stream === 'technical-mathematics' ? 6 : 5;
    return currentStep === expectedStep && 
           formData.level === 'secondary' && 
           formData.year > 1 && 
           formData.stream === 'foreign-languages';
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    if (formData.userType === 'teacher') {
      setError('تم إرسال طلب الانضمام! سيتم مراجعة بيانات المعلم وتفعيل الحساب قريباً.');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (formData.userType === 'parent') {
      const displayName = `${formData.firstName} ${formData.lastName}`;
      try {
        await register(displayName, formData.email, formData.password, {} as EducationInfo);
        navigate('/dashboard');
      } catch (err) {
        setError('فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.');
      }
      return;
    }

    const education: EducationInfo = {
      level: formData.level,
      year: formData.year,
      ...(formData.level === 'secondary' ? { stream: formData.stream } : {}),
      ...(formData.level === 'secondary' && formData.stream === 'technical-mathematics' ?
          { technicalSpecialization: formData.technicalSpecialization } : {}),
      ...(formData.level === 'secondary' && formData.stream === 'foreign-languages' ?
          { foreignLanguageChoice: formData.foreignLanguageChoice } : {})
    };

    const displayName = `${formData.firstName} ${formData.lastName}`;

    try {
      await register(displayName, formData.email, formData.password, education);
      navigate('/dashboard');
    } catch (err) {
      setError('فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    }
  };
  
  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختيار نوع الحساب</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'student' }))}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.userType === 'student'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  <School className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-3" />
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">تلميذ</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'parent' }))}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.userType === 'parent'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Users className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-3" />
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">ولي أمر</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'teacher' }))}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.userType === 'teacher'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  <GraduationCap className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-3" />
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">معلم</span>
                </div>
              </button>
            </div>
          </div>
        );
      
      case 2:
        if (formData.userType === 'student') {
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">معلومات التلميذ</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">الاسم</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="input-field pr-10"
                      placeholder="أدخل الاسم"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">اسم العائلة</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="input-field pr-10"
                      placeholder="أدخل اسم العائلة"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-3">الجنس</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                      className="ml-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">ذكر</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                      className="ml-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">أنثى</span>
                  </label>
                </div>
              </div>
            </div>
          );
        } else if (formData.userType === 'parent') {
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">معلومات ولي الأمر</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">الاسم</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="input-field pr-10"
                      placeholder="أدخل الاسم"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">اسم العائلة</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="input-field pr-10"
                      placeholder="أدخل اسم العائلة"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (formData.userType === 'teacher') {
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">معلومات المعلم</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">الاسم</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="input-field pr-10"
                      placeholder="أدخل الاسم"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">اللقب</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="input-field pr-10"
                      placeholder="أدخل اللقب"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">الولاية</label>
                  <select
                    value={formData.teacherState || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, teacherState: e.target.value }))}
                    className="input-field"
                    required
                  >
                    <option value="">اختر الولاية</option>
                    {['الجزائر', 'وهران', 'قسنطينة', 'الجلفة', 'جيجل', 'برج بوعريريج'].map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">العمر</label>
                  <input
                    type="number"
                    value={formData.teacherAge || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, teacherAge: e.target.value }))}
                    className="input-field"
                    placeholder="أدخل العمر"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-3">الجنس</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                        className="ml-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">ذكر</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                        className="ml-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">أنثى</span>
                    </label>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">المادة التي تدرسها</label>
                  <input
                    type="text"
                    value={formData.subject || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="input-field"
                    placeholder="أدخل المادة"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">الطور الذي تدرس فيه</label>
                  <select
                    value={formData.teachingLevel || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, teachingLevel: e.target.value }))}
                    className="input-field"
                    required
                  >
                    <option value="">اختر الطور</option>
                    <option value="primary">ابتدائي</option>
                    <option value="middle">متوسط</option>
                    <option value="secondary">ثانوي</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">سنوات الخبرة</label>
                  <input
                    type="number"
                    value={formData.experience || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="input-field"
                    placeholder="أدخل عدد سنوات الخبرة"
                    required
                  />
                </div>
              </div>
            </div>
          );
        }
        break;
      
      case 3:
        if (formData.userType === 'parent') {
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">معلومات الحساب</h2>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="input-field pr-10"
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="input-field"
                  placeholder="أدخل رقم الهاتف"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">كلمة المرور</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="input-field pr-10"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="input-field pr-10"
                    placeholder="أدخل كلمة المرور مرة أخرى"
                    required
                  />
                </div>
              </div>
            </div>
          );
        } else if (formData.userType === 'student') {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختيار الطور</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(EDUCATION_LEVELS).map(([value, { name }]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      level: value as EducationalLevel,
                      year: 1,
                      stream: 'cst'
                    }))}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      formData.level === value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        }
        break;
      
      case 4:
        if (formData.userType === 'parent') {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">رمز التحقق</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                إدخال رمز التأكيد المرسل إلى البريد الإلكتروني
              </p>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">رمز التحقق</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="أدخل رمز التحقق المكون من 6 أرقام"
                  maxLength={6}
                  required
                />
              </div>
            </div>
          );
        } else if (formData.level === 'secondary') {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختيار السنة الدراسية والشعبة</h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">السنة الدراسية</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: EDUCATION_LEVELS[formData.level].years }, (_, i) => (
                    <button
                      key={i + 1}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, year: (i + 1) as SecondaryYear }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.year === i + 1
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                      }`}
                    >
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {EDUCATION_LEVELS.secondary.grades[i + 1 as SecondaryYear]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  {formData.year === 1 ? 'الجذع المشترك' : 'الشعبة المتخصصة'}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {formData.year === 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, stream: 'cst' }))}
                        className={`p-4 rounded-xl border-2 transition-all text-right ${
                          formData.stream === 'cst'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                        }`}
                      >
                        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                          {EDUCATION_LEVELS.secondary.streams.cst}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, stream: 'cah' }))}
                        className={`p-4 rounded-xl border-2 transition-all text-right ${
                          formData.stream === 'cah'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                        }`}
                      >
                        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                          {EDUCATION_LEVELS.secondary.streams.cah}
                        </span>
                      </button>
                    </>
                  ) : (
                    Object.entries(EDUCATION_LEVELS.secondary.streams)
                      .filter(([key]) => !['cst', 'cah'].includes(key))
                      .map(([value, name]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, stream: value as SecondaryStream }))}
                          className={`p-4 rounded-xl border-2 transition-all text-right ${
                            formData.stream === value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                          }`}
                        >
                          <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                        </button>
                      ))
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختيار السنة الدراسية</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: EDUCATION_LEVELS[formData.level].years }, (_, i) => (
                  <button
                    key={i + 1}
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      year: (i + 1) as PrimaryGrade | MiddleGrade
                    }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.year === i + 1
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                    }`}
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {formData.level === 'primary'
                        ? EDUCATION_LEVELS.primary.grades[i + 1 as PrimaryGrade]
                        : EDUCATION_LEVELS.middle.grades[i + 1 as MiddleGrade]
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        }

      case 5:
        if (isTechnicalSpecializationStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختر التخصص الهندسي</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(EDUCATION_LEVELS.secondary.technicalSpecializations).map(([value, name]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, technicalSpecialization: value as TechnicalSpecialization }))}
                    className={`p-6 rounded-xl border-2 transition-all text-right ${
                      formData.technicalSpecialization === value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Settings className="w-6 h-6 text-primary-600 dark:text-primary-400 ml-3" />
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (isForeignLanguageChoiceStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختر اللغة الأجنبية الثالثة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(EDUCATION_LEVELS.secondary.foreignLanguageChoices).map(([value, name]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, foreignLanguageChoice: value as ForeignLanguageChoice }))}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      formData.foreignLanguageChoice === value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                    }`}
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (isEmailStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">أدخل بريدك الإلكتروني</h2>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field pr-10"
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
              </div>
            </div>
          );
        }
        break;
      
      case 6:
      case 7:
      case 8:
        if (isForeignLanguageChoiceStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">اختر اللغة الأجنبية الثالثة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(EDUCATION_LEVELS.secondary.foreignLanguageChoices).map(([value, name]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, foreignLanguageChoice: value as ForeignLanguageChoice }))}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      formData.foreignLanguageChoice === value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-400'
                    }`}
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (isEmailStep()) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">أدخل بريدك الإلكتروني</h2>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field pr-10"
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
              </div>
            </div>
          );
        } else if (isPasswordStep()) {
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">أنشئ كلمة المرور</h2>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">كلمة المرور</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="input-field pr-10"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="input-field pr-10"
                    placeholder="أدخل كلمة المرور مرة أخرى"
                    required
                  />
                </div>
              </div>
            </div>
          );
        }
        break;
      
      default:
        return null;
    }
  };
  
  const totalSteps = getTotalSteps();
  
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 card">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">إنشاء حساب جديد</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            الخطوة {currentStep} من {totalSteps}
          </div>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-100 dark:bg-primary-900/30">
            <div
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500"
            />
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 p-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {renderStepContent(currentStep)}
          </motion.div>
        </AnimatePresence>
        
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <ChevronRight className="h-5 w-5 ml-1" />
              السابق
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary flex items-center mr-auto"
            >
              التالي
              <ChevronLeft className="h-5 w-5 mr-1" />
            </button>
          ) : (
            <button
              type="submit"
              className="btn-primary flex items-center mr-auto"
              disabled={isLoading}
            >
              {isLoading ? 'جارِ إنشاء الحساب...' : 'إنشاء الحساب'}
            </button>
          )}
        </div>
      </form>
      
      <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
        لديك حساب بالفعل؟{' '}
        <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
          تسجيل الدخول
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>
          تمتع بفترة تجريبية مجانية لمدة 24 ساعة!
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          عند إنشاء حساب جديد، ستحصل تلقائيًا على فترة تجريبية مجانية لمدة 24 ساعة للوصول إلى جميع محتويات المنصة.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
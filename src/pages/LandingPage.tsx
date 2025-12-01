import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Video,
  FileText,
  ListChecks,
  Layers,
  Users,
  Clock,
  Award,
  MapPin,
  Zap,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTrial } from '../contexts/TrialContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isTrialActive, hasSubscription } = useTrial();
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleMainAction = () => {
    if (isAuthenticated && (hasSubscription || isTrialActive)) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const getMainButtonText = () => {
    if (isAuthenticated && (hasSubscription || isTrialActive)) {
      return 'ادرس الآن';
    }
    return 'ابدأ مجانًا لمدة 24 ساعة';
  };
  
  return (
    <div className="bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative py-12 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 lg:ml-8 text-center lg:text-right"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
                ابدأ رحلتك نحو التفوق مع LearnUp
              </h1>
              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-4 lg:mb-5 px-2 lg:px-0 font-medium">
                تعلم بطريقة تفاعلية تجمع بين المتعة والفهم من الابتدائي إلى الثانوي.
              </p>
              <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-6 lg:mb-8 px-2 lg:px-0">
                LearnUp هي منصة تعليمية حديثة تقدم محتوى تفاعلي شامل للطلاب من مختلف المستويات الدراسية. من خلال الفيديوهات والدروس والتمارين والاختبارات، نساعدك على فهم المواد بعمق، متابعة تقدمك، وتحقيق نتائج أفضل بطريقة ممتعة وفعالة.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/login')}
                  className="btn-secondary text-base lg:text-lg py-3 lg:py-3 px-6 lg:px-8 w-full sm:w-auto"
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={handleMainAction}
                  className="btn-primary text-base lg:text-lg py-3 lg:py-3 px-6 lg:px-8 w-full sm:w-auto"
                >
                  ابدأ مجانا لمدة 24 ساعة
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 mt-8 lg:mt-0 px-4 lg:px-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="طلاب يدرسون" 
                className="rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Educational Content Section */}
      <section className="py-12 lg:py-16 bg-white dark:bg-gray-900" id="content">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">المحتوى التعليمي</h2>
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              محتوى شامل ومتنوع يغطي جميع المستويات الدراسية بطرق مبتكرة وفعالة
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-2xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <Video className="h-6 w-6" />, title: "فيديوهات تعليمية", desc: "شروحات مفصلة تشرح الدروس بطريقة مبسطة" },
              { icon: <FileText className="h-6 w-6" />, title: "وثائق منظمة", desc: "وثائق دروس منظمة حسب المنهج الدراسي" },
              { icon: <Award className="h-6 w-6" />, title: "ملخصات مركزة", desc: "ملخصات تساعدك على المراجعة السريعة" },
              { icon: <ListChecks className="h-6 w-6" />, title: "فروض واختبارات", desc: "فروض واختبارات لتقييم مستوى الفهم" }
            ].map((item, index) => (
              <motion.div key={index} className="card p-6 text-center" variants={fadeIn}>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Learning Section */}
      <section className="py-12 lg:py-16 bg-primary-50 dark:bg-gray-800" id="interactive-learning">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">التعلم التفاعلي</h2>
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              أدوات تفاعلية تجعل التعلم ممتعاً وفعالاً
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-2xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <ListChecks className="h-6 w-6" />, title: "اختيار من متعدد", desc: "اختيار من متعدد لاختبار معرفتك في كل درس" },
              { icon: <BookOpen className="h-6 w-6" />, title: "روبوت دردشة", desc: "روبوت دردشة للإجابة على أسئلتك" },
              { icon: <Award className="h-6 w-6" />, title: "بطاقات استذكار", desc: "بطاقات استذكار لتثبيت المعلومات بطريقة ممتعة" },
              { icon: <Zap className="h-6 w-6" />, title: "نظام الحماسة", desc: "نظام الحماسة اليومي (Streak) لمواصلة التعلم" }
            ].map((item, index) => (
              <motion.div key={index} className="card p-6 text-center" variants={fadeIn}>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Progress Tracking Section */}
      <section className="py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">تتبع التقدم</h2>
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              راقب تطورك وحقق أهدافك التعليمية
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="card p-6 text-center" variants={fadeIn}>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">تقدمك الدراسي</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">تقدمك في الدراسة مع إحصائيات مفصلة</p>
            </motion.div>

            <motion.div className="card p-6 text-center" variants={fadeIn}>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">متابعة الأولياء</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">مراقبة تقدم الأبناء للأولياء بشكل دوري</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Levels Section */}
      <section className="py-12 lg:py-16 bg-primary-50 dark:bg-gray-800" id="levels">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">الأطوار الدراسية المتوفرة</h2>
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              نغطي جميع الأطوار والمواد الدراسية لجميع السنوات الدراسية.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="card p-6" variants={fadeIn}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">الطور الابتدائي</h3>
              <ul className="space-y-2">
                {['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة'].map((grade, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="mr-2 w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                    السنة {grade}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="card p-6" variants={fadeIn}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">الطور المتوسط</h3>
              <ul className="space-y-2">
                {['الأولى', 'الثانية', 'الثالثة', 'الرابعة'].map((grade, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="mr-2 w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                    السنة {grade}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="card p-6" variants={fadeIn}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">الطور الثانوي</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">السنوات:</p>
                  <ul className="space-y-1">
                    {['الأولى', 'الثانية', 'الثالثة'].map((grade, i) => (
                      <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                        <span className="mr-2 w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                        السنة {grade}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">التخصصات:</p>
                  <ul className="space-y-1">
                    {['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'].map((stream, i) => (
                      <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                        <span className="mr-2 w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                        {stream}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works - Mobile Optimized */}
      <section className="py-12 lg:py-16 bg-white dark:bg-gray-900" id="how-it-works">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              بدء استخدام منصة LearnUp سهل وبسيط، اتبع الخطوات التالية
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="relative" variants={fadeIn}>
              <div className="card text-center h-full">
                <div className="absolute -top-2 lg:-top-4 right-3 lg:right-4 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm lg:text-lg">
                  1
                </div>
                <div className="flex justify-center mb-3 lg:mb-4 pt-4 lg:pt-6">
                  <Users className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">إنشاء حساب</h3>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">قم بإنشاء حساب جديد والاستفادة من فترة تجريبية مجانية لمدة 24 ساعة</p>
              </div>
            </motion.div>
            
            <motion.div className="relative" variants={fadeIn}>
              <div className="card text-center h-full">
                <div className="absolute -top-2 lg:-top-4 right-3 lg:right-4 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm lg:text-lg">
                  2
                </div>
                <div className="flex justify-center mb-3 lg:mb-4 pt-4 lg:pt-6">
                  <Layers className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">اختر الفصل والمواد</h3>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">اختر الفصل الدراسي المناسب والمواد التي ترغب في دراستها</p>
              </div>
            </motion.div>
            
            <motion.div className="relative" variants={fadeIn}>
              <div className="card text-center h-full">
                <div className="absolute -top-2 lg:-top-4 right-3 lg:right-4 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm lg:text-lg">
                  3
                </div>
                <div className="flex justify-center mb-3 lg:mb-4 pt-4 lg:pt-6">
                  <BookOpen className="h-10 w-10 lg:h-12 lg:w-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">ابدأ التعلم</h3>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">استفد من الفيديوهات والوثائق والأدوات التفاعلية لتحسين مستواك الدراسي</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-12 lg:py-16 bg-primary-50 dark:bg-gray-800" id="pricing">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">خطط الاشتراك</h2>
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 lg:px-0">
              اختر الخطة التي تناسبك والبدء في رحلتك التعليمية اليوم
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="card p-6 lg:p-8 border-2 border-primary-500" variants={fadeIn}>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">الاشتراك الفصلي</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                اختر الفصل الذي تريد الاشتراك فيه من بين الفصول الثلاثة.
              </p>
              <div className="text-3xl lg:text-4xl font-bold text-primary-700 dark:text-primary-400 mb-6">
                500 DZD
                <span className="text-base lg:text-lg text-gray-600 dark:text-gray-400 font-normal block">فصل واحد</span>
              </div>
              <button
                onClick={handleMainAction}
                className="btn-primary w-full text-base lg:text-lg py-3"
              >
                {getMainButtonText()}
              </button>
            </motion.div>

            <motion.div className="card p-6 lg:p-8 border-2 border-primary-600 relative" variants={fadeIn}>
              <div className="absolute -top-4 right-8 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                الأشهر
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">الاشتراك السنوي</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                يغطي جميع الفصول الثلاثة خلال السنة الدراسية.
              </p>
              <div className="text-3xl lg:text-4xl font-bold text-primary-700 dark:text-primary-400 mb-6">
                1000 DZD
                <span className="text-base lg:text-lg text-gray-600 dark:text-gray-400 font-normal block">سنة كاملة</span>
              </div>
              <button
                onClick={handleMainAction}
                className="btn-primary w-full text-base lg:text-lg py-3"
              >
                {getMainButtonText()}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 lg:py-16 bg-primary-800 dark:bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">ابدأ رحلتك التعليمية اليوم</h2>
            <p className="text-base lg:text-xl text-primary-100 max-w-3xl mx-auto mb-6 lg:mb-8 px-2 lg:px-0">
              انضم إلى آلاف الطلاب الذين يستفيدون من منصتنا التعليمية لتحسين مستواهم الدراسي
            </p>
            <button 
              onClick={handleMainAction} 
              className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-base lg:text-lg py-3 px-6 lg:px-8 w-full sm:w-auto"
            >
              {isAuthenticated && (hasSubscription || isTrialActive) ? 'ادرس الآن' : 'إنشاء حساب مجاني'}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
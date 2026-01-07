import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Palette, Share2, Download, Wand2, ArrowLeft, Brush, Layers, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)]">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-4">
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-panel mb-8 animate-bounce shadow-lg shadow-purple-500/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
            <span className="text-indigo-900 font-extrabold text-sm tracking-wide">الاستوديو التفاعلي الأذكى</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-sm tracking-tight">
            لوّن <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-pink-300 drop-shadow-md">
              عالمك
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
             أداة رسم عربية صممت لتمزج بين المتعة والإبداع. 
             ارسم بحرية، واستعن بالذكاء الاصطناعي لفتح آفاق جديدة لخيالك.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button 
              size="lg" 
              onClick={() => navigate('/studio')}
              icon={<Brush className="w-6 h-6" />}
              className="w-full sm:w-auto shadow-2xl shadow-indigo-900/40 text-lg px-12 py-5 animate-pulse"
            >
              ابدأ الرسم
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="w-full sm:w-auto backdrop-blur-md bg-white/90 text-indigo-700"
            >
              جولة سريعة
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Brush className="w-8 h-8 text-white" />}
              bg="bg-gradient-to-br from-pink-500 to-rose-500"
              title="أدوات سلسة"
              description="فرشاة فائقة النعومة وممحاة ذكية لتجربة رسم طبيعية."
              delay={0}
            />
            <FeatureCard 
              icon={<Wand2 className="w-8 h-8 text-white" />}
              bg="bg-gradient-to-br from-indigo-500 to-violet-600"
              title="مُلهم الذكاء"
              description="بضغطة زر، احصل على أفكار إبداعية حصرية لك."
              delay={100}
            />
            <FeatureCard 
              icon={<Download className="w-8 h-8 text-white" />}
              bg="bg-gradient-to-br from-emerald-400 to-teal-500"
              title="حفظ فوري"
              description="صدر لوحاتك بدقة عالية وشاركها مع أصدقائك."
              delay={200}
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-white" />}
              bg="bg-gradient-to-br from-amber-400 to-orange-500"
              title="سرعة وخفة"
              description="واجهة مصممة لتعمل بسلاسة على جميع الأجهزة."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-header border-t border-white/20 py-10 mt-10">
        <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <Palette className="w-6 h-6 text-indigo-700" />
                <span className="text-2xl font-black text-indigo-900">إبداع</span>
            </div>
            <p className="text-indigo-800/70 font-medium">صُمم ليُلهم الفنان في داخلك ✨</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, bg: string, title: string, description: string, delay: number }> = ({ icon, bg, title, description, delay }) => (
    <div 
        className="glass-panel p-8 rounded-[2rem] hover:bg-white/80 transition-all duration-300 hover:-translate-y-2 group"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className={`${bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-12 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
        <p className="text-slate-600 font-medium leading-relaxed text-sm">{description}</p>
    </div>
);
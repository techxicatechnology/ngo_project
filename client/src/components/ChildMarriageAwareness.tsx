import { useRef } from 'react';
import TakePledge from "./TakePledge";
import { Heart, Shield, PhoneCall, Quote, Share2, Sparkles, BookOpen, Clock, Calendar, GraduationCap } from 'lucide-react';
import { useState } from "react";


const ChildMarriageAwarenessMarathi = () => {
  const containerRef = useRef(null);
  const [isPledgeOpen, setPledgeOpen] = useState(false);


  return (
    <div ref={containerRef} className="bg-[#fffdfb] mt-10 text-[#1a1a1a] font-serif selection:bg-orange-100">
      
      {/* ===== HEADER SECTION ===== */}
      <header className="pt-20 pb-16 px-6 max-w-4xl mx-auto text-center">
        

        <h1 className="blog-title text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-10 font-sans">
          स्वप्नांना सीमा नसतात, <br />
          <span className="text-orange-600 italic">तिला भरारी घेऊ द्या!</span>
        </h1>

        <p className="blog-excerpt text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto font-sans">
          लग्नाच्या बेडीत अडकण्यापेक्षा, तिच्या हातात पुस्तक द्या. तिचे भविष्य फुलवण्यासाठी आजच बालविवाहाविरुद्ध आवाज उठवा.
        </p>
      </header>

      {/* Main Feature Image */}
      <section className="px-4 md:px-12 mb-24">
        <div className="blog-hero-image relative h-[75vh] w-full rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
          <img 
            src="/childAwareness1.jpg" 
            className="w-full h-full object-cover"
            alt="शिक्षण घेणारी मुलगी" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 text-white md:max-w-xl">
             <p className="text-2xl font-sans font-bold italic leading-tight">
               "माझ्या हातातील मेहंदीपेक्षा मला हातात धरलेली लेखणी अधिक प्रिय आहे."
             </p>
          </div>
        </div>
      </section>

      {/* ===== ARTICLE BODY ===== */}
      <article className="max-w-3xl mx-auto px-6 font-sans">
        
        <div className="reveal-text mb-16">
          <h2 className="text-3xl font-bold mb-6 font-sans tracking-tight text-slate-900 border-b-2 border-orange-100 pb-2">हिरावलेले बालपण</h2>
          <p className="text-lg text-slate-700 leading-loose mb-6">
            बालविवाह ही केवळ एक जुनी परंपरा नाही; तर तो एक असा अडथळा आहे जो तरुण मुलींना गरिबी आणि परावलंबित्वाच्या चक्रात अडकवतो. जेव्हा एखाद्या मुलीचा १८ वर्षांआधीच विवाह लावून दिला जातो, तेव्हा तिचे औपचारिक शिक्षण कायमचे थांबते.
          </p>
          <p className="text-lg text-slate-700 leading-loose">
            याचा शारीरिक परिणामही तितकाच भयानक असतो. कमी वयातील वधूंना गर्भधारणा आणि बाळंतपणाच्या वेळी मोठ्या आरोग्य जोखमींना सामोरे जावे लागते, कारण त्यांचे शरीर या बदलांसाठी पूर्णपणे तयार झालेले नसते.
          </p>
        </div>

        {/* Pull Quote */}
        <div className="reveal-text my-20 pl-8 border-l-4 border-orange-500 bg-orange-50/50 py-10 pr-6 rounded-r-3xl transition-all hover:bg-orange-50">
          <Quote className="text-orange-300 mb-4" size={40} />
          <p className="text-3xl md:text-4xl font-serif leading-tight text-slate-800">
            "मी ठरवलं की लग्नाच्या अंगठीपेक्षा माझी पुस्तकं जास्त महत्त्वाची आहेत. मी माझ्या भविष्याची निवड केली."
          </p>
          <cite className="block mt-6 text-sm font-bold uppercase tracking-widest text-orange-600 not-italic font-sans">
            — अमिना, विद्यार्थिनी आणि बालविवाह रोखणारी कार्यकर्ती
          </cite>
        </div>

        {/* Info Grid */}
        <div className="reveal-text grid md:grid-cols-2 gap-8 my-16">
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <Shield className="text-orange-600 mb-4" size={32} />
            <h4 className="font-bold text-xl mb-2 tracking-tight">कायदेशीर संरक्षण</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              बालविवाह रोखण्यासाठी कायदे अधिक कडक करणे आणि त्यांची अंमलबजावणी स्थानिक पातळीवर होत असल्याची खात्री करणे ही पहिली पायरी आहे.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <Heart className="text-rose-500 mb-4" size={32} />
            <h4 className="font-bold text-xl mb-2 tracking-tight">सामाजिक जाणीव</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              स्थानिक नेते आणि पालकांना शिक्षित करून, आम्ही बालविवाहास प्रोत्साहन देणाऱ्या चुकीच्या समजुती दूर करत आहोत.
            </p>
          </div>
        </div>

        <div className="reveal-text mb-20">
          <h2 className="text-3xl font-bold mb-6 font-sans tracking-tight text-slate-900 border-b-2 border-orange-100 pb-2">शिक्षण हाच एकमेव उपाय</h2>
          <p className="text-lg text-slate-700 leading-loose">
            आकडेवारीनुसार, जर मुलगी शाळेत शिकत राहिली, तर तिचे लग्न लावून दिले जाण्याची शक्यता ६०% पेक्षा कमी होते. शिक्षण मुलींना निर्णय घेण्याची ताकद, आत्मविश्वास आणि आर्थिक स्वातंत्र्य मिळवून देते.
          </p>
        </div>

        {/* Action Banner */}

      </article>

{/* ===== PLEDGE SECTION ===== */}
<div className="max-w-3xl mx-auto px-6 mb-24">
  <div className="bg-orange-50 rounded-3xl p-10 text-center border border-orange-100">
    
    <h3 className="text-2xl font-bold mb-3 text-slate-900">
      आजच प्रतिज्ञा घ्या
    </h3>

    <p className="text-slate-600 mb-6 max-w-xl mx-auto">
      मी वचन देतो/देते की माझ्या परिसरात बालविवाहाविरुद्ध आवाज उठवेन,  
      प्रत्येक मुलीच्या शिक्षणाचा आणि स्वातंत्र्याचा आदर करेन.
    </p>

    <button
    onClick={() => setPledgeOpen(true)}
      className="group inline-flex items-center gap-3 
        bg-orange-600 hover:bg-orange-700 
        text-white font-bold px-8 py-4 rounded-full
        transition-all shadow hover:shadow-lg"
    >
      <GraduationCap className="group-hover:-rotate-6 transition-transform" />
      प्रतिज्ञा घ्या
    </button>

    <p className="text-xs text-slate-400 mt-4">
      तुमची प्रतिज्ञा एखाद्या मुलीच्या भविष्याला नवी दिशा देऊ शकते.
    </p>
  </div>
</div>

<TakePledge
        isOpen={isPledgeOpen}
        onClose={() => setPledgeOpen(false)}
      />



      <footer className="pb-16 text-center border-t border-slate-100 pt-12">
        <p className="text-[10px] uppercase tracking-[0.5em] font-sans font-black opacity-30">प्रत्येक मुलीचा सन्मान • २०२६</p>
      </footer>
    </div>
  );
};

export default ChildMarriageAwarenessMarathi;
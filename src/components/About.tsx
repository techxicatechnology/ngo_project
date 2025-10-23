import { Target, Users, Award } from 'lucide-react';
import pic1 from '../assets/pic1.webp';

const values = [  
  {
    icon: Target,
    title: 'आमचे ध्येय',
    description: 'शाश्वत विकास, शिक्षण आणि आरोग्य उपक्रमांद्वारे दुर्बल समाजांना सक्षम बनवणे आणि सकारात्मक बदल घडवणे.'
  },
  {
    icon: Users,
    title: 'समाज प्रथम',
    description: 'आम्ही स्थानिक समाजांसोबत थेट काम करतो, त्यांच्या गरजा आणि संस्कृतीला अनुसरून कार्यक्रम राबवतो.'
  },
  {
    icon: Award,
    title: 'पारदर्शकता',
    description: 'आम्ही उच्चतम जबाबदारी राखतो, प्रत्येक देणगी थेट आमच्या कार्यक्रमांना पाठिंबा देते.'
  }
];

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={pic1}
                alt="संघ एकत्र काम करत आहे"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-xl shadow-xl max-w-xs">
              <div className="text-4xl font-bold text-emerald-600 mb-2">१+ वर्षे</div>
              <div className="text-gray-600">जगभरात सकारात्मक बदल घडवताना</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
              आमच्याबद्दल
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              एकत्र येऊन उज्वल भविष्य घडवूया
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              २०२४ मध्ये स्थापन झालेली युवाशक्ती ही मानवतावादी कार्यात अग्रस्थानी आहे.
              गरिबी, शिक्षणाचा अभाव आणि मर्यादित आरोग्य सेवा असलेल्या समाजांना मदत पुरवते.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              स्थानिक संस्थांसोबत भागीदारी आणि समर्पित स्वयंसेवकांच्या मदतीने आम्ही शाश्वत कार्यक्रम राबवले आहेत,
              ज्यामुळे अनेकांचे जीवन बदलले आहे आणि आमचा प्रभाव दररोज वाढत आहे.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
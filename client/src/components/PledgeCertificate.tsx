import React, { useRef , useEffect} from 'react';
import * as htmlToImage from 'html-to-image';
import { usePledge } from '../store/usePledge';

const PledgeCertificate: React.FC = () => {


  useEffect(() => {
  document.body.style.overflow = 'auto';
  return () => {
    document.body.style.overflow = '';
  }
}, []);

  const certificateRef = useRef<HTMLDivElement>(null);

  const { userName } = usePledge();

if(!userName){
  return null;
}  

 const downloadPNG = async () => {
  if (!certificateRef.current) return;

  try {
    // wait for images/fonts
    await new Promise(r => setTimeout(r, 500));

    const dataUrl = await htmlToImage.toPng(certificateRef.current, {
      quality: 1,
      pixelRatio: 3,          // sharper
      cacheBust: true,
      backgroundColor: '#fffcf5',
      height: 1200,           // FORCE full height
      width: 850
    });

    const link = document.createElement('a');
    link.download = `${userName}-certificate.png`;
    link.href = dataUrl;
    link.click();

  } catch (err) {
    console.log("Download error:", err);
  }
};


  return (
    <>
      {/* DOWNLOAD BUTTON */}
    
      {/* CERTIFICATE */}
      <div className='w-full mt-20 md:max-w-[850px] md:overflow-hidden max-w-[95vw] overflow-scroll mx-auto my-5 h-full '>
<div
  ref={certificateRef}
  className=" bg-[#fffcf5] p-10 relative box-border
    shadow-[0_0_40px_rgba(0,0,0,0.15)]
    font-['Noto_Sans_Devanagari']
  "
  style={{
    aspectRatio: "1 / 1.414",   // 👈 THIS MAKES IT A FULL PAGE
    minHeight: "1200px"         // fallback for older browsers
  }}
>




        {/* 1. SECURITY PATTERN */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.14,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 0 50 50 T 100 50' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3Cpath d='M0 30 Q 25 80 50 30 T 100 30' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
          zIndex: 0
        }} />

        {/* 2. LOGO WATERMARK */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          backgroundImage: 'url("/Logo.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08,
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        {/* 3. BORDERS */}
        <div className="absolute inset-[15px] border-2 border-[#d4af37] z-10 pointer-events-none" />
        <div className="absolute inset-[25px] border-4 border-double border-[#d4af37] z-10 pointer-events-none" />

        {/* CONTENT */}
        <div className="relative z-20">

          {/* HEADER */}
          <div className="flex justify-between items-center px-[50px] py-5">
            <img src="/Logo.png" className="w-[90px] h-[90px] object-contain" />

            <div className="text-center">
              <h2 className="text-[#7a5230] text-2xl font-bold m-0">
                बाल विकास व जागरूकता अभियान
              </h2>
              <p className="text-[#d4af37] text-sm font-bold tracking-widest m-0">
                CHILD AWARENESS & DEVELOPMENT PROGRAM
              </p>
            </div>

            <div className="w-20 h-20 rounded-full border-2 border-red-700 flex items-center justify-center bg-white p-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/800px-Emblem_of_India.svg.png"
                className="h-[55px]"
              />
            </div>
          </div>

          {/* TITLE */}
          <div className="text-center mt-[60px]">
            <h1 className="text-[72px] text-[#7a5230] font-black drop-shadow-sm m-0">
              प्रशंसा प्रमाणपत्र
            </h1>

            <p className="text-lg text-gray-600 tracking-[4px] font-bold uppercase">
              Certificate of Appreciation
            </p>
          </div>

          {/* NAME */}
          <div className="text-center mt-[50px]">
            <p className="text-[22px] text-gray-700 italic">
              हे प्रमाणपत्र गौरवाने प्रदान करण्यात येते:
            </p>

            <h2 className="text-[64px] text-green-900 font-bold font-serif my-4">
              {userName}
            </h2>

            <div
              className="w-[300px] h-[2px] mx-auto"
              style={{
                background: 'linear-gradient(90deg, transparent, #d4af37, transparent)'
              }}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="text-center px-20 mt-10">
            <p className="text-xl text-gray-800 leading-[1.8] font-medium">
              यांनी <span className="text-[#7a5230] font-bold">"बाल विवाह मुक्त भारत"</span> आणि बाल हक्क जागरूकता मोहिमेत 
              दिलेल्या बहुमूल्य योगदानाबद्दल आणि सक्रिय सहभागाबद्दल हे प्रमाणपत्र देऊन त्यांना सन्मानित करण्यात येत आहे.
            </p>
          </div>

          {/* PLEDGE BOX */}
          <div className="mx-20 mt-12 border-2 border-green-900 rounded-xl p-6 bg-green-900/5 relative">

            <div className="absolute -top-4 left-8 bg-green-900 text-white px-5 py-1 rounded-full text-sm font-bold">
              सामाजिक वचनबद्धता
            </div>

            <ul className="list-none p-0 m-0">
              {[
                'बालविवाहाच्या प्रथेला पूर्णपणे विरोध करण्याची प्रतिज्ञा.',
                'मुलांच्या शिक्षण आणि सुरक्षिततेसाठी सदैव तत्पर.',
                'समाजात बाल हक्कांबद्दल जागरूकता निर्माण करणे.'
              ].map((text, i) => (
                <li key={i} className="flex items-center mb-2 text-green-900 font-semibold">
                  <span className="mr-2">✦</span> {text}
                </li>
              ))}
            </ul>
          </div>

<div className="flex justify-center mt-5">
  <p className="w-[500px] text-center text-lg text-gray-800 font-medium leading-relaxed">
    आपली ही <span className="text-[#7a5230] font-bold">सामाजिक बांधिलकी</span> आणि <span className="text-green-900 font-semibold">बाल हक्कांसाठी दिलेल्या समर्पित सेवेमुळे</span> समाजातील बदलाची प्रेरणा भविष्यातील पिढ्यांसाठीही आदर्श ठरेल.  
    आम्ही आपल्या <span className="text-[#d4af37] font-bold">अमूल्य योगदानाबद्दल</span> मनःपूर्वक आभार व्यक्त करतो आणि आपल्या पुढील उपक्रमांसाठी <span className="text-green-900 font-semibold">शुभेच्छा</span> देतो.
  </p>
</div>

          {/* FOOTER – SIGNATURES */}
          <div className="flex justify-between items-end px-20 mt-[px]">

            {["कार्यक्रम संचालक","प्रमुख कार्यकारी अधिकारी"].map((label, i) => (
              <div key={i} className="text-center">

                <div className="">
                  <img
                    src="/signature.png"
                    className="w-[180px] object-contain mix-blend-multiply block"
                    style={{
                      filter: "brightness(1.1) contrast(1.2)",
                    }}
                  />
                </div>
                <div className="border-t border-[#7a5230] w-[180px] "></div>
                <p className="text-sm font-bold text-[#7a5230] mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


        <div className="flex justify-center my-4">
        <button
          onClick={downloadPNG}
          className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition font-semibold"
        >
          Download Certificate PNG
        </button>
      </div>
      </div>

    </>
  );
};

export default PledgeCertificate;
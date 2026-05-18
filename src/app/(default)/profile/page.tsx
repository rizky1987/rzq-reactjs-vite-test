"use client";

import ProfileExperince from './profileExperience';
import ProfilePortfolio from './profilePortfolio';
import Button from '@/components/ui/Button';
import { useProfile } from './hooks/useProfile'; 

const Profile = () => {
  const { 
    isLoading, 
    isPrinting, 
    printRef, 
    handleDownloadPdf, 
    socialLinks, 
    skills 
  } = useProfile();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-2 md:p-4 font-sans relative w-full overflow-x-hidden">
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-[2px]">
          <div className="h-16 w-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
          <p className="mt-4 text-sm font-bold text-slate-700 tracking-wide uppercase">Generating Sharp PDF...</p>
        </div>
      )}

      <div className="min-h-screen bg-gray-100 p-2 md:p-6 flex flex-col items-center w-full max-w-full">
        
        {/* Tombol Unduh */}
        <div className="w-full flex justify-end mb-6">
          <Button 
            variant="primary" 
            buttonType="download" 
            onClick={handleDownloadPdf}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Download CV'}
          </Button>
        </div>

        {/* Kontainer Utama CV */}
        <div 
          ref={printRef} 
          className={`bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-screen transition-all duration-100
            ${isPrinting 
              ? 'w-[1024px] min-w-[1024px]' 
              : 'w-full max-w-5xl'          
            }`}
        >
          {/* SIDEBAR CV */}
          <aside className="w-full md:w-80 bg-slate-800 text-white p-6 md:p-8 flex flex-col items-center shrink-0">
            <div className="relative mb-6 flex justify-center w-full">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-slate-700 shadow-xl overflow-hidden bg-slate-700 shrink-0">
                <img 
                  src="/icons/photo.jpeg" 
                  alt="Profile" 
                  className="w-full h-full object-cover object-center scale-105" 
                />
              </div>
            </div>
            
            <div className="text-center w-full">
              <h1 className="text-xl md:text-2xl font-bold tracking-wide">RIZKY M SOLEH</h1>
              <p className="text-blue-400 font-medium tracking-widest text-[10px] md:text-xs mt-1 uppercase">Software Developer</p>
            </div>

            <div className="w-full border-t border-slate-700 my-6 md:my-8"></div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8 md:gap-4">
              {/* Education */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400">Education</h3>
                <div>
                  <p className="text-sm font-bold">Bachelor of Computer Science</p>
                  <p className="text-xs text-slate-300 mt-1">Indonesian Computer University</p>
                  <p className="text-xs text-slate-400 italic">GPA: 3.05/4.00</p>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400">Skills</h3>
                <ul className="grid grid-cols-2 md:grid-cols-1 gap-2 text-xs">
                  {skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT CV */}
          <main className="flex-1 bg-white p-6 md:p-10 flex flex-col min-w-0">
            {/* Summary */}
            <section className="relative mb-4">
              <p className="text-gray-700 leading-relaxed italic text-sm text-justify md:text-left">
                "Dedicated and Passionate in programming especially in Backend Development with 10+ years of experience in 
                high-quality backend application. I have a solid educational foundation, a critical person, a disciplined person, 
                excellent communication skills. I’m always getting interested into something new. Adaptable, quick learning, 
                always have determination to get the job done and easy to maintenance."
              </p>
            </section>

            {/* Social Links */}
            <section className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100 w-full">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 text-center">Find me on</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a key={social.label} href="#" className="flex items-center gap-3 hover:text-blue-600 transition-colors group">
                    <img className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" src={social.icon} alt={social.label} />
                    <span className="text-[10px] md:text-[11px] text-gray-600 truncate">{social.link}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Portfolio Component */}
            <div className="w-full mb-3">
              <ProfilePortfolio />
            </div>
            
            {/* Experience Component */}
            <div className="w-full overflow-hidden">
              <ProfileExperince />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
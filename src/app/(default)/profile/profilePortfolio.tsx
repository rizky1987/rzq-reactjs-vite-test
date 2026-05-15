const ProfilePortfolio = () => {
  const projects = [
    {
      title: "Admin Dashboard with SRBAC Implementation",
      description: "Developed scalable Admin Management Dashboard using the modern frontend stack. The primary focus of this project was the implementation of Simple Role-Based Access Control (SRBAC) to manage user permissions and secure specific administrative routes and UI components effectively.",
      tech: ["ReactJS", "Vite", "Typescript", "TailwindCSS"],
      repoLink: "https://github.com/rizky1987/rzq-admin-dashboard-react",
      liveLink: "https://rzq-admin-dashboard-react.vercel.app",
    }
  ];

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Featured Projects</h3>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all hover:border-blue-100">
            <div className="flex flex-col gap-3">
              
              {/* Judul & Badge Tech */}
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium italic">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deskripsi */}
              <p className="text-[11px] text-gray-600 leading-relaxed text-justify">
                {project.description}
              </p>

              {/* AREA LINK: Penempatan URL utuh agar Auto-Detect di PDF */}
              <div className="flex flex-col gap-1.5 mt-1 border-t border-gray-50 pt-1">
                {project.repoLink && (
                  <div className="flex items-center gap-2">
                    <img src="/github.png" alt="GitHub" className="w-3 h-3 opacity-60" />
                    <a 
                      href={project.repoLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[9px] text-blue-500 font-mono break-all leading-none hover:underline"
                    >
                      {project.repoLink}
                    </a>
                  </div>
                )}
                {project.liveLink && (
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="text-[9px] text-blue-500 font-mono break-all leading-none">
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[9px] text-blue-500 font-mono break-all leading-none hover:underline"
                      >
                        {project.liveLink}
                      </a>                      
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfilePortfolio;
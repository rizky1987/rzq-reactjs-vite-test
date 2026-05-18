const ProfileExperience = () => {
  const experiences = [
    {
      id: 0,
      role: "Freelancer Frontend Developer",
      company: "PT. Radya Digital",
      period: "March 2026 – April 2026",
      responsibilities: [
        "Fixing existing application frontend bugs with metronic 8",
      ], 
      techs:[
        "C#",
        "Metronic 8",
        "Postgres"
      ]
    },
    {
      id: 1,
      role: "Senior Backend Developer",
      company: "PT. InfoSys Terpadu",
      period: "Aug 2025 – March 2026",
      responsibilities: [
        "Analyzed client requirements and translated them into backend system designs, API specifications, and actionable user stories to deliver scalable, secure, and high-performance services.",
        "Monitored backend services in production, performed incident troubleshooting, and implemented permanent fixes to prevent recurring issues.",
        "Presented and demonstrated application features to users and stakeholders, gathering feedback for iterative improvements and ensuring user satisfaction."
      ], 
      techs:[
        "Go-lang (gin)",
        "Microservices",
        "GCP","CI/CD with Jenkins",
        "Mysql","Postgres"
      ]
    },
    {
      id: 2,
      role: "Senior Backend Developer",
      company: "PT. Radya Digital",
      period: "Feb 2022 – Jun 2025",
      responsibilities: [
        "Designed, developed, and deployed microservice-based applications on Azure Kubernetes Service (AKS) for a distribution company, enabling scalable and fault-tolerant system architecture using Go (Golang).",
        "Built and implemented a high-performance chatbot system with microservices on AWS (ECS + SQS), capable of processing hundreds of thousands of queued transactions per day, resulting in a 99% success rate on message delivery.",
        "Established base projects and internal frameworks using hexagonal architecture to support junior and mid-level developers, increasing onboarding efficiency and reducing technical debt",
        "Led a cross-functional development team of 4–6 engineers"
      ],
      techs:[
        "C# (.net)",
        "Go-lang (fiber, echo)",
        "AWS","Azure",
        "Mysql","Postgres",
        "Docker","CI/CD","Kubernetes",
        'React.js + Vite', 
        'TypeScript', 
        'TailwindCSS', 
        'Next.js', 
      ]
    },
    {
      id: 3,
      role: "IT Supervisor",
      company: "PT. Global Unggul Mandiri",
      period: "Aug 2018 - Feb 2022",
      responsibilities: [
        "Designed and developed a scalable customer-facing application, ensuring high availability and performance using technologies with Golang, and PostgreSQL.",
        "Analyzed user requirements and translated them into detailed technical specifications and user stories for the development team.",
        "Presented and demonstrated application features to users and stakeholders, gathering feedback for iterative improvements and ensuring user satisfaction.",
      ],
      techs:[
        "Go-lang (gin, echo)",
        "Microservices",
        "Mysql","MongoDb"
      ]
    },
    {
      id: 4,
      role: "Web Developer",
      company: "Inata Integra Solusi",
      period: "Oct 2017 - Aug 2018",
      responsibilities: [
        "Developed an accounting application as a backend developer,focusing on building a reliable APIs using C# and Onion architecture, with PostgreSQL as the primary database",
        "Collaborated with frontend developers and QA team to ensure feature completeness and application stability",
      ],
      techs:[
        "C# (.net)",
        "Azure",
        "MsSQL","Postgres"
      ]
    },
    {
      id: 5,
      role: "Web Developer",
      company: "PT. Radya Digital",
      period: "Apr 2016 - Oct 2017",
      responsibilities: [
        "Developed backend applications based on client-specific requirements, translating business needs into robust, maintainable APIs using C# other relevant technologies",
        "Participated in requirement analysis, database design, and API development, integration with frontend systems and third-party services",
      ],
      techs:[
        "C# (.net)",
        "Azure",
        "MsSQL","Postgres"
      ]
    },
    {
      id: 6,
      role: "Fullstack Developer",
      company: "PT. Cinovasi Rekaprima",
      period: "Oct 2013 - Jan 2016",
      responsibilities: [
        "Designed, developed, and implemented a system for harbor operations",
        "Conducted user training sessions to ensure successful system adoption",
        "Developed enterprise application for Pertamina ONWJ",
        "Analyzed user requirements through direct collaboration with stakeholders, translating them into technical documentation",
      ],
      techs:[
        "C# (.net)",
        "MsSQL",
        "Java","JQuery",
        "HTML","Delphi 7","Oracle"
      ]
    },
    {
      id: 7,
      role: "Fullstack Developer",
      company: "PT. InzpireTech",
      period: "Jan 2013 - Sept 2013",
      responsibilities: [
        "Analyzed and developed a ticketing application, covering modules such as booking, payment integration, and reporting using code igniter and MySQL",
        "Analyzed and developed a hotel management application, including features for room booking, customer management, and check-in/check-out processes. Designed backend systems with a focus on performance and data integrit",
      ],
      techs:[
        "PHP (Code Igniter)",
        "Html",
        "Jquery","Javascript"
      ]
    },
    {
      id: 8,
      role: "Backend Developer",
      company: "PT. Swamedia",
      period: "July 2012 - Jan 2013",
      responsibilities: [
        "Designed, developed, and implemented a customer package management application for Telkom, enabling efficient handling of customer subscription",
        "Performed database analysis and optimization, including schema design, query performance tuning, and data integrity validation to support system performance and scalability",
      ],
      techs:[
        "PHP (Code Igniter)",
        "Html",
        "Jquery","Javascript"
      ]
    },
    {
      id: 9,
      role: "Web Developer",
      company: "PT. Business Software Solution",
      period: "Sept 2011 - July 2012",
      responsibilities: [
        "Developed a hospital management application, including key modules such as patient registration, doctor scheduling, medical records, and billing",
        "Provided user training to medical staff and administrative personnel, ensuring smooth adoption",
        "Collected and analyzed user requirements through direct collaboration with users, translating operational needs into technical specifications and application features"
      ],
      techs:[
        "PHP (Yii Framework)",
        "Html",
        "Jquery","Javascript"
      ]
    }
  ];

  return (
    <section className="w-full">

      <div className="space-y-8">
        <div className="flex items-center gap-3 mt-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Experience</h3>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-0 md:pl-0">
            {/* Header: Role & Company */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline bg-slate-50 border-l-4 border-blue-600 p-4 rounded-r-lg shadow-sm gap-2">
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                  {exp.role}
                </h3>
                <p className="text-blue-700 font-semibold text-sm md:text-base mt-1">
                  {exp.company}
                </p>
              </div>
              
              <div className="text-left md:text-right">
                <span className="inline-block bg-blue-100 text-blue-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {exp.period}
                </span>
              </div>
            </div>

            {/* Tech Stack: Menggunakan flex-wrap agar tidak jebol di mobile */}
            <div className="flex flex-wrap gap-2 mt-4 px-2">
              {exp.techs.map((tech, index) => (
                <span 
                  key={index} 
                  className="bg-white border border-slate-200 text-slate-700 text-[10px] md:text-xs px-2 py-1 rounded shadow-sm hover:border-blue-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Responsibilities */}
            <ul className="mt-4 space-y-3 text-slate-700 text-xs md:text-sm px-4">
              {exp.responsibilities.map((task, index) => (
               <li key={index} className="list-disc list-outside ml-5 text-blue-500">
                <span className="text-gray-700 text-justify md:text-left leading-relaxed block">
                  {task}
                </span>
              </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileExperience;
export const metadata = {
  title: "System Architecture & Documentation - Admin Platform",
  description: "Detailed technical summary of features, logging, security, Google OAuth, and tech stack.",
};

export default function ArchitectureDocsPage() {
  const techStack = [
    { name: "Next.js (App Router)", role: "Core framework, Server Components, API Routes, & file-based routing." },
    { name: "TypeScript", role: "Static typing across client, server, and database layers to prevent runtime bugs." },
    { name: "Tailwind CSS", role: "Utility-first CSS framework for highly responsive, modern, and clean UI design." },
    { name: "PostgreSQL", role: "Primary relational database for structured product and user data persistence." },
    { name: "Redis", role: "In-memory data store for hyper-fast token whitelisting and session management." },
    { name: "JsonWebToken (JWT)", role: "Industry standard for securely packaging and encrypting user identity claims." },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-500/10 selection:text-blue-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-blue-500/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-16">
        
        <div className="border-b border-slate-200 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider">
            System Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Technical Specifications
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
            Detailed technical overview of the product management platform, showcasing core features, stateful security middleware, Google Authentication pipelines, and resilient logging infrastructure.
          </p>
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">🚀 Core Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:border-slate-300 transition-colors">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Product Management (CRUD)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Modular architecture splitting visual representation from logic layer. Features full modal-based workflows for Viewing, Creating, and Updating records with automated schema client-side validation.
              </p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:border-slate-300 transition-colors">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Dashboard Analytics Overview</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Real-time metrics layout displaying revenue, orders, and active users. Driven by dynamic charting (Bar & Pie) using declarative data pipelines feeding individual sub-components.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-slate-600 rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">🧰 Production Tech Stack</h2>
          </div>

          <div className="w-full overflow-hidden border border-slate-200 bg-white rounded-xl shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-6">Technology</th>
                    <th className="py-4 px-6">Architectural Responsibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {techStack.map((tech, index) => (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-900 whitespace-nowrap">{tech.name}</td>
                      <td className="py-4 px-6 text-slate-600 leading-relaxed">{tech.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-red-500 rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Google Authentication Lifecycle (Gmail Login)</h2>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed">
              The application natively integrates the <b>OAuth 2.0 protocol via Google Identity Services</b>. This pipeline secures user credentials, as the application never intercepts nor stores users' raw Gmail passwords directly.
            </p>

            <h3 className="text-md font-semibold text-slate-800 mt-4">Authentication Workflow (Step-by-Step):</h3>
            
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center font-mono font-bold text-xs">1</span>
                <div>
                  <strong className="text-slate-900">User Redirection:</strong> The user clicks the <em>"Sign in with Google"</em> button on the login page. The application redirects the browser to the Google Authorization Server, passing necessary parameters such as <code className="text-xs bg-slate-200/60 px-1 text-blue-700 font-mono rounded">client_id</code> and <code className="text-xs bg-slate-200/60 px-1 text-blue-700 font-mono rounded">redirect_uri</code>.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center font-mono font-bold text-xs">2</span>
                <div>
                  <strong className="text-slate-900">Authorization Code Exchange:</strong> Once the user successfully logs into their Gmail account and grants permission, Google relays a secure <strong>Authorization Code</strong> back to our application via the callback URL.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center font-mono font-bold text-xs">3</span>
                <div>
                  <strong className="text-slate-900">Profile Extraction:</strong> Our Next.js backend server intercepts the code and exchanges it with Google's server to securely retrieve the user's verified profile data (Name, Gmail Email, and Profile Picture).
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center font-mono font-bold text-xs">4</span>
                <div>
                  <strong className="text-slate-900">Session Upstream:</strong> If the email is registered within the PostgreSQL database, the server seals the user's identity into an encrypted JWT token, registers it inside the <strong>Redis Session Cache</strong>, and injects it into the browser as an <code className="text-xs bg-slate-200/60 px-1 text-emerald-700 font-mono rounded">HttpOnly Cookie</code>.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-purple-600 rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">🔐 Security & Session Lifecycle</h2>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-semibold text-slate-900">Google OAuth 2.0 Integration</h3>
                <p className="text-slate-600 text-sm">Delegated identity provider handling zero-password credentials storage.</p>
              </div>
              <span className="self-start md:self-auto px-2.5 py-0.5 bg-purple-50 border border-purple-100 text-purple-700 rounded-md text-xs font-mono font-medium">OAuth 2.0</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-semibold text-slate-900">Hybrid Stateful Sessions (JWT + Redis)</h3>
                <p className="text-slate-600 text-sm">Encrypted HttpOnly cookies cross-referenced against a memory-cache backend for instant token revocation capability.</p>
              </div>
              <span className="self-start md:self-auto px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-md text-xs font-mono font-medium">Redis Lock</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">SRBAC (Session Role-Based Access Control)</h3>
                <p className="text-slate-600 text-sm">Granular authorization boundaries evaluated directly within Next.js Edge Middleware to block untrusted routes.</p>
              </div>
              <span className="self-start md:self-auto px-2.5 py-0.5 bg-amber-50 border border-amber-100 text-amber-700 rounded-md text-xs font-mono font-medium">RBAC Middleware</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-pink-600 rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">🛠️ Observability & Telemetry</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <h3 className="font-semibold text-slate-900">Centralized Logger System</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Asynchronous <code className="text-xs bg-slate-100 border border-slate-200 px-1 py-0.5 rounded text-red-700 font-mono">logger.error</code> and <code className="text-xs bg-slate-100 border border-slate-200 px-1 py-0.5 rounded text-amber-700 font-mono">logger.warn</code> hooks routing detailed metadata, locations, and failure contextual payloads to system audits instead of relying on standard console pipes.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <h3 className="font-semibold text-slate-900">Graceful Crash Recovery</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Global Error Boundaries intercepting runtime issues. Leverages Next.js generated <code className="text-xs bg-slate-100 border border-slate-200 px-1 py-0.5 rounded text-blue-700 font-mono">error.digest</code> strings to hide backend vulnerabilities from public eyes while logging exact traces internally.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
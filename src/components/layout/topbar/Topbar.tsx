"use client";

import { useTopbar } from './useTopbar';

const Topbar = () => {
  const {
    showDropdown,
    isPending,
    handleLogout,
    toggleDropdown,
    closeDropdown,
  } = useTopbar();

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 shadow-sm">
      
      <div className="flex items-center flex-1">
        <button 
          className="p-2 mr-3 text-blue-600 rounded-full md:hidden hover:bg-gray-100 focus:outline-none"
        >
          <i className="fa fa-bars text-xl"></i>
        </button>

        <form className="hidden sm:flex items-center max-w-xs w-full">
          <div className="relative w-full">
            <input 
              type="text" 
              className="w-full py-2 pl-4 pr-10 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              placeholder="Search for..." 
            />
            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 group">
              <i className="fas fa-search text-gray-400 group-hover:text-blue-600"></i>
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center space-x-4">
        
        <div className="flex items-center space-x-2">
          <button className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-colors">
            <i className="fas fa-bell fa-fw"></i>
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3+
            </span>
          </button>

          <button className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-colors">
            <i className="fas fa-envelope fa-fw"></i>
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              7
            </span>
          </button>
        </div>

        <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

        <div className="relative">
          <button 
            onClick={toggleDropdown}
            disabled={isPending}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all focus:outline-none disabled:opacity-50"
          >
            <span className="hidden lg:inline text-sm font-medium text-gray-600"></span>
            <img 
              className="h-8 w-8 rounded-full border-2 border-blue-500 object-cover" 
              src="https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_profile.svg" 
              alt="Profile"
            />
          </button>

          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={closeDropdown}
              ></div>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-150">
                <div className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wider">
                  Manage Account
                </div>
                
                <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                  <i className="fas fa-user fa-sm fa-fw mr-3 text-gray-400"></i>
                  Profile
                </a>
                
                <div className="my-1 border-t border-gray-100"></div>
                
                <button 
                  onClick={handleLogout}
                  disabled={isPending}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 font-medium"
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-3"></i>
                  {isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
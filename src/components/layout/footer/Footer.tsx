const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-300 py-4 md:py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <span className="text-xs md:text-sm text-gray-600 text-center font-medium tracking-wide">
            Copyright &copy; {new Date().getFullYear()}{" "}
            <span className="text-blue-600 font-bold uppercase">Rizky Mochammad Soleh</span>
          </span>
          
          {/* Opsional: Tambahkan pemisah atau info tambahan yang hanya muncul di desktop */}
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
            All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
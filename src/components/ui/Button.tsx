interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'success' | 'warning' | 'secondary';
  buttonType?: 'submit' | 'cancel' | 'add' | 'default' | 'close' | 'delete' | 'download';
  children: React.ReactNode;
}

const Button = ({ variant = 'primary', buttonType = 'default', children, ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-[#4e73df] hover:bg-[#4e73df] text-white',
    danger:  'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    secondary : 'bg-gray-500 hover:bg-gray-100 text-white'
  };

  const types = {
    submit: 'fa-check',
    cancel:  'fa-times',
    add: 'fa-plus',
    close : 'fa-minus-circle',
    delete : 'fa-trash',
    download : 'fa-download',
    'default': ''
  };

  return (
        <div className="flex flex-col md:flex-row justify-end">
          <button 
            className={`px-3 py-2 rounded shadow-sm font-medium transition-colors cursor-pointer ${variants[variant]}`}
            {...props}>
            <i className={`pr-1 fas ${types[buttonType]}`}></i>
            {children}
          </button>
             
        </div>
    
  );
};

export default Button;
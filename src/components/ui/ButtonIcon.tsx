import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'view' | 'edit' | 'delete';
}

const ButtonIcon = ({ buttonType = 'view', ...props }: ButtonProps) => {
  const config = {
    view: {
      icon: 'fa-eye',
      style: 'bg-white',
      label: 'View Details'
    },
    edit: {
      icon: 'fa-pen',
      style: 'bg-white ',
      label: 'Edit Item'
    },
    delete: {
      icon: 'fa-trash-alt',
      style: 'bg-white',
      label: 'Delete Item'
    }
  };

  const currentConfig = config[buttonType];

  return (
    <button 
      {...props} 
      title={currentConfig.label}
      className={`
        flex items-center justify-center
        w-8 h-8 rounded-lg border shadow-sm
        transition-all duration-200 transform hover:scale-110 active:scale-95
        text-black hover:bg-gray-50 border-gray-100
        ${currentConfig.style}
        ${props.className || ''} 
      `}
    >
      <i className={`fas ${currentConfig.icon} text-sm`}></i>
    </button> 
  );
};

export default ButtonIcon;
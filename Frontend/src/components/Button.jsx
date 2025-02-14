import React from 'react';

function Button({
  children,
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <div className="w-full flex justify-center">
      <button
        className={`px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg ${bgColor} ${textColor} ${className} transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;

import React, { useId } from "react";

function Input({ type = "text", label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full max-w-md mx-auto">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Input);

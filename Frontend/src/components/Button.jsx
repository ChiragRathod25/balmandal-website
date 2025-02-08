import React from "react";

function Button({
  children,
  bgColor = "bg-blue-600",
  textColor = "white",
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      <button
        className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 focus:ring-indigo-300 border border-transparent",
    secondary: "bg-white text-indigo-700 hover:bg-indigo-50 focus:ring-white/50 shadow-md shadow-indigo-100 hover:shadow-xl",
    outline: "border-2 border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 focus:ring-indigo-200 bg-transparent backdrop-blur-sm",
    ghost: "text-slate-700 hover:bg-white/40 hover:text-slate-900",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2.5",
    lg: "px-10 py-4 text-lg gap-3",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
};
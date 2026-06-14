import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600',
  ghost: 'bg-transparent hover:bg-slate-700/50 text-slate-300 hover:text-white',
  danger: 'bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/30',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`
        font-semibold transition-all duration-200 cursor-pointer
        ${variants[variant]} ${sizes[size]}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
